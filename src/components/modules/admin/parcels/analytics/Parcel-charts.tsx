import type { IAnalyticsData } from "@/types"
import DeliveryStatusBarChart from "./Delivery-status-bar-chart"
import ShipmentBarChart from "./Shipment-bar-chart"
import ShippingTypeChart from "./Shipping-type-chart"
import TypePieChart from "./Type-pie-chart"

interface ParcelChartsProps {
  data?: IAnalyticsData
}

function ParcelCharts({ data }: ParcelChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
      <DeliveryStatusBarChart data={data} />
      <ShipmentBarChart data={data} />
      <TypePieChart data={data} />
      <ShippingTypeChart data={data} />
    </div>
  )
}

export default ParcelCharts
