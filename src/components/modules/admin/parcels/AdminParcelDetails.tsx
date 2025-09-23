import Error from "@/components/Error";
import Information from "@/components/Information";
import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetParcelByIdQuery } from "@/redux/features/parcel/parcelApi";
import { IUpdatedBy } from "@/types/parcel-type";
import { getStatusColor } from "@/utils/getStatusColor";
import { format } from "date-fns";
import { Home, IdCardIcon, Mail, MapPin, Package, Phone, User } from "lucide-react";
import { useParams } from "react-router";
import AdminParcelTimeLine from "./AdminParcelTimeLine";
import { formatStreetCity } from "@/utils/formatAddress";

const AdminParcelDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetParcelByIdQuery(id);
  console.log(data);

  if (isLoading) {
    return <Loading message="Loading details..." />;
  }

  if (!isLoading && isError) {
    return <Error message={(error as { message: string })?.message} />;
  }

  if (!isLoading && !isError && data && !data?.data) {
    return <Information message="No details available for this parcel" />;
  }
  console.log(data?.data);
  // console.log(data?.data?.recipient?.name);
  const {
    trackingId,
    estimatedDelivery,
    currentStatus,
    currentLocation,
    sender,
    // receiver,
    recipient: receiver,
    pickupAddress,
    deliveryAddress,
    deliveredAt,
    cancelledAt,
    statusLog,
    deliveryPersonnel,
  } = data?.data || {};

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
                  <Badge className={getStatusColor(currentStatus ?? "")}>{currentStatus ?? "Unknown"}</Badge>
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
                      {estimatedDelivery ? format(new Date(estimatedDelivery), "PP") : "Not Available"}
                    </p>
                  </div>
                )}

                {deliveredAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Delivered At</p>
                    <p className="font-semibold">{format(new Date(deliveredAt).toLocaleDateString(), "PP")}</p>
                  </div>
                )}
                {cancelledAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Cancel At</p>
                    <p className="font-semibold">{format(new Date(cancelledAt).toLocaleDateString(), "PP")}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-card to-card/50 mt-6 text-sm">
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  {/* Sender Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-md">Sender</span>
                    </div>
                    <div className="pl-6 space-y-1">
                      <div className="flex items-center gap-2">
                        <IdCardIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{sender?._id}</span>
                      </div>
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
                  {/* Receiver Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-md">Receiver</span>
                    </div>
                    <div className="pl-6 space-y-1">
                      <div className="flex items-center gap-2">
                        <IdCardIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{receiver?._id || "Not Found"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{receiver?.name || "Not Found"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{receiver?.email || "Not Found"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{receiver?.phone || "Not Found"}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{formatStreetCity(deliveryAddress) || "Not Found"}</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  {/* Assigned Delivery Personnel */}
                  {deliveryPersonnel && deliveryPersonnel.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-md">Assigned Delivery Personnel</span>
                      </div>
                      <div className="space-y-4">
                        {(deliveryPersonnel as IUpdatedBy[]).map((person) => (
                          <div className="pl-6 space-y-1" key={person._id}>
                            <div className="flex items-center gap-2">
                              <IdCardIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{person?._id}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="font-semibold">{person?.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <span>{person?.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{person?.phone}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          {statusLog && statusLog.length > 0 && <AdminParcelTimeLine statusLog={statusLog} />}
        </div>
      </div>
    </section>
  );
};

export default AdminParcelDetails;
