import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BoxIcon, CheckCircle, Clock, Truck } from "lucide-react"

interface StatusCount {
  _id: string
  count: number
}

interface AnalyticsData {
  totalParcel?: number
  totalParcelByStatus?: StatusCount[]
}

interface OverviewCardsProps {
  data?: AnalyticsData
}

function OverviewCards({ data }: OverviewCardsProps) {
  // Extract counts from your API data
  const total = data?.totalParcel

  const delivered = data?.totalParcelByStatus?.find((item: StatusCount) => item._id === "Delivered")?.count || 0
  const inTransit = data?.totalParcelByStatus?.find((item: StatusCount) => item._id === "In-Transit")?.count || 0
  const requested = data?.totalParcelByStatus?.find((item: StatusCount) => item._id === "Requested")?.count || 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="@container/card transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-red-50/80 via-red-50/40 to-red-100/60 dark:from-red-950/30 dark:via-red-950/20 dark:to-red-900/40 hover:scale-[1.02] hover:shadow-2xl group">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardDescription className="text-sm font-medium text-red-700 dark:text-red-300">
                Total Parcels
              </CardDescription>
              <CardTitle className="text-3xl font-bold tabular-nums text-red-900 dark:text-red-100 @[250px]/card:text-4xl">
                {total?.toLocaleString() || "0"}
              </CardTitle>
            </div>
            <CardAction className="p-3 rounded-xl bg-red-100/90 dark:bg-red-800/60 hover:bg-red-200 dark:hover:bg-red-700 transition-all duration-200 group-hover:scale-110">
              <BoxIcon className="h-6 w-6 text-red-600 dark:text-red-300" />
            </CardAction>
          </div>
        </CardHeader>
        <CardFooter className="pt-0">
          <div className="text-sm text-red-600/80 dark:text-red-400/80 font-medium">Total parcels in the system</div>
        </CardFooter>
      </Card>

      <Card className="@container/card  transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-emerald-50/80 via-emerald-50/40 to-emerald-100/60 dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-emerald-900/40 hover:scale-[1.02] hover:shadow-2xl group">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardDescription className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Delivered
              </CardDescription>
              <CardTitle className="text-3xl font-bold tabular-nums text-emerald-900 dark:text-emerald-100 @[250px]/card:text-4xl">
                {delivered.toLocaleString()}
              </CardTitle>
            </div>
            <CardAction className="p-3 rounded-xl bg-emerald-100/90 dark:bg-emerald-800/60 hover:bg-emerald-200 dark:hover:bg-emerald-700 transition-all duration-200 group-hover:scale-110">
              <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
            </CardAction>
          </div>
        </CardHeader>
        <CardFooter className="pt-0">
          <div className="text-sm text-emerald-600/80 dark:text-emerald-400/80 font-medium">
            Successfully delivered parcels
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-amber-50/80 via-amber-50/40 to-amber-100/60 dark:from-amber-950/30 dark:via-amber-950/20 dark:to-amber-900/40 hover:scale-[1.02] hover:shadow-2xl group">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardDescription className="text-sm font-medium text-amber-700 dark:text-amber-300">
                In-Transit
              </CardDescription>
              <CardTitle className="text-3xl font-bold tabular-nums text-amber-900 dark:text-amber-100 @[250px]/card:text-4xl">
                {inTransit.toLocaleString()}
              </CardTitle>
            </div>
            <CardAction className="p-3 rounded-xl bg-amber-100/90 dark:bg-amber-800/60 hover:bg-amber-200 dark:hover:bg-amber-700 transition-all duration-200 group-hover:scale-110">
              <Truck className="h-6 w-6 text-amber-600 dark:text-amber-300" />
            </CardAction>
          </div>
        </CardHeader>
        <CardFooter className="pt-0">
          <div className="text-sm text-amber-600/80 dark:text-amber-400/80 font-medium">
            Parcels currently in transit
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card  transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-blue-50/80 via-blue-50/40 to-blue-100/60 dark:from-blue-950/30 dark:via-blue-950/20 dark:to-blue-900/40 hover:scale-[1.02] hover:shadow-2xl group">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardDescription className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Requested
              </CardDescription>
              <CardTitle className="text-3xl font-bold tabular-nums text-blue-900 dark:text-blue-100 @[250px]/card:text-4xl">
                {requested.toLocaleString()}
              </CardTitle>
            </div>
            <CardAction className="p-3 rounded-xl bg-blue-100/90 dark:bg-blue-800/60 hover:bg-blue-200 dark:hover:bg-blue-700 transition-all duration-200 group-hover:scale-110">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </CardAction>
          </div>
        </CardHeader>
        <CardFooter className="pt-0">
          <div className="text-sm text-blue-600/80 dark:text-blue-400/80 font-medium">Parcels awaiting processing</div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default OverviewCards
