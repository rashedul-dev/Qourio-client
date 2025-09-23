import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Operations Director",
    company: "TechCorp Solutions",
    content:
      "Quorio transformed our delivery operations completely. We've seen a 40% improvement in delivery times and customer satisfaction has never been higher.",
    rating: 5,
    avatar: "/public/assets/images/place-holder-img-3.png",
  },
  {
    name: "Michael Chen",
    role: "Logistics Manager",
    company: "Global Retail Inc",
    content:
      "The real-time tracking and analytics have given us unprecedented visibility into our supply chain. It's like having a crystal ball for logistics.",
    rating: 5,
    avatar: "/public/assets/images/place-holder-img-2.png",
  },
  {
    name: "Emily Rodriguez",
    role: "CEO",
    company: "FastTrack Delivery",
    content:
      "As a growing delivery company, Quorio's scalable platform has been essential. We've expanded to 5 new cities without missing a beat.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            Trusted by <span className="text-primary">Industry Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            See what our customers are saying about their experience with Quorio's delivery management platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-2 border-red-600/20 hover:border-red-600/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4 gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5  fill-accent text-amber-400 " />
                  ))}
                </div>

                <blockquote className="text-lg mb-6 leading-relaxed">"{testimonial.content}"</blockquote>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/public/assets/images/place-holder-img-1.png"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
