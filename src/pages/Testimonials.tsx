import TestimonialsCTA from "@/components/modules/testimonials/TestimonialsCTA";
import TestimonialsSection from "@/components/modules/testimonials/TestimonialsSection";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, HeartHandshake, Star, Users } from "lucide-react";

const stats = [
  {
    number: "10K+",
    label: "Happy Customers",
    icon: <Users className="w-6 h-6" />,
  },
  {
    number: "4.9",
    label: "Average Rating",
    icon: <Star className="w-6 h-6" />,
  },
  {
    number: "99%",
    label: "Satisfaction Rate",
    icon: <Award className="w-6 h-6" />,
  },
  {
    number: "24/7",
    label: "Support Available",
    icon: <HeartHandshake className="w-6 h-6" />,
  },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6">
              Testimonials
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              What Our
              <span className="block text-primary">Customers Say</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Hear from our satisfied customers and partners about their
              experience with our delivery service
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50"
              >
                <CardContent className="p-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <TestimonialsCTA />
    </div>
  );
}
