import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, Package } from "lucide-react";

const chartConfig = {
  created: {
    label: "Created",
    color: "var(--primary)", // Using CSS variable for primary red
  },
};

interface ChartDataItem {
  days: string;
  created: number;
  growth?: number;
}

interface AnalyticsData {
  parcelCreatedInLast7Days?: number;
  parcelCreatedInLast30Days?: number;
}

interface ShipmentBarChartProps {
  data?: AnalyticsData;
}

function ShipmentBarChart({ data }: ShipmentBarChartProps) {
  const sevenDays = data?.parcelCreatedInLast7Days || 0;
  const thirtyDays = data?.parcelCreatedInLast30Days || 0;

  // Calculate growth rate
  const avgDaily7 = sevenDays / 7;
  const avgDaily30 = thirtyDays / 30;
  const growthRate = avgDaily30 > 0 ? ((avgDaily7 - avgDaily30) / avgDaily30) * 100 : 0;

  const chartData: ChartDataItem[] = [
    {
      days: "Last 7 Days",
      created: sevenDays,
      growth: growthRate,
    },
    {
      days: "Last 30 Days",
      created: thirtyDays,
      growth: 0,
    },
  ];

  return (
    <div className="relative group ">
      <Card
        className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-card/90 
                       hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm min-h-full"
      >
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 "
        />

        <CardHeader className="pb-6 border-b border-border/30 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center
                               group-hover:bg-primary/20 transition-colors duration-300"
                >
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  Shipment Volume Trends
                </CardTitle>
                <CardDescription className="text-muted-foreground font-medium mt-1">
                  Parcel creation comparison with growth analytics
                </CardDescription>
              </div>
            </div>
            {growthRate !== 0 && (
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold
                             ${
                               growthRate > 0
                                 ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                 : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                             }`}
              >
                <TrendingUp className={`w-4 h-4 ${growthRate < 0 ? "rotate-180" : ""}`} />
                {Math.abs(growthRate).toFixed(1)}%
              </div>
            )}
          </div>
        </CardHeader>

        {/* CardContent flex-grow */}
        <CardContent className="pt-6 flex flex-col flex-1 relative z-10">
          <ChartContainer config={chartConfig} className="h-[400px] w-full flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 30, right: 30, left: 20, bottom: 20 }} barCategoryGap="40%">
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis
                  dataKey="days"
                  tickLine={false}
                  tickMargin={16}
                  axisLine={false}
                  tick={{ fontSize: 14, fill: "var(--muted-foreground)", fontWeight: 600 }}
                />
                <YAxis
                  tickLine={false}
                  tickMargin={16}
                  axisLine={false}
                  tick={{ fontSize: 13, fill: "var(--muted-foreground)", fontWeight: 500 }}
                />
                <ChartTooltip
                  cursor={{ fill: "var(--primary)", opacity: 0.1, radius: 8 }}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="created"
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={80}
                  animationDuration={800}
                  animationBegin={200}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground font-bold"
                    fontSize={14}
                    formatter={(value: number) => value?.toLocaleString()}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Summary stats at the bottom */}
          <div className="mt-auto grid grid-cols-2 gap-4 pt-4">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <div className="text-2xl font-bold text-foreground">{sevenDays.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">Weekly Volume</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
              <div className="text-2xl font-bold text-foreground">{(sevenDays / 7).toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mt-1">Daily Average</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShipmentBarChart;
