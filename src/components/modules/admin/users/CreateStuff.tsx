// components/CreateUserDialog.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateAdminMutation, useCreateDeliveryPersonnelMutation } from "@/redux/features/user/userApi";
import { Role } from "@/types/user-type";
import { toast } from "sonner";
import { registerSchema } from "../../authentication/RegisterForm";

const createStuffZodSchema = registerSchema.extend({
  role: z.literal([Role.ADMIN, Role.DELIVERY_MAN]),
});

type FormValues = z.infer<typeof createStuffZodSchema>;

interface CreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateStuffDialog({ open, onOpenChange }: CreateDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(createStuffZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: Role.DELIVERY_MAN,
      defaultAddress: "",
      phone: "",
    },
  });

  const [createDeliveryPersonnel] = useCreateDeliveryPersonnelMutation();

  const [createAdmin] = useCreateAdminMutation();

  const onSubmit = async (values: FormValues) => {
    if (values.role === Role.DELIVERY_MAN) {
      try {
        await createDeliveryPersonnel(values).unwrap();
        form.reset();
        onOpenChange(false); // close after success
        toast.success("Delivery personnel created successfully");
      } catch (error) {
        console.error("Failed to create delivery personnel:", error);
        toast.error("Failed to create delivery personnel", {
          description: (error as any)?.data?.message || "Please try again.",
        });
      }
    } else {
      try {
        await createAdmin(values).unwrap();
        form.reset();
        onOpenChange(false); // close after success
        toast.success("Admin created successfully");
      } catch (error) {
        console.error("Failed to create admin:", error);
        toast.error("Failed to create admin", {
          description: (error as any)?.data?.message || "Please try again.",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Stuff</DialogTitle>
          <DialogDescription>Fill out the form to create stuff.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@company.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your email input.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your password input.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your confirm password input.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Your Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="DELIVERY_MAN">Delivery Man</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="sr-only">This is your role selection.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" type="text" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your address input.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01717112233" type="text" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">This is your phone number input.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
