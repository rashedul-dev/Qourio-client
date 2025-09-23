import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Globe, Heart, Lightbulb, Shield } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { number: "500M+", label: "Packages Delivered", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "50K+", label: "Active Businesses", icon: <Users className="w-6 h-6" /> },
    { number: "100+", label: "Carrier Partners", icon: <Globe className="w-6 h-6" /> },
    { number: "99.9%", label: "Platform Uptime", icon: <Shield className="w-6 h-6" /> },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Customer First",
      description:
        "Every decision we make starts with how it will benefit our customers and their shipping experience.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Innovation",
      description: "We continuously push the boundaries of logistics technology to solve complex shipping challenges.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Reliability",
      description: "Our platform is built for mission-critical operations with enterprise-grade security and uptime.",
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Global Impact",
      description: "We're connecting businesses worldwide and making global commerce more accessible for everyone.",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former VP of Operations at Amazon Logistics with 15 years of experience scaling global shipping networks.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer who led the development of machine learning systems for supply chain optimization.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Emily Watson",
      role: "VP of Product",
      bio: "Product leader with 12 years at Shopify, specializing in e-commerce and logistics platform development.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Former Principal Engineer at Uber, expert in building scalable systems for real-time logistics operations.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description:
        "Quorio was founded with a mission to democratize enterprise-grade shipping technology for businesses of all sizes.",
    },
    {
      year: "2020",
      title: "Series A Funding",
      description: "Raised $15M Series A to expand our carrier network and develop advanced tracking capabilities.",
    },
    {
      year: "2021",
      title: "100M Packages",
      description: "Reached the milestone of 100 million packages processed through our platform.",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Launched international shipping services and expanded to serve customers in 50+ countries.",
    },
    {
      year: "2023",
      title: "AI-Powered Optimization",
      description: "Introduced machine learning algorithms for route optimization and predictive delivery analytics.",
    },
    {
      year: "2024",
      title: "Enterprise Growth",
      description: "Now serving Fortune 500 companies and processing over 500 million packages annually.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            About Quorio
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Revolutionizing Global Commerce Through Smart Shipping
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Founded in 2019, Quorio has grown from a startup with a simple idea to a leading logistics platform trusted
            by over 50,000 businesses worldwide. We're on a mission to make shipping simple, affordable, and reliable
            for everyone.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3 text-primary">{stat.icon}</div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Empowering businesses to grow globally by removing shipping complexity
            </p>
          </div>

          <Card className="mb-12">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-foreground text-center">
                "We believe that every business, regardless of size, should have access to the same powerful shipping
                tools and carrier relationships that large enterprises enjoy. Our platform democratizes logistics
                technology, enabling small businesses to compete globally while helping enterprises optimize their
                operations at scale."
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {value.icon}
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Leadership Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the experienced leaders driving Quorio's vision forward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">Key milestones in Quorio's growth and evolution</p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <Badge variant="outline" className="text-lg px-3 py-1 font-semibold">
                      {milestone.year}
                    </Badge>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Growing Community</h2>
          <p className="text-muted-foreground mb-8 text-pretty">
            Be part of the future of logistics. Whether you're a small business or enterprise, we're here to help you
            ship smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Get Started Today
            </button>
            <button className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-muted/50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
