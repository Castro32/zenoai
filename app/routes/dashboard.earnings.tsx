import { Link } from "react-router";

import { ZenoDashboardShell } from "@/components/zeno-dashboard-shell";
import { APP_TITLE } from "@/lib/app-config";

export function meta() {
  return [
    { title: `Earnings | ${APP_TITLE}` },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function EarningsRoute() {
  return (
    <ZenoDashboardShell>
      <main className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
            Earnings
          </h1>
          <section className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="text-sm font-medium text-muted-foreground">
              Available balance
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-muted-foreground">
              —
            </p>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              Your wallet will show a balance once approved task rewards and
              confirmed payouts are connected.
            </p>
          </section>
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="font-semibold">Withdraw to M-Pesa</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Withdrawals are not available yet.
              </p>
            </div>
            <button
              type="button"
              disabled
              className="min-h-11 cursor-not-allowed rounded-full bg-secondary px-5 text-sm font-semibold text-muted-foreground"
            >
              Withdraw unavailable
            </button>
          </div>
          <p className="mt-8 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">
            The KSh 300 introductory reward is credited only after eligible work
            is approved. Sign-up alone does not earn a reward.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            Back to overview
          </Link>
        </div>
      </main>
    </ZenoDashboardShell>
  );
}
