import { Link } from "react-router";

import { ZenoDashboardShell } from "@/components/zeno-dashboard-shell";
import { APP_TITLE } from "@/lib/app-config";

export function meta() {
  return [
    { title: `Premium | ${APP_TITLE}` },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

const premiumBenefits = [
  "Premium marketplace access",
  "Advanced task filters",
  "Training resources",
  "Detailed performance analytics",
];

export default function PremiumPaymentRoute() {
  return (
    <ZenoDashboardShell>
      <main className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_21rem] lg:gap-16">
          <section className="max-w-2xl">
            <Link
              to="/dashboard"
              className="mb-7 inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Dashboard
            </Link>
            <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Zeno Premium
            </h1>
            <div className="mt-8 flex items-end gap-3">
              <span className="text-5xl font-semibold tracking-[-0.07em]">
                KSh 700
              </span>
              <span className="pb-1.5 text-sm text-muted-foreground">
                one-time fee
              </span>
            </div>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {premiumBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 py-4 text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-primary"
                  >
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              Premium does not guarantee task availability, work, or earnings.
            </p>
          </section>

          <aside className="h-fit rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-semibold">Pay with M-Pesa</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Secure checkout is not connected yet. No payment will be initiated
              from this page.
            </p>
            <button
              type="button"
              disabled
              className="mt-6 min-h-12 w-full cursor-not-allowed rounded-full bg-secondary px-5 text-sm font-semibold text-muted-foreground"
            >
              M-Pesa checkout unavailable
            </button>
            <p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
              Never enter or share your M-Pesa PIN on Zeno. Premium activates
              only after payment is confirmed by the provider.
            </p>
          </aside>
        </div>
      </main>
    </ZenoDashboardShell>
  );
}
