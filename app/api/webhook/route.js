import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function POST(req) {
    try {
        // 1. Verify is Stripe who is calling our endpoint
        const stripe = new Stripe(process.env.STRIPE_API_KEY);
        const body = await req.text();
        const signature = headers().get("stripe-signature");
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        // built-in function from Stripe to verify that every key matches
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            webhookSecret
        );

        const { data, type } = event;

        if (type == "checkout.session.completed") {
            // ✅ Grant access to the product
            // 2. update user in our database
            await connectMongo();

            const user = await User.findById(data.object.client_reference_id); // related with the id we sent in create-checkout/route.js
            user.hasAccess = true;
            user.customerId = data.object.customer;

            await user.save();
        } else if (type === "customer.subscription.deleted") {
            // ❌ Revoke access to the product (subscription cancelled or non-payment)
            await connectMongo();

            const user = await User.findOneAndDelete({
                customerId: data.ibject.customer,
            });
            user.hasAccess = false;
            await user.save();
        }
    } catch (e) {
        console.error("Stripe error: " + e?.message);
    }

    return NextResponse.json({});
}
