import connectMongo from "@/libs/mongoose";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.successUrl || !body.cancelUrl) {
      return NextResponse.json(
        { error: "Success and cancel URLs are required" },
        { status: 400 }
      );
    }
    const session = await auth();
    await connectMongo();

    const user = await User.findById(session.user.id);

    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        //products to be displayed at the checkout
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: body.successUrl,
      cancel_url: body.cancelUrl,
      customer_email: user.email,
      client_reference_id: user._id.toString(),
    });

    return NextResponse.json({ url: stripeCheckoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the checkout session" },
      { status: 500 }
    );
  }
}
