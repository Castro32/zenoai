import { signOut } from "@agent-native/core/client";
import { useSession } from "@agent-native/core/client/hooks";
import { Link, useLocation } from "react-router";

const links = [
  { to: "/dashboard", label: "Overview", exact: true },
  { to: "/dashboard/earnings", label: "Earnings", exact: false },
  { to: "/dashboard/payments", label: "Packages", exact: false },
  { to: "/dashboard/account", label: "Account", exact: false },
] as const;

export function ZenoDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();
  const { session, status } = useSession();

  return (
    <div className="min-h-full bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="zeno-wordmark" aria-label="Zeno home">
            zeno<span>.</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-48 truncate text-sm text-muted-foreground sm:inline" title={session?.email}>
              {status === "authenticated" && session
                ? session.name || session.email
                : "Account"}
            </span>
            <span className="hidden text-sm text-muted-foreground lg:inline">
              Kenya · KSh
            </span>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav
          aria-label="Dashboard"
          className="mx-auto hidden max-w-7xl gap-1 px-8 pb-2 md:flex"
        >
          {links.map((link) => {
            const active = link.exact
              ? pathname === link.to
              : pathname === link.to || pathname.startsWith(`${link.to}/`);

            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div>{children}</div>

      <nav
        aria-label="Mobile dashboard"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-border bg-card/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-sm md:hidden"
      >
        {links.map((link) => {
          const active = link.exact
            ? pathname === link.to
            : pathname === link.to || pathname.startsWith(`${link.to}/`);

          return (
            <Link
              key={link.to}
              to={link.to}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center justify-center rounded-xl px-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
