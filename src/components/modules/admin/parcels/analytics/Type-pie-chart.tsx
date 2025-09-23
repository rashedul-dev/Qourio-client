import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { FileText, Package, ShieldAlert, Smartphone } from "lucide-react";

const chartConfig = {
  count: {
    label: "Count",
  },
  document: {
    label: "Document",
    color: "#3b82f6",
  },
  package: {
    label: "Package",
    color: "#10b981",
  },
  fragile: {
    label: "Fragile",
    color: "#f59e0b",
  },
  electronics: {
    label: "Electronics",
    color: "#8b5cf6",
  },
};

const PARCEL_TYPE_COLORS = {
  document: "#3b82f6",
  package: "#10b981",
  fragile: "#f59e0b",
  electronics: "#8b5cf6",
};

const PARCEL_ICONS = {
  document: FileText,
  package: Package,
  fragile: ShieldAlert,
  electronics: Smartphone,
};

interface ChartDataItem {
  _id: string;
  count: number;
  fill: string;
  percentage?: number;
}

interface AnalyticsData {
  parcelPerType?: Array<{
    _id: string;
    count: number;
  }>;
}

interface TypePieChartProps {
  data?: AnalyticsData;
}

function TypePieChart({ data }: TypePieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const rawData = data?.parcelPerType || [];
  const total = rawData.reduce((sum, item) => sum + item.count, 0);

  const chartData: ChartDataItem[] = [
    {
      _id: "document",
      count: rawData.find((item) => item._id === "document")?.count || 0,
      fill: PARCEL_TYPE_COLORS.document,
    },
    {
      _id: "package",
      count: rawData.find((item) => item._id === "package")?.count || 0,
      fill: PARCEL_TYPE_COLORS.package,
    },
    {
      _id: "fragile",
      count: rawData.find((item) => item._id === "fragile")?.count || 0,
      fill: PARCEL_TYPE_COLORS.fragile,
    },
    {
      _id: "electronics",
      count: rawData.find((item) => item._id === "electronics")?.count || 0,
      fill: PARCEL_TYPE_COLORS.electronics,
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
          className="drop-shadow-xl"
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
          {payload.count.toLocaleString()}
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

  return (
    <div className="relative group">
      <Card
        className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-card/90 
                       hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm min-h-full"
      >
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-violet-500/5 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <CardHeader className="pb-6 border-b border-border/30 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center
                             group-hover:bg-emerald-500/20 transition-colors duration-300"
              >
                <Package className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground">Parcel Type Distribution</CardTitle>
              <CardDescription className="text-muted-foreground font-medium mt-1">
                Interactive breakdown by category with hover details
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Interactive Chart */}
            <div className="relative">
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart className="z-10">
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
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
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                      animationDuration={1000}
                      animationBegin={200}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                          className="hover:opacity-90 cursor-pointer transition-all duration-200"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              {/* Center statistics */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground animate-pulse">{total.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground font-medium ">Total Types</div>
                </div>
              </div>
            </div>

            {/* Enhanced Legend */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground text-lg mb-4">Category Breakdown</h3>
              {chartData.map((item, index) => {
                const IconComponent = PARCEL_ICONS[item._id as keyof typeof PARCEL_ICONS];
                const isHover = hoveredIndex === index;
                return (
                  <div
                    key={item._id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300
                               cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
                                 isHover ? "border-2 shadow-lg scale-[1.02]" : "border-border/50 hover:border-border"
                               }`}
                    style={{
                      background: isHover
                        ? `linear-gradient(135deg, ${item.fill}15, ${item.fill}08)`
                        : `linear-gradient(135deg, ${item.fill}08, ${item.fill}03)`,
                      borderColor: isHover ? item.fill : undefined,
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          isHover ? "scale-110" : ""
                        }`}
                        style={{ backgroundColor: `${item.fill}25` }}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-all duration-300 ${isHover ? "scale-110" : ""}`}
                          style={{ color: item.fill }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-foreground capitalize text-base">{item._id}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.percentage?.toFixed(1)}% of total shipments
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-xl font-bold text-foreground transition-all duration-200 ${
                          isHover ? "scale-110" : ""
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

          {/* Enhanced bottom statistics */}
          {chartData.length > 0 && (
            <div className="mt-20 grid grid-cols-3 gap-4">
              <div
                className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 
                             border border-emerald-500/20 hover:shadow-md transition-shadow"
              >
                <div className="text-xl font-bold text-foreground">
                  {chartData.reduce((max, item) => Math.max(max, item.count), 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Highest Count</div>
              </div>
              <div
                className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 
                             border border-blue-500/20 hover:shadow-md transition-shadow"
              >
                <div className="text-xl font-bold text-foreground">
                  {Math.max(...chartData.map((d) => d.percentage || 0)).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground mt-1">Top Category</div>
              </div>
              <div
                className="text-center p-4 rounded-xl bg-gradient-to-br from-violet-500/5 to-violet-500/10 
                             border border-violet-500/20 hover:shadow-md transition-shadow"
              >
                <div className="text-xl font-bold text-foreground">{chartData.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Active Types</div>
              </div>
            </div>
          )}

          {/* Loading state for empty data */}
          {chartData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-muted-foreground animate-pulse" />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground mb-2">No Data Available</div>
                <div className="text-sm text-muted-foreground">
                  Parcel type data will appear here once shipments are created
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default TypePieChart;
