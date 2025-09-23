import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

export default function FAQPage() {
  const faqCategories = [
    {
      category: "Getting Started",
      badge: "New Users",
      badgeColor: "bg-emerald-500/20 text-emerald-700 border-emerald-300 shadow-emerald-500/25",
      glowColor: "shadow-emerald-500/10 hover:shadow-emerald-500/20",
      questions: [
        {
          question: "How do I integrate Quorio with my e-commerce platform?",
          answer:
            "Quorio offers seamless integration with over 50+ e-commerce platforms including Shopify, WooCommerce, Magento, and BigCommerce. Simply install our plugin or use our REST API to connect your store. The setup process typically takes less than 15 minutes with our step-by-step integration wizard.",
        },
        {
          question: "What shipping carriers does Quorio support?",
          answer:
            "We partner with major carriers including FedEx, UPS, DHL, USPS, and over 100 regional carriers worldwide. Our platform automatically compares rates and delivery times to help you choose the best option for each shipment. We also support local courier services in major metropolitan areas.",
        },
        {
          question: "Is there a minimum volume requirement to use Quorio?",
          answer:
            "No minimum volume required! Whether you're shipping 1 package per month or 10,000, Quorio scales with your business. Our pricing is transparent and based on actual usage, making it perfect for startups and enterprise businesses alike.",
        },
      ],
    },
    {
      category: "Pricing & Billing",
      badge: "Popular",
      badgeColor: "bg-blue-500/20 text-blue-700 border-blue-300 shadow-blue-500/25",
      glowColor: "shadow-blue-500/10 hover:shadow-blue-500/20",
      questions: [
        {
          question: "How does Quorio's pricing work?",
          answer:
            "We offer transparent, pay-as-you-ship pricing with no hidden fees. You pay the discounted carrier rate plus a small platform fee (starting at $0.05 per label). Volume discounts apply automatically as you ship more. Enterprise customers can access custom pricing with dedicated account management.",
        },
        {
          question: "Can I get refunds for unused shipping labels?",
          answer:
            "Yes! Unused labels can be voided within 24 hours for a full refund. Our system automatically processes refunds back to your original payment method within 3-5 business days. This feature is available for all major carriers through our platform.",
        },
        {
          question: "Are there any setup fees or monthly minimums?",
          answer:
            "No setup fees, no monthly minimums, and no long-term contracts required. You only pay for the shipping labels you actually use. Our Starter plan is completely free to get started, and you can upgrade anytime as your business grows.",
        },
      ],
    },
    {
      category: "Shipping & Tracking",
      badge: "Essential",
      badgeColor: "bg-purple-500/20 text-purple-700 border-purple-300 shadow-purple-500/25",
      glowColor: "shadow-purple-500/10 hover:shadow-purple-500/20",
      questions: [
        {
          question: "How accurate is the delivery tracking?",
          answer:
            "Our tracking system provides real-time updates with 99.9% accuracy. We aggregate data from carrier APIs and our own logistics network to provide precise location updates, estimated delivery times, and proactive notifications for any delays or issues.",
        },
        {
          question: "What happens if a package gets lost or damaged?",
          answer:
            "Quorio provides comprehensive insurance coverage up to $100 for free on all shipments. Higher coverage is available for valuable items. In case of loss or damage, we handle the entire claims process with carriers and provide quick resolution, typically within 48 hours.",
        },
        {
          question: "Can customers change delivery addresses after shipping?",
          answer:
            "Yes, through our customer portal, recipients can request address changes, schedule redelivery, or redirect packages to pickup locations. These services are available for most carriers and may incur additional fees depending on the carrier's policies.",
        },
      ],
    },
    {
      category: "Technical Support",
      badge: "Support",
      badgeColor: "bg-orange-500/20 text-orange-700 border-orange-300 shadow-orange-500/25",
      glowColor: "shadow-orange-500/10 hover:shadow-orange-500/20",
      questions: [
        {
          question: "What kind of technical support do you provide?",
          answer:
            "We offer 24/7 technical support through live chat, email, and phone. Our support team includes shipping experts and developers who can help with integration issues, API questions, and general platform usage. Enterprise customers get dedicated account managers.",
        },
        {
          question: "Do you have an API for custom integrations?",
          answer:
            "Yes! Our RESTful API is fully documented and supports all platform features including label creation, tracking, address validation, and rate shopping. We also provide SDKs for popular programming languages and webhook support for real-time updates.",
        },
        {
          question: "How do you handle system downtime or outages?",
          answer:
            "Quorio maintains 99.9% uptime with redundant systems and automatic failover. In the rare event of an outage, we provide real-time status updates and our team works around the clock to restore service. We also offer SLA guarantees for enterprise customers.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 shadow-lg shadow-primary/20">
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
            Everything You Need to Know About Quorio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find answers to common questions about our parcel delivery platform, pricing, integrations, and support
            services.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className={`mb-8 border-2 transition-all duration-300 hover:scale-[1.02] ${category.glowColor} shadow-xl`}
            >
              <CardHeader className="bg-gradient-to-r from-muted/30 to-muted/10">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl bg-gradient-to-r from-foreground to-primary bg-clip-text">
                    {category.category}
                  </CardTitle>
                  <Badge className={`${category.badgeColor} shadow-lg`}>{category.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent className="bg-gradient-to-br from-background to-muted/5">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${categoryIndex}-${index}`} className="border-muted/50">
                      <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors duration-400 hover:no-underline scale-none">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent shadow-sm "></div>
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pl-4 border-l-2 border-gradient-to-b from-primary/20 to-accent/20 ml-1">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-3xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-8 text-pretty">
            Our support team is here to help you get the most out of Quorio. Reach out anytime for personalized
            assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105">
              <Link to={"/contact"}>Contact Support</Link>
            </button>
            <button className="border-2 border-primary/30 bg-gradient-to-r from-background to-muted/20 px-8 py-3 rounded-lg font-semibold hover:border-primary/50 hover:bg-gradient-to-r hover:from-muted/20 hover:to-muted/40 transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
