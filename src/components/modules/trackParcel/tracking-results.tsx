"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectSeparator } from "@/components/ui/select";
import type { IParcelTrackData, IResponse } from "@/types";
import { getStatusColor } from "@/utils/getStatusColor";
import { format } from "date-fns";
import { Package, CheckCircle, Clock, Flag, Shield, Truck, XCircle } from "lucide-react";
import { formatStreetCity } from "@/utils/formatAddress";
import { getEstimatedDeliveryDate } from "@/utils/estimatedDeliveryDate";
// import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { IStatusLog } from "@/types";
import { ParcelStatus } from "@/types/sender-parcel-type";
import type { JSX } from "react";

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

const getStatusIcon = (status: string) => STATUS_ICONS[status] || <Package className="w-5 h-5 text-gray-500" />;

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

const TrackingResults = ({ data }: { data: IResponse<IParcelTrackData> }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const [trackingId] = useState(searchParams?.get("trackingId") || "");

  const { currentStatus, deliveredAt, pickupAddress, deliveryAddress, statusLog } = data.data || {};

  const lastLog = statusLog?.[statusLog.length - 1];
  const estimatedDelivery = lastLog ? getEstimatedDeliveryDate(currentStatus, lastLog.updatedAt) : "-";

  return (
    <section className="py-20 relative" id="parcel-details">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30"></div>
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Parcel Details
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Tracking Information</h2>
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
                  <Badge className={getStatusColor(currentStatus)}>{currentStatus}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="font-semibold">{estimatedDelivery ? format(new Date(estimatedDelivery), "PP") : "-"}</p>
                </div>
                {deliveredAt && (
                  <div>
                    <p className="text-sm text-muted-foreground">Delivered At</p>
                    <p className="font-semibold">{deliveredAt ? format(new Date(deliveredAt), "PP") : "-"}</p>
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
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Address</p>
                  <p className="font-semibold">{formatStreetCity(pickupAddress)}</p>
                </div>
                <SelectSeparator />
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Address</p>
                  <p className="font-semibold">{formatStreetCity(deliveryAddress)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle>Tracking Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {statusLog?.map((item: IStatusLog, index: number) => (
                    <StatusItem key={index} item={item} isLast={index === statusLog.length - 1} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingResults;
