// utils/formatAddress.ts
export const formatStreetCity = (
  address:
    | { street?: string; city?: string; state?: string; postalCode?: string; country?: string; _id?: string }
    | string
    | null
    | undefined
): string => {
  if (!address) return "";

  if (typeof address === "string") return address; // if it's already a string

  const { street, city, state, postalCode, country } = address;
  return [street, city, state, postalCode, country].filter(Boolean).join(", ");
};
