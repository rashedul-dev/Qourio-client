import { useState } from "react";
import { Disclosure, DisclosureContent, DisclosureTrigger } from "./ui/disclosure";
import { Button } from "./ui/button";

const demoAccounts = [
  { role: "Admin", email: "admin@gmail.com", password: "ADMIN!123" },
  { role: "Sender", email: "sender@gmail.com", password: "!SENDER123" },
  { role: "Receiver", email: "receiver@gmail.com", password: "!RECEIVER123" },
];

export function LoginTry({ onQuickLogin }: { onQuickLogin: (email: string, password: string) => void }) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleQuickLogin = async (role: string, email: string, password: string) => {
    setLoading(role);
    try {
      await onQuickLogin(email, password);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Disclosure className="w-full rounded-md border border-zinc-200 dark:border-zinc-700">
      <DisclosureTrigger>
        <button
          className="w-full py-2 text-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          type="button"
        >
          Quick Demo Login
        </button>
      </DisclosureTrigger>

      <DisclosureContent>
        <div className="overflow-hidden pb-3 px-3">
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-3 text-center">
              Try the app instantly with demo accounts
            </p>

            <div className="space-y-2">
              {demoAccounts.map((account) => (
                <Button
                  key={account.role}
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleQuickLogin(account.role, account.email, account.password)}
                  disabled={loading !== null}
                >
                  {loading === account.role ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Logging in...
                    </span>
                  ) : (
                    `Login as ${account.role}`
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DisclosureContent>
    </Disclosure>
  );
}
