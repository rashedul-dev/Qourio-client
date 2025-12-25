import { Link, useNavigate, useLocation } from "react-router";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggle";
import { authApi, useLogoutMutation } from "@/redux/features/auth/authApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { ADMIN_DEFAULT_ROUTE, RECEIVER_DEFAULT_ROUTE, SENDER_DEFAULT_ROUTE } from "@/routes/constants";
import { Role } from "@/types/user-type";
import { cn } from "@/lib/utils";
import { useState } from "react";

const PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/trackparcel", label: "Track Parcel" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const DASHBOARD_ROUTES: Record<string, string> = {
  [Role.ADMIN]: ADMIN_DEFAULT_ROUTE,
  [Role.SUPER_ADMIN]: ADMIN_DEFAULT_ROUTE,
  [Role.SENDER]: SENDER_DEFAULT_ROUTE,
  [Role.RECEIVER]: RECEIVER_DEFAULT_ROUTE,
};

const getDashboardRoute = (userRole?: string): string | null => {
  if (!userRole) return null;
  return DASHBOARD_ROUTES[userRole] || null;
};

const isActivePath = (currentPath: string, targetPath: string): boolean => {
  return currentPath === targetPath;
};

const isDashboardActive = (currentPath: string, dashboardRoute: string): boolean => {
  return currentPath.startsWith(dashboardRoute);
};

function MobileMenu({ userRole }: { userRole?: string }) {
  const location = useLocation();
  const dashboardRoute = getDashboardRoute(userRole);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={12}
        className="w-56 p-3 border-border/50 bg-popover/95 backdrop-blur-lg"
      >
        <nav className="flex flex-col gap-1">
          {PUBLIC_LINKS.map((link) => {
            const isActive = isActivePath(location.pathname, link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-3 py-2.5 text-[1rem] font-medium rounded-md transition-colors duration-150",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          {dashboardRoute && (
            <>
              <div className="my-2 h-px bg-border/50" />
              <Link
                to={dashboardRoute}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-3 py-2.5 text-[1rem] font-medium rounded-md transition-colors duration-150 flex items-center gap-2",
                  isDashboardActive(location.pathname, dashboardRoute)
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/90 text-primary-foreground hover:bg-primary"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </>
          )}
        </nav>
      </PopoverContent>
    </Popover>
  );
}

function DesktopNavigation() {
  const location = useLocation();

  return (
    <NavigationMenu className="max-md:hidden">
      <NavigationMenuList className="gap-1">
        {PUBLIC_LINKS.map((link) => {
          const isActive = isActivePath(location.pathname, link.href);
          return (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink asChild>
                <Link
                  to={link.href}
                  className={cn(
                    "relative px-3 py-2 text-[1rem] font-extrabold rounded-md transition-colors duration-150",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function DashboardButton({ userRole }: { userRole?: string }) {
  const location = useLocation();
  const dashboardRoute = getDashboardRoute(userRole);

  if (!dashboardRoute) return null;

  const isActive = isDashboardActive(location.pathname, dashboardRoute);

  return (
    <Button
      asChild
      size="sm"
      className={cn(
        "max-md:hidden h-9 font-medium transition-colors duration-150",
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-primary/90 text-primary-foreground hover:bg-primary"
      )}
    >
      <Link to={dashboardRoute} className="flex items-center gap-2">
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>
    </Button>
  );
}

function AuthButton({ isLoggedIn, onLogout }: { isLoggedIn: boolean; onLogout: () => void }) {
  if (isLoggedIn) {
    return (
      <Button
        onClick={onLogout}
        variant="outline"
        size="sm"
        className="h-9 font-medium border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/50"
      >
        <LogOut className="h-4 w-4" />
        <span className="max-sm:hidden ml-2">Logout</span>
      </Button>
    );
  }

  return (
    <Button asChild size="sm" className="h-9 font-medium">
      <Link to="/login">Login</Link>
    </Button>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { data } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const userRole = data?.data?.role;
  const isLoggedIn = !!data?.data?.email;

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <MobileMenu userRole={userRole} />
            <Link to="/" className="flex items-center text-foreground hover:opacity-80 transition-opacity duration-150">
              <Logo />
            </Link>
          </div>

          {/* Center Section */}
          <div className="flex-1 flex justify-center">
            <DesktopNavigation />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <DashboardButton userRole={userRole} />
            <ModeToggle />
            <AuthButton isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </header>
  );
}
