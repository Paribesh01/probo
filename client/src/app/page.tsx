import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ArrowRight, BarChart2, CreditCard, TrendingUp } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(98,0,255,0.1),transparent_70%)]"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 animate-fade-in">
              Trade Opinions.{" "}
              <span className="text-primary">Earn Rewards.</span>
            </h1>
            <p
              className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Buy and sell predictions on real-world events and profit from your
              knowledge.
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Button size="lg" asChild>
                <Link href="/markets">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline">
                Download App
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Opinion Pulse makes it easy to trade on the outcome of events.
              Follow these simple steps to get started.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center px-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <BarChart2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Browse Questions</h3>
              <p className="text-muted-foreground">
                Explore a variety of prediction markets across categories like
                sports, politics, and entertainment.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center px-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Trade Yes/No Stocks</h3>
              <p className="text-muted-foreground">
                Buy or sell shares based on whether you think an event will
                happen or not. Prices move with market sentiment.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center px-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Earn Profits</h3>
              <p className="text-muted-foreground">
                Collect winnings when markets resolve in your favor or sell your
                position before markets close.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/markets" className="flex items-center">
                View Markets <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Traders Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from users who have successfully predicted market outcomes
              and earned rewards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-secondary rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 mr-3"></div>
                <div>
                  <h4 className="font-medium">Alex Thompson</h4>
                  <p className="text-sm text-muted-foreground">
                    Trader since 2023
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I've always followed politics closely. Opinion Pulse lets me
                profit from my knowledge while keeping me engaged with current
                events."
              </p>
              <div className="mt-4 flex">
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-secondary rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 mr-3"></div>
                <div>
                  <h4 className="font-medium">Samantha Lee</h4>
                  <p className="text-sm text-muted-foreground">
                    Trader since 2022
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The platform is incredibly intuitive. I started with just $100
                and turned it into $850 by correctly predicting sports
                outcomes."
              </p>
              <div className="mt-4 flex">
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-secondary rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 mr-3"></div>
                <div>
                  <h4 className="font-medium">Marcus Johnson</h4>
                  <p className="text-sm text-muted-foreground">
                    Trader since 2023
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Opinion Pulse transformed how I engage with news. Now I don't
                just read headlines—I actively predict their outcomes."
              </p>
              <div className="mt-4 flex">
                <span className="text-yellow-500">★★★★☆</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of traders on Opinion Pulse and turn your
              predictions into profits.
            </p>
            <Button size="lg">
              <Link href="/markets">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
