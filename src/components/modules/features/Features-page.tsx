import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Truck, BarChart3, Shield, Zap, Globe, Users, Clock, Package, Bell, Settings } from "lucide-react";
import { Link } from "react-router";

export default function FeaturesPage() {
  const featureCategories = [
    {
      title: "Shipping Management",
      description: "Streamline your entire shipping workflow",
      icon: <Truck className="w-8 h-8 text-primary" />,
      features: [
        {
          name: "Multi-Carrier Rate Shopping",
          description:
            "Compare rates from 100+ carriers in real-time to find the best shipping options for every package.",
          icon: <BarChart3 className="w-6 h-6" />,
        },
        {
          name: "Bulk Label Creation",
          description: "Generate hundreds of shipping labels simultaneously with our batch processing system.",
          icon: <Package className="w-6 h-6" />,
        },
        {
          name: "Address Validation",
          description: "Automatically verify and correct addresses to reduce delivery failures and returns.",
          icon: <CheckCircle className="w-6 h-6" />,
        },
        {
          name: "International Shipping",
          description: "Ship globally with automated customs forms, duty calculations, and compliance checks.",
          icon: <Globe className="w-6 h-6" />,
        },
      ],
    },
    {
      title: "Tracking & Analytics",
      description: "Monitor performance and optimize operations",
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      features: [
        {
          name: "Real-Time Tracking",
          description: "Provide customers with live tracking updates and delivery notifications across all carriers.",
          icon: <Clock className="w-6 h-6" />,
        },
        {
          name: "Delivery Analytics",
          description: "Analyze shipping performance, costs, and delivery times with comprehensive reporting tools.",
          icon: <BarChart3 className="w-6 h-6" />,
        },
        {
          name: "Exception Management",
          description: "Proactively identify and resolve delivery issues before they impact customer satisfaction.",
          icon: <Bell className="w-6 h-6" />,
        },
        {
          name: "Customer Portal",
          description: "Branded tracking pages where customers can manage deliveries and update preferences.",
          icon: <Users className="w-6 h-6" />,
        },
      ],
    },
    {
      title: "Integration & Automation",
      description: "Connect with your existing systems seamlessly",
      icon: <Zap className="w-8 h-8 text-primary" />,
      features: [
        {
          name: "E-commerce Integrations",
          description: "Native plugins for Shopify, WooCommerce, Magento, BigCommerce, and 50+ platforms.",
          icon: <Settings className="w-6 h-6" />,
        },
        {
          name: "REST API & Webhooks",
          description: "Full-featured API with real-time webhooks for custom integrations and automation.",
          icon: <Zap className="w-6 h-6" />,
        },
        {
          name: "Automated Workflows",
          description: "Set up rules-based shipping automation to reduce manual work and errors.",
          icon: <Settings className="w-6 h-6" />,
        },
        {
          name: "Inventory Sync",
          description: "Keep inventory levels synchronized across all sales channels and warehouses.",
          icon: <Package className="w-6 h-6" />,
        },
      ],
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security and compliance",
      icon: <Shield className="w-8 h-8 text-primary" />,
      features: [
        {
          name: "SOC 2 Compliance",
          description: "Certified security controls protecting your data with enterprise-grade encryption.",
          icon: <Shield className="w-6 h-6" />,
        },
        {
          name: "Insurance Coverage",
          description: "Comprehensive package insurance with easy claims processing and quick payouts.",
          icon: <Shield className="w-6 h-6" />,
        },
        {
          name: "GDPR Compliance",
          description: "Full compliance with international data protection regulations and privacy laws.",
          icon: <Shield className="w-6 h-6" />,
        },
        {
          name: "Audit Trails",
          description: "Complete logging of all shipping activities for compliance and troubleshooting.",
          icon: <CheckCircle className="w-6 h-6" />,
        },
      ],
    },
  ];

  const enterpriseFeatures = [
    "Dedicated account manager and priority support",
    "Custom carrier negotiations and volume discounts",
    "White-label tracking pages and customer communications",
    "Advanced reporting and business intelligence dashboards",
    "Multi-warehouse inventory management",
    "Custom API rate limits and SLA guarantees",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Platform Features
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Everything You Need to Scale Your Shipping Operations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From small businesses to enterprise operations, Quorio provides the tools and integrations you need to
            streamline shipping, reduce costs, and delight customers.
          </p>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {featureCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <h2 className="text-3xl font-bold text-foreground mb-4">{category.title}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="text-primary mt-1">{feature.icon}</div>
                        <div>
                          <CardTitle className="text-xl mb-2">{feature.name}</CardTitle>
                          <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Enterprise
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">Advanced Features for Enterprise Customers</h2>
            <p className="text-lg text-muted-foreground">
              Scale your operations with enterprise-grade features and dedicated support.
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {enterpriseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Shipping?</h2>
          <p className="text-muted-foreground mb-8 text-pretty">
            Join thousands of businesses already using Quorio to streamline their shipping operations and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={"/register"}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Free Trial
            </Link>
            <button className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-muted/50 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
