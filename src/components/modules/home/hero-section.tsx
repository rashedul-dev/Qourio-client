import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image first on mobile */}
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10">
              <img
                src="/images/home-rightSide-img.png"
                alt="Delivery Management Dashboard"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          {/* Text second on mobile */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Revolutionize Your <span className="text-primary">Parcel Delivery</span> Operations
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                Streamline your logistics with our AI-powered SaaS platform. Track, manage, and optimize deliveries in
                real-time with enterprise-grade reliability.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to={"/register"}> Start Free Trial</Link>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="group bg-transparent">
                <Play className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 text-center sm:grid-cols-3 pt-8 lg:text-left">
              <div>
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50M+</div>
                <div className="text-sm text-muted-foreground">Deliveries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
