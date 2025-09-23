import { addDays, format } from "date-fns";
import { ParcelStatus } from "@/types/sender-parcel-type";

export function getEstimatedDeliveryDate(
  status: string,
  lastUpdatedAt: string | Date,
  options?: { customDays?: Partial<Record<ParcelStatus, number>> }
): string {
  const baseDate = new Date(lastUpdatedAt);

  const defaultDays: Record<ParcelStatus, number> = {
    [ParcelStatus.REQUESTED]: 7,
    [ParcelStatus.APPROVED]: 6,
    [ParcelStatus.PICKED]: 5,
    [ParcelStatus.DISPATCHED]: 4,
    [ParcelStatus.IN_TRANSIT]: 3,
    [ParcelStatus.OUT_FOR_DELIVERY]: 1,
    [ParcelStatus.DELIVERED]: 0,
    [ParcelStatus.RETURNED]: 0,
    [ParcelStatus.CANCELLED]: 0,
    [ParcelStatus.BLOCKED]: 0,
    [ParcelStatus.FLAGGED]: 0,
    [ParcelStatus.FAILED_ATTEMPT]: 2,
    [ParcelStatus.RESCHEDULED]: 3,
    [ParcelStatus.LOST]: 0,
    [ParcelStatus.DAMAGED]: 0,
    [ParcelStatus.RECEIVED]: 0,
    [ParcelStatus.PENDING]: 7,
  };

  const daysToAdd =
    options?.customDays?.[status as ParcelStatus] ??
    defaultDays[status as ParcelStatus] ??
    5;

  return format(addDays(baseDate, daysToAdd), "PP");
}
