import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  variant?: "primary" | "emerald" | "amber" | "rose" | "indigo";
  index?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = "primary",
  index = 0,
}) => {
  const variants = {
    primary: "bg-primary/5 text-primary border-primary/20",
    emerald: "bg-emerald-500/5 text-emerald-600 border-emerald-500/20",
    amber: "bg-amber-500/5 text-amber-600 border-amber-500/20",
    rose: "bg-rose-500/5 text-rose-600 border-rose-500/20",
    indigo: "bg-indigo-500/5 text-indigo-600 border-indigo-500/20",
  };

  const iconVariants = {
    primary: "bg-primary text-primary-foreground",
    emerald: "bg-emerald-500 text-white",
    amber: "bg-amber-500 text-white",
    rose: "bg-rose-500 text-white",
    indigo: "bg-indigo-500 text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md",
        variants[variant],
        "bg-white dark:bg-zinc-950"
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</h3>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  trend.isUp
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                )}
              >
                {trend.isUp ? "+" : "-"}
                {trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
          {description && !trend && <p className="mt-2 text-xs text-muted-foreground">{description}</p>}
        </div>
        <div className={cn("p-3 rounded-xl shadow-inner", iconVariants[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-current opacity-[0.03]" />
    </motion.div>
  );
};
