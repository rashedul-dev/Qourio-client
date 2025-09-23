import { useState } from "react";
import { Disclosure, DisclosureContent, DisclosureTrigger } from "./ui/disclosure";

const credentials = [
  { email: "sender@gmail.com", password: "!SENDER123" },
  { email: "receiver@gmail.com", password: "!RECEIVER123" },
  { email: "admin@gmail.com", password: "ADMIN!123" },
];

export function LoginTry() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // prevent parent click events
    e.preventDefault(); // prevent default behavior just in case
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Disclosure className="w-[330px] rounded-md border border-zinc-200 px-3 dark:border-zinc-700">
      <DisclosureTrigger>
        <button className="w-full py-2 text-left text-sm font-light hover:scale-none font-stretch-1%" type="button">
          Just want to try?
        </button>
      </DisclosureTrigger>

      <DisclosureContent>
        <div className="overflow-hidden pb-3">
          <div className="pt-1 font-mono text-sm">
            <p>
              Use these demo <span className="font-bold">email</span> and <span className="font-bold">password</span>{" "}
              pairs to log in as sender, receiver, or admin for testing.
            </p>

            <div className="mt-2 space-y-3">
              {credentials.map((cred, i) => (
                <div key={i} className="rounded-md bg-zinc-100 p-2 text-xs dark:bg-zinc-950">
                  {/* Email row */}
                  <div className="flex items-center justify-between">
                    <code>{cred.email}</code>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(cred.email, e)}
                      className="ml-2 rounded bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                    >
                      {copied === cred.email ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Password row */}
                  <div className="mt-1 flex items-center justify-between">
                    <code>{cred.password}</code>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(cred.password, e)}
                      className="ml-2 rounded bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                    >
                      {copied === cred.password ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DisclosureContent>
    </Disclosure>
  );
}
