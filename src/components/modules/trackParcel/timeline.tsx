import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IStatusLog } from "@/types";
import { ParcelStatus } from "@/types/sender-parcel-type";
import { formatStreetCity } from "@/utils/formatAddress";
import { format } from "date-fns";
import { CheckCircle, Clock, Flag, Package, Shield, Truck, XCircle } from "lucide-react";
import type { JSX } from "react";

// Centralized icon mapping
const STATUS_ICONS: Record<string, JSX.Element> = {
  [ParcelStatus.DELIVERED]: <CheckCircle className="w-5 h-5 text-green-500" />,
  [ParcelStatus.IN_TRANSIT]: <Truck className="w-5 h-5 text-blue-500" />,
  [ParcelStatus.DISPATCHED]: <Truck className="w-5 h-5 text-blue-500" />,
  [ParcelStatus.PICKED]: <Package className="w-5 h-5 text-orange-500" />,
  [ParcelStatus.APPROVED]: <CheckCircle className="w-5 h-5 text-yellow-500" />,
  [ParcelStatus.REQUESTED]: <Clock className="w-5 h-5 text-gray-500" />,
  [ParcelStatus.RESCHEDULED]: <Clock className="w-5 h-5 text-indigo-500" />,
  [ParcelStatus.RETURNED]: <XCircle className="w-5 h-5 text-red-500" />,
  [ParcelStatus.CANCELLED]: <XCircle className="w-5 h-5 text-red-500" />,
  [ParcelStatus.BLOCKED]: <Shield className="w-5 h-5 text-red-500" />,
  [ParcelStatus.FLAGGED]: <Flag className="w-5 h-5 text-yellow-500" />,
  [ParcelStatus.OUT_FOR_DELIVERY]: <Truck className="w-5 h-5 text-green-600" />,
  [ParcelStatus.FAILED_ATTEMPT]: <XCircle className="w-5 h-5 text-orange-600" />,
  [ParcelStatus.LOST]: <XCircle className="w-5 h-5 text-red-700" />,
  [ParcelStatus.DAMAGED]: <XCircle className="w-5 h-5 text-red-700" />,
  [ParcelStatus.RECEIVED]: <CheckCircle className="w-5 h-5 text-teal-500" />,
  [ParcelStatus.PENDING]: <Clock className="w-5 h-5 text-gray-400" />,
};

// Fallback icon
const getStatusIcon = (status: string) => STATUS_ICONS[status] || <Package className="w-5 h-5 text-gray-500" />;

// Extracted status item for readability
const StatusItem = ({ item, isLast }: { item: IStatusLog; isLast: boolean }) => {
  const date = item?.updatedAt ? new Date(item.updatedAt) : null;
  const formattedDate = date && !isNaN(date.getTime()) ? format(date, "PP h:mm a") : "Unknown date";

  return (
    <div className="flex gap-4">
      {/* Timeline icon + connector */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          {getStatusIcon(item?.status)}
        </div>
        {!isLast && <div className="w-0.5 h-12 bg-muted mt-2"></div>}
      </div>

      {/* Details */}
      <div className="flex-1 pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h4 className="font-semibold mb-2 md:mb-0">{item?.status}</h4>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>

        {item?.location && <p className="text-sm text-muted-foreground mb-1">{formatStreetCity(item.location)}</p>}
        {item?.updatedBy && (
          <p className="text-sm text-muted-foreground mb-1">
            Updated by: {item.updatedBy.name}, {item.updatedBy.role}
          </p>
        )}
        {item?.note && <p className="text-sm">{item.note}</p>}
      </div>
    </div>
  );
};

const TimeLine = ({ statusLog }: { statusLog: IStatusLog[] }) => {
  return (
    <div className="lg:col-span-2">
      <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle>Tracking Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {statusLog.map((item, index) => (
              <StatusItem key={index} item={item} isLast={index === statusLog.length - 1} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeLine;
