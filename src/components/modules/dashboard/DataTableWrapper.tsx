import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DataTableWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const DataTableWrapper: React.FC<DataTableWrapperProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const DataTableHeader: React.FC<{ title: string; subtitle?: string; children?: React.ReactNode }> = ({ title, subtitle, children }) => (
  <div className="flex items-center justify-between p-6 border-b bg-muted/30">
    <div>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-2">
      {children}
    </div>
  </div>
);

export const DataTableContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-x-auto">
    {children}
  </div>
);

export const DataTableFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4 border-t bg-muted/10 flex items-center justify-between">
    {children}
  </div>
);
