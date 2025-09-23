"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, RefreshCw, MessageCircle, Bug } from "lucide-react"
import { Component, type ErrorInfo, type ReactNode } from "react"
import { Link } from "react-router"
import { toast } from "sonner"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
    this.setState({ error, errorInfo })
    toast.error("Application Error", {
      description: "Something unexpected happened. We're working on it!",
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReportBug = () => {
    // In a real app, this would open a bug report form or email
    toast.info("Bug Report", {
      description: "Thank you! Our team will investigate this issue.",
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
          <div className="relative max-w-lg mx-auto">
            {/* Background decoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>

            <Card className="relative p-8 shadow-2xl border-2 border-border/50 bg-card/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-destructive/10 to-destructive/5 text-destructive rounded-full mb-6 mx-auto border border-destructive/20">
                  <AlertTriangle className="w-10 h-10" />
                </div>
                <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Oops! Something broke
                </CardTitle>
                <p className="text-muted-foreground mt-2">Don't worry - these things happen sometimes</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center space-y-3">
                  <p className="text-foreground leading-relaxed">
                    We encountered an unexpected error while loading this page. Our engineering team has been
                    automatically notified and is working on a fix.
                  </p>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                    <Bug className="h-4 w-4" />
                    <span>Error ID: {Date.now().toString(36).toUpperCase()}</span>
                  </div>
                </div>

                {process.env.NODE_ENV === "development" && this.state.error && (
                  <details className="text-left bg-muted/50 rounded-lg p-4">
                    <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground mb-2">
                      🔧 Developer Details
                    </summary>
                    <div className="space-y-2">
                      <div className="text-xs font-mono bg-destructive/10 text-destructive p-2 rounded border">
                        <strong>{this.state.error.name}:</strong> {this.state.error.message}
                      </div>
                      {this.state.errorInfo && (
                        <pre className="text-xs text-muted-foreground whitespace-pre-wrap bg-muted p-2 rounded max-h-32 overflow-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  </details>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button
                    onClick={this.handleReload}
                    size="lg"
                    className="text-base px-8 py-6 bg-primary hover:bg-primary/90"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Reload Page
                  </Button>

                  <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 bg-transparent">
                    <Link to="/" className="flex items-center gap-2">
                      <Home className="w-5 h-5" />
                      Go Home
                    </Link>
                  </Button>

                  <Button
                    onClick={this.handleReportBug}
                    size="lg"
                    variant="ghost"
                    className="text-base px-8 py-6 text-muted-foreground hover:text-foreground"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Report Bug
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
