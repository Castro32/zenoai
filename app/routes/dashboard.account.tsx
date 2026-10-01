import { notifySessionInvalidated } from "@agent-native/core/client/hooks";
import { appPath } from "@agent-native/core/client/api-path";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { ZenoDashboardShell } from "@/components/zeno-dashboard-shell";
import { APP_TITLE } from "@/lib/app-config";

export function meta() {
  return [
    { title: `Account | ${APP_TITLE}` },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function AccountRoute() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!window.confirm("Permanently delete your Zeno account?")) return;

    setError(null);
    setIsDeleting(true);

    try {
      const response = await fetch(appPath("/_agent-native/auth/ba/delete-user"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(password ? { password } : {}),
      });
      const result = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setError(
          result?.message ??
            "Account deletion could not be completed. Sign in again and retry.",
        );
        return;
      }

      notifySessionInvalidated();
      navigate("/", { replace: true });
    } catch {
      setError("Account deletion could not be completed. Try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <ZenoDashboardShell>
      <main className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
            Account settings
          </h1>
          <section className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-semibold">Password recovery</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use “Forgot password?” on the sign-in screen. A recovery email can
              be sent when Zeno’s email provider is configured.
            </p>
            <Link
              to="/sign-in"
              className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              Go to sign in
            </Link>
          </section>
          <section className="mt-5 rounded-2xl border border-destructive/30 bg-card p-6 sm:p-8">
            <h2 className="font-semibold">Delete account</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This permanently removes your login and active sessions. Password
              accounts must confirm their password; passwordless accounts must
              have a recent session. Some work attribution may be retained.
            </p>
            <form onSubmit={deleteAccount} className="mt-5 grid gap-3">
              <label className="grid gap-2 text-sm font-medium">
                Current password
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  className="min-h-11 rounded-xl border border-border bg-background px-3 font-normal"
                />
              </label>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={isDeleting}
                className="mt-2 min-h-11 justify-self-start rounded-full bg-destructive px-5 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
              >
                {isDeleting ? "Deleting account…" : "Delete my account"}
              </button>
            </form>
          </section>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    </ZenoDashboardShell>
  );
}
