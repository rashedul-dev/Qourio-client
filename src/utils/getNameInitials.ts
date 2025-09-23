export const getNameInitials = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};
