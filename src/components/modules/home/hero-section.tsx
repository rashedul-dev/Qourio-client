import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, X } from "lucide-react";
import { Link } from "react-router";

const STATS = [
  { value: "99.9%", label: "Uptime" },
  { value: "50M+", label: "Deliveries" },
  { value: "10K+", label: "Companies" },
];

const VIDEO_URL = "https://www.youtube.com/embed/EqzhJZK6LV8?autoplay=1";

function VideoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          aria-label="Close video"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={VIDEO_URL}
            title="Product Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function HeroImage() {
  return (
    <div className="relative">
      <div className="relative z-10">
        <img
          src="/images/home-rightSide-img.png"
          alt="Delivery Management Dashboard"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
    </div>
  );
}

function HeroContent({ onWatchDemo }: { onWatchDemo: () => void }) {
  return (
    <div className="space-y-8">
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
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
          <Link to="/register">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="group bg-transparent" onClick={onWatchDemo}>
          <Play className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
          Watch Demo
        </Button>
      </div>

      <div className="grid grid-cols-3 text-center sm:grid-cols-3 pt-8 lg:text-left">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-1 lg:order-2">
              <HeroImage />
            </div>

            <div className="space-y-8 order-2 lg:order-1">
              <HeroContent onWatchDemo={() => setIsVideoOpen(true)} />
            </div>
          </div>
        </div>
      </section>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  );
}
