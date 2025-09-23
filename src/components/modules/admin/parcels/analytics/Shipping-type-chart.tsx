import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { Truck, Zap, Clock, Moon } from "lucide-react";

const chartConfig = {
  count: {
    label: "Count",
  },
  standard: {
    label: "Standard",
    color: "#64748b",
  },
  express: {
    label: "Express",
    color: "#3b82f6",
  },
  same_day: {
    label: "Same Day",
    color: "#f59e0b",
  },
  overnight: {
    label: "Overnight",
    color: "#8b5cf6",
  },
};

const SHIPPING_TYPE_COLORS = {
  standard: "#64748b",
  express: "#3b82f6",
  same_day: "#f59e0b",
  overnight: "#8b5cf6",
};

const SHIPPING_ICONS = {
  standard: Truck,
  express: Zap,
  same_day: Clock,
  overnight: Moon,
};

interface ChartDataItem {
  _id: string;
  count: number;
  fill: string;
  percentage?: number;
}

interface AnalyticsData {
  parcelPerShippingType?: Array<{
    _id: string;
    count: number;
  }>;
}

interface ShippingTypeChartProps {
  data?: AnalyticsData;
}

function ShippingTypeChart({ data }: ShippingTypeChartProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const rawData = data?.parcelPerShippingType || [];
  const total = rawData.reduce((sum, item) => sum + item.count, 0);

  const chartData: ChartDataItem[] = [
    {
      _id: "standard",
      count: rawData.find((item) => item._id === "standard")?.count || 0,
      fill: SHIPPING_TYPE_COLORS.standard,
    },
    {
      _id: "express",
      count: rawData.find((item) => item._id === "express")?.count || 0,
      fill: SHIPPING_TYPE_COLORS.express,
    },
    {
      _id: "same_day",
      count: rawData.find((item) => item._id === "same_day")?.count || 0,
      fill: SHIPPING_TYPE_COLORS.same_day,
    },
    {
      _id: "overnight",
      count: rawData.find((item) => item._id === "overnight")?.count || 0,
      fill: SHIPPING_TYPE_COLORS.overnight,
    },
  ]
    .filter((item) => item.count > 0)
    .map((item) => ({
      ...item,
      percentage: total > 0 ? (item.count / total) * 100 : 0,
    }));

  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          className="drop-shadow-lg"
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 10}
          outerRadius={outerRadius + 14}
          fill={fill}
          opacity={0.4}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
        <circle cx={ex} cy={ey} r={3} fill={fill} />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey - 4}
          className="fill-foreground font-bold text-sm"
          textAnchor={cos >= 0 ? "start" : "end"}
        >
          {payload.count?.toLocaleString()}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey + 12}
          className="fill-muted-foreground text-xs font-medium"
          textAnchor={cos >= 0 ? "start" : "end"}
        >
          {payload.percentage?.toFixed(1)}%
        </text>
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
    setHoveredIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
    setHoveredIndex(-1);
  };

  // const CustomTooltip = ({ active, payload }: any) => {
  //   if (active && payload && payload.length) {
  //     const data = payload[0].payload;
  //     const IconComponent = SHIPPING_ICONS[data._id as keyof typeof SHIPPING_ICONS];
  //     return (
  //       <ChartTooltipContent>
  //         <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl">
  //           <div className="flex items-center gap-2 mb-2">
  //             <IconComponent className="w-4 h-4" style={{ color: data.fill }} />
  //             <p className="font-semibold text-foreground capitalize">{data._id.replace("_", " ")}</p>
  //           </div>
  //           <p className="text-lg font-bold" style={{ color: data.fill }}>
  //             {data.count?.toLocaleString()} parcels
  //           </p>
  //           <p className="text-sm text-muted-foreground">{data.percentage?.toFixed(1)}% of total shipments</p>
  //         </div>
  //       </ChartTooltipContent>
  //     );
  //   }
  //   return null;
  // };

  return (
    <div className="relative group">
      <Card
        className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-card/90 
                       hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm min-h-full"
      >
        {/* Animated background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-amber-500/5 to-violet-500/5 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <CardHeader className="pb-6 border-b border-border/30 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center
                             group-hover:bg-blue-500/20 transition-colors duration-300"
              >
                <Truck className="w-5 h-5 text-blue-500" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground">Shipping Method Distribution</CardTitle>
              <CardDescription className="text-muted-foreground font-medium mt-1">
                Service type breakdown with interactive visualization
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Chart */}
            <div className="relative">
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart className="z-10">
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={chartData}
                      dataKey="count"
                      nameKey="_id"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={50}
                      paddingAngle={2}
                      strokeWidth={2}
                      stroke="var(--background)"
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                      animationDuration={1000}
                      animationBegin={200}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center mb-16">
                  <div className="text-2xl font-bold text-foreground">{total.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </div>
            </div>

            {/* Legend with stats */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg mb-4">Method Breakdown</h3>
              {chartData.map((item, index) => {
                const IconComponent = SHIPPING_ICONS[item._id as keyof typeof SHIPPING_ICONS];
                const isHovered = hoveredIndex === index;
                return (
                  <div
                    key={item._id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300
                               cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
                                 isHovered ? "border-2 shadow-lg scale-[1.02] " : "border-border/50 hover:border-border"
                               }`}
                    style={{
                      background: isHovered
                        ? `linear-gradient(135deg, ${item.fill}20, ${item.fill}10)`
                        : `linear-gradient(135deg, ${item.fill}10, ${item.fill}05)`,
                      borderColor: isHovered ? item.fill : undefined,
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isHovered ? "scale-110" : ""
                        }`}
                        style={{ backgroundColor: `${item.fill}25` }}
                      >
                        <IconComponent
                          className={`w-4 h-4 transition-all duration-300 ${isHovered ? "scale-110" : ""}`}
                          style={{ color: item.fill }}
                        />
                      </div>
                      <div>
                        <div
                          className={`font-semibold text-foreground capitalize transition-all duration-300 ${
                            isHovered ? "text-lg" : ""
                          }`}
                        >
                          {item._id.replace("_", " ")}
                        </div>
                        <div
                          className={`text-sm text-muted-foreground transition-all duration-300 ${
                            isHovered ? "font-medium" : ""
                          }`}
                        >
                          {item.percentage?.toFixed(1)}% of total
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold text-foreground transition-all duration-300 ${
                          isHovered ? "text-xl scale-110" : ""
                        }`}
                      >
                        {item.count.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">parcels</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom stats */}
          {chartData.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div
                className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 
                             border border-blue-500/20"
              >
                <div className="text-xl font-bold text-foreground">
                  {Math.max(...chartData.map((d) => d.percentage || 0)).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground mt-1">Most Popular</div>
              </div>
              <div
                className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-500/5 to-amber-500/10 
                             border border-amber-500/20"
              >
                <div className="text-xl font-bold text-foreground">{chartData.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Active Methods</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ShippingTypeChart;
