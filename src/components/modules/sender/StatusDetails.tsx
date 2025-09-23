import Error from "@/components/Error";
import Information from "@/components/Information";
import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetParcelStatusLogQuery } from "@/redux/features/parcel/parcelApi";
import { getStatusColor } from "@/utils/getStatusColor";
import { format } from "date-fns";
import { Mail, MapPin, Package, Phone, User } from "lucide-react";
import { useParams } from "react-router";
import StatusTimeLine from "./StatusTimeLine";
import { formatStreetCity } from "@/utils/formatAddress";
import { getEstimatedDeliveryDate } from "@/utils/estimatedDeliveryDate";

const StatusDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetParcelStatusLogQuery(id);

  if (isLoading) return <Loading message="Loading details..." />;
  if (!isLoading && isError) return <Error message={(error as any)?.message} />;
  if (!isLoading && !isError && data && !data?.data)
    return <Information message="No details available for this parcel" />;

  const {
    trackingId,
    // estimatedDelivery,
    currentStatus,
    currentLocation,
    sender,
    recipient: receiver,
    pickupAddress,
    deliveryAddress,
    deliveredAt,
    cancelledAt,
    statusLog,
  } = data?.data || {};

  console.log(data);
  const lastLog = statusLog?.[statusLog.length - 1];
  const estimatedDelivery = lastLog ? getEstimatedDeliveryDate(currentStatus as string, lastLog.updatedAt) : "-";

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30"></div>
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Parcel Details
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Status Details</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Parcel Info Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-6 h-6 text-primary" />
                  Parcel Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tracking ID</p>
                  <p className="font-mono font-bold text-md">{trackingId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(currentStatus ?? "Unknown")}>{currentStatus}</Badge>
                </div>
                {currentLocation && (
                  <div>
                    <p className="text-sm text-muted-foreground">Current Location</p>
                    <p className="font-semibold">{currentLocation}</p>
                  </div>
                )}
                {!cancelledAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-semibold">
                      {estimatedDelivery ? format(new Date(estimatedDelivery), "PP") : "-"}
                    </p>
                  </div>
                )}
                {deliveredAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Delivered At</p>
                    <p className="font-semibold">{format(new Date(deliveredAt), "PP")}</p>
                  </div>
                )}
                {cancelledAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Cancelled At</p>
                    <p className="font-semibold">{format(new Date(cancelledAt), "PP")}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-card to-card/50 mt-6 text-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex mx-auto">Address Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  {/* Sender Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-lg">SENDER</span>
                    </div>
                    <div className="pl-6 space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{sender?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{sender?.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{sender?.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{formatStreetCity(pickupAddress)}</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  {/* receiver Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-lg">RECIPIENT</span>
                    </div>
                    <div className="pl-6 space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{receiver?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{receiver?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{formatStreetCity(deliveryAddress)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {statusLog && statusLog.length > 0 && <StatusTimeLine statusLog={statusLog} />}
        </div>
      </div>
    </section>
  );
};

export default StatusDetails;
