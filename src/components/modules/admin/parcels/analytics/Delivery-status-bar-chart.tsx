import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  FileText,
  CheckCircle,
  Package,
  Truck,
  Navigation,
  Clock,
  CheckCircle2,
  RotateCcw,
  XCircle,
  Shield,
  Flag,
} from "lucide-react";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-5)",
  },
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Requested: "#3b82f6", // blue-500
    Approved: "#10b981", // emerald-500
    Picked: "#8b5cf6", // violet-500
    Dispatched: "#f59e0b", // amber-500
    "In-Transit": "#ef4444", // red-500
    Rescheduled: "#f97316", // orange-500
    Delivered: "#22c55e", // green-500
    Returned: "#6b7280", // gray-500
    Cancelled: "#dc2626", // red-600
    Blocked: "#991b1b", // red-800
    Flagged: "#7c2d12", // red-900
  };
  return colors[status] || "#6b7280";
};

const getStatusIcon = (status: string) => {
  const icons: Record<string, React.ComponentType<any>> = {
    Requested: FileText,
    Approved: CheckCircle,
    Picked: Package,
    Dispatched: Truck,
    "In-Transit": Navigation,
    Rescheduled: Clock,
    Delivered: CheckCircle2,
    Returned: RotateCcw,
    Cancelled: XCircle,
    Blocked: Shield,
    Flagged: Flag,
  };
  return icons[status] || Package;
};

const getStatusDescription = (status: string) => {
  const descriptions: Record<string, string> = {
    Requested: "Initial shipment requests",
    Approved: "Approved for processing",
    Picked: "Items picked up",
    Dispatched: "Sent out for delivery",
    "In-Transit": "Currently in transit",
    Rescheduled: "Delivery rescheduled",
    Delivered: "Successfully delivered",
    Returned: "Returned to sender",
    Cancelled: "Shipment cancelled",
    Blocked: "Blocked shipments",
    Flagged: "Flagged for review",
  };
  return descriptions[status] || "Unknown status";
};

interface ChartDataItem {
  _id: string;
  count: number;
  percentage?: number;
}

interface AnalyticsData {
  totalParcelByStatus?: Array<{
    _id: string;
    count: number;
  }>;
}

interface DeliveryStatusBarChartProps {
  data?: AnalyticsData;
}

export default function DeliveryStatusBarChart({ data }: DeliveryStatusBarChartProps) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const STATUSES = [
    "Requested",
    "Approved",
    "Picked",
    "Dispatched",
    "In-Transit",
    "Rescheduled",
    "Delivered",
    "Returned",
    "Cancelled",
    "Blocked",
    "Flagged",
  ] as const;

  const rawData = data?.totalParcelByStatus || [];
  const total = rawData.reduce((sum, item) => sum + item.count, 0);

  const chartData: ChartDataItem[] = STATUSES.map((status) => {
    const count = rawData.find((item) => item._id === status)?.count || 0;
    return {
      _id: status,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    };
  }).filter((item) => item.count > 0);

  // Categorize statuses
  const activeStatuses = chartData.filter((item) =>
    ["Requested", "Approved", "Picked", "Dispatched", "In-Transit"].includes(item._id)
  );
  const completedStatuses = chartData.filter((item) => ["Delivered", "Returned"].includes(item._id));
  const issueStatuses = chartData.filter((item) =>
    ["Rescheduled", "Cancelled", "Blocked", "Flagged"].includes(item._id)
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const IconComponent = getStatusIcon(data._id);
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <IconComponent className="w-4 h-4" style={{ color: getStatusColor(data._id) }} />
            <p className="font-semibold text-foreground">{data._id}</p>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{getStatusDescription(data._id)}</p>
          <p className="text-lg font-bold" style={{ color: getStatusColor(data._id) }}>
            {data.count.toLocaleString()} parcels
          </p>
          <p className="text-sm text-muted-foreground">{data.percentage?.toFixed(1)}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative group ">
      <Card
        className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-card/90 
                       hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm min-h-full"
      >
        {/* Animated background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-amber-500/5 to-red-500/5 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 "
        />

        <CardHeader className="pb-6 border-b border-border/30 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center
                               group-hover:bg-green-500/20 transition-colors duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-foreground">Delivery Status Distribution</CardTitle>
                <CardDescription className="text-muted-foreground font-medium mt-1">
                  Real-time parcel status tracking with interactive visualization
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{total.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Parcels</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 relative z-10">
          {/* Main Chart */}
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  left: 10,
                  right: 40,
                  top: 20,
                  bottom: 20,
                }}
                barCategoryGap="20%"
              >
                <defs>
                  {chartData.map((item) => (
                    <linearGradient key={item._id} id={`gradient-${item._id}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={getStatusColor(item._id)} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={getStatusColor(item._id)} stopOpacity={0.4} />
                    </linearGradient>
                  ))}
                </defs>

                <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />

                <XAxis type="number" dataKey="count" hide axisLine={false} tickLine={false} />

                <YAxis
                  dataKey="_id"
                  type="category"
                  tickLine={false}
                  tickMargin={16}
                  axisLine={false}
                  width={140}
                  tick={({ x, y, payload }) => {
                    const IconComponent = getStatusIcon(payload.value);
                    const isHovered = hoveredBar === payload.value;
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <rect
                          x={-135}
                          y={-12}
                          width={130}
                          height={24}
                          rx={8}
                          fill={isHovered ? `${getStatusColor(payload.value)}20` : "transparent"}
                          className="transition-all duration-200"
                        />
                        <IconComponent
                          x={-125}
                          y={-3}
                          width={16}
                          height={16}
                          fill={getStatusColor(payload.value)}
                          className="transition-all duration-200"
                        />
                        <text
                          x={-105}
                          y={0}
                          dy={4}
                          textAnchor="start"
                          fontSize={13}
                          fontWeight={isHovered ? 600 : 500}
                          fill="var(--foreground)"
                          className="transition-all duration-200"
                        >
                          {payload.value}
                        </text>
                      </g>
                    );
                  }}
                />

                <ChartTooltip
                  cursor={{
                    fill: "var(--primary)",
                    opacity: 0.1,
                    radius: 8,
                  }}
                  content={<CustomTooltip />}
                />

                <Bar
                  dataKey="count"
                  fill="var(--color-count)"
                  radius={[0, 8, 8, 0]}
                  maxBarSize={28}
                  animationDuration={1000}
                  animationBegin={100}
                  onMouseEnter={(data) => setHoveredBar(data._id)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry._id}
                      fill={hoveredBar === entry._id ? getStatusColor(entry._id) : `url(#gradient-${entry._id})`}
                      className="transition-all duration-200 cursor-pointer hover:opacity-80"
                    />
                  ))}
                  <LabelList
                    position="right"
                    offset={12}
                    className="fill-foreground font-bold"
                    fontSize={12}
                    formatter={(value: number) => value?.toLocaleString()}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Status Categories Summary */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Active Shipments */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Navigation className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-foreground">Active Shipments</h3>
              </div>
              <div className="space-y-2">
                {activeStatuses.map((status) => (
                  <div key={status._id} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{status._id}</span>
                    <span className="font-semibold text-foreground">{status.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-blue-500/20">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Active</span>
                  <span className="text-lg font-bold text-blue-500">
                    {activeStatuses.reduce((sum, s) => sum + s.count, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Completed Shipments */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/5 to-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h3 className="font-bold text-foreground">Completed</h3>
              </div>
              <div className="space-y-2">
                {completedStatuses.map((status) => (
                  <div key={status._id} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{status._id}</span>
                    <span className="font-semibold text-foreground">{status.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-green-500/20">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Completed</span>
                  <span className="text-lg font-bold text-green-500">
                    {completedStatuses.reduce((sum, s) => sum + s.count, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Issues & Exceptions */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/5 to-red-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Flag className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-foreground">Issues</h3>
              </div>
              <div className="space-y-2">
                {issueStatuses.map((status) => (
                  <div key={status._id} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{status._id}</span>
                    <span className="font-semibold text-foreground">{status.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-amber-500/20">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Issues</span>
                  <span className="text-lg font-bold text-amber-500">
                    {issueStatuses.reduce((sum, s) => sum + s.count, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
