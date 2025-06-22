"use client";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const pricingPlans = [
  {
    name: "Basic",
    price: "5",
    priceId: "price_1RcN6rPgwnvQepbn0cIrZoSS",
    features: [
      "100 AI-generated posts per month",
      "Twitter thread generation",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    price: "20",
    priceId: "price_1RcN8UPgwnvQepbnResz5sfD",
    features: [
      "500 AI-generated posts per month",
      "Twitter, Instagram, and LinkedIn content",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceId: null,
    features: [
      "Unlimited AI-generated posts",
      "All social media platforms",
      "Custom AI model training",
      "Dedicated account manager",
    ],
  },
];

import BackgroundAnimation from "@/components/BackgroundAnimation";

export default function PricingPage() {
  const { isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    if (!isSignedIn) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          userId: user?.id,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }
      const { sessionId } = await response.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-white text-gray-900 antialiased flex flex-col relative overflow-hidden">
      <BackgroundAnimation />
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-2 sm:px-6 lg:px-8 py-10 sm:py-20 flex-1 w-full mt-[50px] sm:mt-0">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 text-center text-gray-900">
          Pricing Plans
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="p-5 sm:p-8 rounded-lg border border-gray-200 flex flex-col bg-gradient-to-br from-white via-gray-50 to-indigo-50 shadow-xl"
            >
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
                {plan.name}
              </h2>
              <p className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-indigo-700">
                {plan.price === "Custom" ? (
                  <span>Custom</span>
                ) : (
                  <>
                    ${plan.price}
                    <span className="text-base xs:text-lg font-normal text-indigo-600">
                      /month
                    </span>
                  </>
                )}
              </p>
              <ul className="mb-6 sm:mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center mb-2 sm:mb-3 text-gray-700"
                  >
                    <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => plan.priceId && handleSubscribe(plan.priceId)}
                disabled={isLoading || !plan.priceId}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-md py-3 mt-4 text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : plan.priceId ? "Choose Plan" : "Contact Sales"}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
    </div>
  );
}

      