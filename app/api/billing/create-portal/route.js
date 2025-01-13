import connectMongo from "@/libs/mongoose";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req) {
    try {
        const body = await req.json();

        if (!body.returnUrl) {
            return NextResponse.json(
                { error: "Success and cancel URLs are required" },
                { status: 400 }
            );
        }
        const session = await auth();

        await connectMongo();
        const user = await User.findById(session.user.id);

        const stripe = new Stripe(process.env.STRIPE_API_KEY);

        const stripeCustomerPortal = await stripe.billingPortal.sessions.create(
            {
                customer: user.customerId,
                return_url: body.returnUrl,
            }
        );

        return NextResponse.json({ url: stripeCustomerPortal.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json(
            { error: "An error occurred while creating the checkout session" },
            { status: 500 }
        );
    }
}
