import { Loader2, Clock, Zap } from "lucide-react"

interface LoadingProps {
  message?: string
  variant?: "default" | "minimal" | "detailed"
  size?: "sm" | "md" | "lg"
}

function Loading({ message, variant = "default", size = "md" }: LoadingProps) {
  const sizeClasses = {
    sm: "min-h-[200px]",
    md: "min-h-[400px]",
    lg: "min-h-[600px]",
  }

  const spinnerSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className={`${spinnerSizes[size]} animate-spin text-primary`} />
      </div>
    )
  }

  if (variant === "detailed") {
    return (
      <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
        <div className="text-center space-y-6 max-w-sm mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
            <div className="relative flex items-center justify-center h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">{message || "Processing your delivery"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We're optimizing routes and preparing your shipment. This should only take a moment.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Usually takes 3-5 seconds</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span>Route optimization</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
          <Loader2 className={`${spinnerSizes[size]} animate-spin text-primary relative z-10`} />
        </div>
        <p className="text-muted-foreground font-medium">{message || "Processing shipment..."}</p>
      </div>
    </div>
  )
}

export default Loading
