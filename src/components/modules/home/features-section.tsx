import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, BarChart3, Shield, Zap, Globe, Users } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Real-Time Tracking",
    description:
      "Monitor every package from pickup to delivery with GPS precision and live updates for customers and businesses.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Gain insights into delivery performance, route optimization, and customer satisfaction with comprehensive dashboards.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with GDPR, SOC 2, and industry standards to protect your data.",
  },
  {
    icon: Zap,
    title: "Lightning Fast API",
    description: "Integrate seamlessly with your existing systems using our robust API with 99.9% uptime guarantee.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Deliver anywhere in the world with our network of trusted partners and local delivery services.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Manage multiple team members, set permissions, and collaborate effectively across your organization.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            Everything You Need to <span className="text-primary">Scale Your Delivery</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and features you need to manage deliveries efficiently and
            grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
