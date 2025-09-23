export interface IParcelTrackData {
  trackingId: string;
  currentStatus: string;
  estimatedDelivery: string;
  deliveredAt: string;
  statusLog: IStatusLog[];
  pickupAddress: string;
  deliveryAddress: string;
  updatedAt: string;
}

export interface IStatusLog {
  status: string;
  location: string;
  note: string;
  updatedBy?: IUpdatedBy;
  updatedAt: string;
}

export interface IUpdatedBy {
  _id?: string;
  role?: string;
  name?: string;
  email?: string;
  phone?: string;
}
