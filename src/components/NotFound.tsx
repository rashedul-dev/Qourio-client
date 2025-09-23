"use client";

import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Package } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/10">
      <div className="text-center space-y-8 max-w-lg mx-auto px-4">
        {/* 404 Visual with decoration */}
        <div className="relative">
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>

          <div className="relative space-y-4">
            <div className="text-8xl font-black text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text">
              404
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Package className="h-4 w-4" />
              <span className="text-sm font-medium">Delivery route not found</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Package seems to be lost!</h1>
          <p className="text-muted-foreground leading-relaxed text-lg">
            The delivery route you're looking for seems to have taken a wrong turn. Don't worry though – our logistics
            team will help you find the right path back to your destination.
          </p>

          <div className="bg-muted/30 rounded-lg p-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Search className="h-4 w-4" />
              <span className="font-medium">What you can do:</span>
            </div>
            <ul className="space-y-1 text-left">
              <li>• Check the delivery tracking URL for any typos</li>
              <li>• Return to the previous page</li>
              <li>• Visit the Quorio dashboard to start fresh</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            onClick={handleGoBack}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 text-base px-8 py-6 bg-transparent"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>

          <Button
            onClick={handleGoHome}
            size="lg"
            className="flex items-center gap-2 text-base px-8 py-6 bg-primary hover:bg-primary/90"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Still having trouble?{" "}
          <button className="underline hover:no-underline">
            <Link to={"/contact"}>Contact Quorio support team</Link>
          </button>
        </p>
      </div>
    </div>
  );
}
