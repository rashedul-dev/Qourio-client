import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcelApi";
import { IParcel, ParcelType, ShippingType } from "@/types/sender-parcel-type";
import { toast } from "sonner";

// Helper to parse a comma-separated string into an address object
const parseAddressString = (str: string) => {
  if (!str) return {};
  const parts = str.split(",").map((p) => p.trim());
  return {
    street: parts[0] || "",
    city: parts[1] || "",
    state: parts[2] || "",
    postalCode: parts[3] || "",
    country: parts[4] || "",
  };
};

// Zod schema for address input as a string
const addressStringSchema = z
  .string()
  .max(100, { message: "Address cannot exceed 100 characters." })
  .refine((val) => val.trim() !== "", {
    message: "Address is required",
  })
  .transform(parseAddressString);

export const formSchema = z.object({
  type: z.enum(Object.values(ParcelType) as [string]).optional(),
  shippingType: z.enum(Object.values(ShippingType) as [string]).optional(),
  weight: z.coerce
    .number({ error: "Weight must be a number" })
    .min(0.1, { message: "Weight must be at least 0.1 kg" })
    .max(10, { message: "Weight cannot exceed 10 kg" }),
  couponCode: z
    .string({ error: "Coupon code must be a string" })
    .max(20, { message: "Coupon code cannot exceed 20 characters." })
    .optional(),
  receiverEmail: z
    .string()
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  pickupAddress: addressStringSchema.optional(),
  deliveryAddress: addressStringSchema.optional(),
});

interface CreateParcelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateParcelDialog({ open, onOpenChange }: CreateParcelDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      receiverEmail: "",
      // pickupAddress: "",
      // deliveryAddress: "",
      weight: 2,
      type: ParcelType.PACKAGE,
      shippingType: ShippingType.STANDARD,
      couponCode: "",
    },
  });

  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createParcel(values as Partial<IParcel>).unwrap();
      form.reset();
      onOpenChange(false); // close after success
      toast.success("Parcel created successfully");
    } catch (error) {
      console.error("Failed to create parcel:", error);
      toast.error("Failed to create parcel", {
        description: (error as any)?.data?.message || "Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Parcel</DialogTitle>
          <DialogDescription>Fill out the form to send a parcel.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="receiverEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="quorio@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative">
              <FormField
                // control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Address</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute -inset-y-2 start-26 text-muted-foreground/80">
                {/* <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon size={14} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>If empty, system will use your default address</p>
                  </TooltipContent>
                </Tooltip> */}
              </div>
            </div>

            <div className="relative">
              <FormField
                // control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute -inset-y-2 start-28 text-muted-foreground/80">
                {/* <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon size={14} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>If empty, system will use your receiver default address</p>
                  </TooltipContent>
                </Tooltip> */}
              </div>
            </div>

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0.1"
                      {...field}
                      value={typeof field.value === "number" ? field.value : Number(field.value) || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcel Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select parcel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ParcelType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select shipping type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ShippingType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="couponCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Code</FormLabel>
                  <FormControl>
                    <Input placeholder="IK5QY5NL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <DialogFooter className="flex justify-between items-center">
              {isLoading && <Spinner variant={"circle-filled"} />}
              <Button type="submit" disabled={isLoading}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
