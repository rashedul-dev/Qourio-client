"use client";

import { AlertTriangle, RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Error({
  message,
  onRetry,
  showHelp = false,
}: {
  message?: string;
  onRetry?: () => void;
  showHelp?: boolean;
}) {
  return (
    <div className="rounded-lg border-2 border-destructive/20 bg-gradient-to-br from-red-50/50 to-red-100/30 dark:from-red-950/20 dark:to-red-900/10 px-6 py-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 dark:bg-destructive/20">
            <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-destructive">Delivery System Error</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {message ||
                "Unable to process your delivery request. Our logistics team has been notified and is working to resolve this issue. Please try again in a few moments."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry} className="h-8 px-3 text-xs bg-transparent">
                <RefreshCw className="mr-1.5 h-3 w-3" />
                Retry Delivery
              </Button>
            )}

            {showHelp && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground"
              >
                <HelpCircle className="mr-1.5 h-3 w-3" />
                <Link to={"/contact"}></Link>
                Contact Support
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
