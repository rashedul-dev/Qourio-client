"use client";

import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { Link } from "react-router";

interface InformationProps {
  message?: string;
  variant?: "info" | "warning" | "success" | "error" | "tip";
  title?: string;
  subtitle?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export default function Information({
  message,
  variant = "info",
  title,
  subtitle,
  dismissible = false,
  onDismiss,
}: InformationProps) {
  const variants = {
    info: {
      icon: Info,
      bgColor: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20",
      borderColor: "border-blue-400/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-900 dark:text-blue-100",
      textColor: "text-blue-800 dark:text-blue-200",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20",
      borderColor: "border-amber-400/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      titleColor: "text-amber-900 dark:text-amber-100",
      textColor: "text-amber-800 dark:text-amber-200",
      glow: "shadow-[0_0_15px_rgba(251,191,36,0.2)]",
    },
    success: {
      icon: CheckCircle,
      bgColor: "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20",
      borderColor: "border-green-400/30",
      iconColor: "text-green-600 dark:text-green-400",
      titleColor: "text-green-900 dark:text-green-100",
      textColor: "text-green-800 dark:text-green-200",
      glow: "shadow-[0_0_15px_rgba(34,197,94,0.2)]",
    },
    error: {
      icon: XCircle,
      bgColor: "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20",
      borderColor: "border-red-400/30",
      iconColor: "text-red-600 dark:text-red-400",
      titleColor: "text-red-900 dark:text-red-100",
      textColor: "text-red-800 dark:text-red-200",
      glow: "shadow-[0_0_15px_rgba(239,68,68,0.2)]",
    },
    tip: {
      icon: Lightbulb,
      bgColor: "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20",
      borderColor: "border-purple-400/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      titleColor: "text-purple-900 dark:text-purple-100",
      textColor: "text-purple-800 dark:text-purple-200",
      glow: "shadow-[0_0_15px_rgba(168,85,247,0.2)]",
    },
  };

  const config = variants[variant];
  const Icon = config.icon;

  const defaultMessages = {
    info: "Here's important delivery information you should know.",
    warning: "Please review this delivery notice before proceeding.",
    success: "Great! Your delivery operation was completed successfully.",
    error: "Delivery issue detected. Please check the details below.",
    tip: "Pro tip: This might help optimize your delivery operations.",
  };

  const defaultTitles = {
    info: "Delivery Information",
    warning: "Delivery Notice",
    success: "Delivery Success",
    error: "Delivery Error",
    tip: "Delivery Tip",
  };

  return (
    <div className="flex justify-center items-center min-h-[20vh] px-4">
      <div
        className={`w-full rounded-3xl border ${config.bgColor} ${config.borderColor} ${config.glow} 
    px-8 py-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl scale-none`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Icon Section */}
          <div
            className={`relative flex h-14 w-14 items-center justify-center rounded-full 
        border ${config.borderColor} ${config.bgColor} shadow-md`}
          >
            <span
              className={`absolute inset-0 rounded-full blur-md opacity-40 ${config.iconColor} animate-pulse`}
            ></span>
            <Icon className={`relative h-6 w-6 ${config.iconColor}`} aria-hidden="true" />
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <h4 className={`text-lg font-bold tracking-tight ${config.titleColor} mb-1`}>
              {title || defaultTitles[variant]}
            </h4>
            {subtitle && <p className={`text-sm italic mb-2 ${config.textColor}`}>{subtitle}</p>}
            <p className={`text-sm leading-relaxed ${config.textColor}`}>{message || defaultMessages[variant]}</p>
          </div>

          {/* Dismiss Button */}
          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              className={`flex-shrink-0 ${config.iconColor} hover:opacity-70 transition-opacity`}
              aria-label="Dismiss"
            >
              <XCircle className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Optional Footer Section */}
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Last updated: 21 hours ago</span>
          <Link to={"/receiver/me/"} className="font-medium hover:underline">
            Learn more →
          </Link>
        </div>
      </div>
    </div>
  );
}
