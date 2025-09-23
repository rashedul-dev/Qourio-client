import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default function HelpSection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30"></div>
      <div className="relative max-w-4xl mx-auto px-4">
        <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="text-center mb-8">
            <Badge variant="outline" className="mb-4 w-fit mx-auto">
              Need Help?
            </Badge>
            <CardTitle className="text-3xl md:text-4xl font-black tracking-tight">Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-primary font-semibold">+8801717171717</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-primary font-semibold">support@Quorio .com</p>
                <p className="text-sm text-muted-foreground">Response within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
