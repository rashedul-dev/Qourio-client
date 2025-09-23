import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";

export default function TrackingSupport() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-6 py-2 bg-primary/10 text-primary border-primary/20">
            <MessageCircle className="w-4 h-4 mr-2" />
            Customer Support
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Need Assistance?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our dedicated support team is here to help you with any questions about your shipment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card/90 to-accent/5 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Call Us</h3>
              <p className="text-primary font-bold text-xl mb-2">+8801717171717</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <span>Available 24/7</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg">Call Now</Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card/90 to-accent/5 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Email Us</h3>
              <p className="text-primary font-bold text-lg mb-2">support@quorio.com</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <span>Response within 2 hours</span>
              </div>
              <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 bg-transparent">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card/90 to-accent/5 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group md:col-span-2 lg:col-span-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Live Chat</h3>
              <p className="text-muted-foreground mb-2">Instant support</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Online now</span>
              </div>
              <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 bg-transparent">
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 shadow-xl border-0 bg-gradient-to-br from-card via-card/90 to-accent/5 backdrop-blur-sm h-60  min-h-[50vh] md:min-h-[30vh] lg:min-h-[20vh] ">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Quick Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 align-middle justify-center  ">
              <Button
                variant="outline"
                className="h-auto p-4 text-left align-middle justify-start transition-all duration-300"
              >
                <div>
                  <p className="font-semibold">Track Another Package</p>
                  <p className="text-sm text-muted-foreground">Enter a new tracking number</p>
                </div>
              </Button>
              <Button variant="ghost" className="h-auto p-4 text-left justify-start">
                <div>
                  <p className="font-semibold">Delivery Issues</p>
                  <p className="text-sm text-muted-foreground">Report delivery problems</p>
                </div>
              </Button>
              <Button variant="ghost" className="h-auto p-4 text-left justify-start">
                <div>
                  <p className="font-semibold">Update Address</p>
                  <p className="text-sm text-muted-foreground">Change delivery location</p>
                </div>
              </Button>
              <Button variant="ghost" className="h-auto p-4 text-left justify-start">
                <div>
                  <p className="font-semibold">Schedule Delivery</p>
                  <p className="text-sm text-muted-foreground">Choose delivery time</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
