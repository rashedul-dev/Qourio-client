import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home, Shield } from "lucide-react";
import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="relative max-w-md mx-auto px-4">
        <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-6">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <Badge variant="destructive" className="mb-4 w-fit mx-auto">
              Access Denied
            </Badge>
            <CardTitle className="text-3xl font-black tracking-tight">
              Unauthorized Access
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-muted-foreground">
              You don't have permission to view this page. Please contact your
              administrator or sign in with appropriate credentials.
            </p>

            <div className="flex items-center justify-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Secure access required
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Go Home
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
              >
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
