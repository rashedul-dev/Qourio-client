export enum ParcelStatus {
  REQUESTED = "Requested",
  APPROVED = "Approved",
  PENDING = "Pending",
  PICKED = "Picked",
  DISPATCHED = "Dispatched",
  IN_TRANSIT = "In-Transit",
  RESCHEDULED = "Rescheduled",
  DELIVERED = "Delivered",
  RETURNED = "Returned",
  CANCELLED = "Cancelled",
  BLOCKED = "Blocked",
  FLAGGED = "Flagged",
  OUT_FOR_DELIVERY = "Out for Delivery",
  FAILED_ATTEMPT = "Failed Attempt",
  LOST = "Lost",
  DAMAGED = "Damaged",
  RECEIVED = "Received",
}

export enum ParcelType {
  DOCUMENT = "document",
  PACKAGE = "package",
  FRAGILE = "fragile",
  ELECTRONICS = "electronics",
  FOOD = "food",
  MEDICINE = "medicine",
  CLOTHING = "clothing",
  VALUABLE = "valuable",
  BOOKS = "books",
  OTHER = "other",
}

export enum ShippingType {
  STANDARD = "standard",
  EXPRESS = "express",
  SAME_DAY = "same_day",
  OVERNIGHT = "overnight",
}

export interface IParcel {
  _id: string;
  trackingId: string;
  type: ParcelType;
  shippingType: ShippingType;
  weight: number;
  weightUnit: string;
  fee: number;
  couponCode: string;
  estimatedDelivery: Date | null;
  currentStatus: ParcelStatus;
  currentLocation: string | null;
  isPaid: boolean;
  sender: Sender;
  receiver: Recipient;
  recipient: Recipient;
  pickupAddress: string;
  deliveryAddress: string;
  statusLog: StatusLog[];
  deliveredAt: Date | null;
  cancelledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deliveryPersonnel?: string[];
  deliveryPersonnelId?: string; // just for form
  isBlocked?: boolean;
}

export interface Sender {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Recipient {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface StatusLog {
  status: string;
  location: string;
  note: string;
  updatedBy: UpdatedBy;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatedBy {
  name: string;
  role: string;
}

export interface IParcelParams {
  searchTerm?: string;
  page: number;
  limit: number;
  sort?: string;
  currentStatus?: string[];
}
