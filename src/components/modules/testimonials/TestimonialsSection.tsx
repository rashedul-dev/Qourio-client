import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Quote,
  Rocket,
  ShoppingCart,
  Star,
  Store,
  Users,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    content:
      "The fastest and most reliable delivery service I've ever used. My customers love the real-time tracking!",
    rating: 5,
    icon: <Briefcase className="w-7 h-7" />,
    category: "Business",
  },
  {
    name: "Mike Chen",
    role: "Online Seller",
    content:
      "Outstanding service! My parcels always arrive on time and in perfect condition. Highly recommended!",
    rating: 5,
    icon: <ShoppingCart className="w-7 h-7" />,
    category: "E-commerce",
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    content:
      "Perfect for sending care packages to family. The tracking feature gives me peace of mind.",
    rating: 5,
    icon: <GraduationCap className="w-7 h-7" />,
    category: "Student",
  },
  {
    name: "Amit Patel",
    role: "Retailer",
    content:
      "Excellent support and fast delivery. The best logistics partner for my business.",
    rating: 5,
    icon: <Store className="w-7 h-7" />,
    category: "Retail",
  },
  {
    name: "Fatima Noor",
    role: "Freelancer",
    content:
      "Easy to use, transparent pricing, and always on time. Highly recommend!",
    rating: 5,
    icon: <Globe2 className="w-7 h-7" />,
    category: "Freelancer",
  },
  {
    name: "Carlos Mendes",
    role: "NGO Coordinator",
    content:
      "We rely on this service for urgent deliveries to remote areas. Always dependable and fast.",
    rating: 5,
    icon: <HeartHandshake className="w-7 h-7" />,
    category: "NGO",
  },
  {
    name: "Linda Park",
    role: "Tech Startup",
    content:
      "Their express shipping helped us launch our product on time. Great experience!",
    rating: 5,
    icon: <Rocket className="w-7 h-7" />,
    category: "Startup",
  },
  {
    name: "Maria Garcia",
    role: "Customer",
    content: "I had a great experience using this service. Highly recommend!",
    rating: 5,
    icon: <Users className="w-7 h-7" />,
    category: "Customer",
  },
];
function TestimonialsSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background"></div>
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Customer Reviews
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Real Customer Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover why thousands of customers trust us with their deliveries
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50"
            >
              <CardHeader className="flex flex-row gap-3 items-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl">
                  {testimonial.icon}
                </div>
                <div>
                  <CardTitle className="text-xl font-bold tracking-tight">
                    {testimonial.name}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {testimonial.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-primary/20 absolute -top-2 -left-1" />
                  <p className="italic text-base leading-relaxed text-muted-foreground pl-4">
                    {testimonial.content}
                  </p>
                </div>
                <div className="text-sm font-semibold text-primary">
                  {testimonial.role}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
