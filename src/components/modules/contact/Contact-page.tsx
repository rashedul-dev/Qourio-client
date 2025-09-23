import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle, Users } from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Get instant help from our team",
      detail: "Available 24/7",
      action: "Start Chat",
      primary: true,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Send us a detailed message",
      detail: "support@quorio.com",
      action: "Send Email",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our team",
      detail: "+1 (555) 123-4567",
      action: "Call Now",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Schedule Demo",
      description: "Book a personalized walkthrough",
      detail: "30-minute sessions available",
      action: "Book Demo",
    },
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Market Street, Suite 400",
      zipcode: "San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "sf@quorio.com",
    },
    {
      city: "New York",
      address: "456 Broadway, Floor 12",
      zipcode: "New York, NY 10013",
      phone: "+1 (555) 234-5678",
      email: "ny@quorio.com",
    },
    {
      city: "London",
      address: "789 Oxford Street, Suite 200",
      zipcode: "London W1C 1JN, UK",
      phone: "+44 20 7123 4567",
      email: "london@quorio.com",
    },
  ];

  const supportHours = [
    { type: "Live Chat & Phone", hours: "24/7 - Always Available" },
    { type: "Email Support", hours: "Response within 2 hours" },
    { type: "Enterprise Support", hours: "Dedicated account manager" },
    { type: "Technical Support", hours: "24/7 for critical issues" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            We're Here to Help You Ship Smarter
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Have questions about Quorio? Need help with your account? Our expert support team is available 24/7 to
            assist you with anything you need.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose How You'd Like to Connect</h2>
            <p className="text-lg text-muted-foreground">Multiple ways to get the support you need, when you need it</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-shadow ${method.primary ? "ring-2 ring-primary" : ""}`}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-3 text-primary">{method.icon}</div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm font-medium text-foreground mb-4">{method.detail}</p>
                  <Button
                    className={`w-full ${method.primary ? "bg-primary text-primary-foreground" : "variant-outline"}`}
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Send Us a Message</h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you within 2 hours
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                    <Input placeholder="Your company name" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                  <Input placeholder="What can we help you with?" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <Textarea placeholder="Tell us more about your question or how we can help..." rows={6} />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="newsletter" className="rounded" />
                  <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                    I'd like to receive updates about Quorio features and shipping tips
                  </label>
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Global Offices</h2>
            <p className="text-lg text-muted-foreground">Visit us at one of our locations around the world</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <CardTitle className="text-xl">{office.city}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-foreground font-medium">{office.address}</p>
                    <p className="text-muted-foreground">{office.zipcode}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-sm">{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm">{office.email}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Support Hours & Response Times</h2>
            <p className="text-lg text-muted-foreground">
              We're committed to providing fast, reliable support when you need it
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {supportHours.map((support, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Clock className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{support.type}</h3>
                      <p className="text-muted-foreground">{support.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
