import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">Ready to Transform Your Delivery Operations?</h2>
          <p className="text-xl opacity-90 text-pretty">
            Join thousands of businesses already using Quorio to streamline their logistics and delight their customers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              <Link to={"/register"}> Start Free Trial</Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-transparent hover:text-white bg-transparent hover:scale-105"
            >
              Schedule Demo
            </Button>
          </div>

          <p className="text-sm opacity-75">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
}
