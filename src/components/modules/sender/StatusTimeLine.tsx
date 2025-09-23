import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParcelStatus, StatusLog } from "@/types/sender-parcel-type";
import { format } from "date-fns";
import { CheckCircle, Clock, Flag, Package, Shield, Truck, XCircle } from "lucide-react";
import { formatStreetCity } from "@/utils/formatAddress";

interface StatusTimeLineProps {
  statusLog: StatusLog[];
}

const getStatusIcon = (status: ParcelStatus) => {
  switch (status) {
    case ParcelStatus.DELIVERED:
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case ParcelStatus.IN_TRANSIT:
    case ParcelStatus.DISPATCHED:
      return <Truck className="w-5 h-5 text-blue-500" />;
    case ParcelStatus.PICKED:
      return <Package className="w-5 h-5 text-orange-500" />;
    case ParcelStatus.APPROVED:
      return <CheckCircle className="w-5 h-5 text-yellow-500" />;
    case ParcelStatus.REQUESTED:
      return <Clock className="w-5 h-5 text-gray-500" />;
    case ParcelStatus.RESCHEDULED:
      return <Clock className="w-5 h-5 text-indigo-500" />;
    case ParcelStatus.RETURNED:
    case ParcelStatus.CANCELLED:
      return <XCircle className="w-5 h-5 text-red-500" />;
    case ParcelStatus.BLOCKED:
      return <Shield className="w-5 h-5 text-red-500" />;
    case ParcelStatus.FLAGGED:
      return <Flag className="w-5 h-5 text-yellow-500" />;
    case ParcelStatus.OUT_FOR_DELIVERY:
      return <Truck className="w-5 h-5 text-green-600" />;
    case ParcelStatus.FAILED_ATTEMPT:
      return <XCircle className="w-5 h-5 text-orange-600" />;
    case ParcelStatus.LOST:
    case ParcelStatus.DAMAGED:
      return <XCircle className="w-5 h-5 text-red-700" />;
    case ParcelStatus.RECEIVED:
      return <CheckCircle className="w-5 h-5 text-teal-500" />;
    case ParcelStatus.PENDING:
      return <Clock className="w-5 h-5 text-gray-400" />;
    default:
      return <Package className="w-5 h-5 text-gray-500" />;
  }
};

const StatusTimeLine: React.FC<StatusTimeLineProps> = ({ statusLog }) => {
  if (!statusLog || statusLog.length === 0) return null;

  return (
    <div className="lg:col-span-2">
      <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle>Tracking Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {statusLog.map((item, index) => {
              const updatedAt = item.updatedAt ? format(new Date(item.updatedAt), "PP h:mm a") : "N/A";

              return (
                <div key={index} className="flex gap-4">
                  {/* Icon and connector */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {getStatusIcon(item.status as any)}
                    </div>
                    {index < statusLog.length - 1 && <div className="w-0.5 h-12 bg-muted mt-2"></div>}
                  </div>

                  {/* Status content */}
                  <div className="flex-1 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="font-semibold mb-2 md:mb-0">{item.status}</h4>
                      <span className="text-sm text-muted-foreground">{updatedAt}</span>
                    </div>

                    {/* Location */}
                    {item.location && (
                      <p className="text-sm text-muted-foreground mb-1">{formatStreetCity(item.location)}</p>
                    )}

                    {/* Updated by */}
                    {item.updatedBy && (
                      <p className="text-sm text-muted-foreground mb-1">
                        Updated by: {item.updatedBy.name}, {item.updatedBy.role}
                      </p>
                    )}

                    {/* Note */}
                    {item.note && <p className="text-sm">{item.note}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusTimeLine;
