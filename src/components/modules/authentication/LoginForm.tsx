import { LoginTry } from "@/components/LoginTry";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { ADMIN_DEFAULT_ROUTE, RECEIVER_DEFAULT_ROUTE, SENDER_DEFAULT_ROUTE } from "@/routes/constants";
import { ILogin } from "@/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const res = await login(data).unwrap();

      const role = res?.data?.user?.role?.toUpperCase();

      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        toast.success("Logged in successfully");
        navigate(ADMIN_DEFAULT_ROUTE, { replace: true });
        return;
      } else if (role === "SENDER") {
        toast.success("Logged in successfully");
        navigate(SENDER_DEFAULT_ROUTE, { replace: true });
        return;
      } else if (role === "RECEIVER") {
        toast.success("Logged in successfully");
        navigate(RECEIVER_DEFAULT_ROUTE, { replace: true });
        return;
      } else {
        toast.success("Logged in successfully");
        navigate("/", { replace: true });
        return;
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };

      if (error?.data?.message === "User does not exist") {
        toast.error("User Not Found");
      }

      if (error?.data?.message === "Password does not match") {
        toast.error("Invalid Credentials");
      }

      if (error?.data?.message === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: { email: data.email } });
      }
    }
  };

  // Handler for quick demo login
  const handleQuickLogin = async (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
    await onSubmit({ email, password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div>
              <LoginTry onQuickLogin={handleQuickLogin} />
            </div>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
