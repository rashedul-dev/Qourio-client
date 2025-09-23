import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Shield, Star, Zap } from "lucide-react";
import { Link } from "react-router";
function TestimonialsCTA() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30"></div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="text-center mb-8">
            <Badge variant="outline" className="mb-4 w-fit mx-auto">
              Join Our Community
            </Badge>
            <CardTitle className="text-3xl md:text-4xl font-black tracking-tight">
              Ready to Experience Great Service?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their
              deliveries every day
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center gap-2 p-3 bg-primary/5 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-primary/5 rounded-lg">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-semibold">Fast Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-2 p-3 bg-primary/5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">99% Satisfaction</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/register" className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
              >
                <Link to="/login">Sign In</Link>
              </Button>
            </div>

            {/* Additional Trust Indicators */}
            <div className="pt-6 border-t border-muted">
              <p className="text-sm text-muted-foreground mb-3">
                Trusted by 10,000+ customers worldwide
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  99% Success Rate
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-blue-500" />
                  Secure & Encrypted
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  24/7 Support
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default TestimonialsCTA;
