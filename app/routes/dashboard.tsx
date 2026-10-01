import {
  actionErrorMessage,
  useActionQuery,
  useSession,
} from "@agent-native/core/client/hooks";
import { Link, Outlet, useLocation } from "react-router";

import { ZenoDashboardShell } from "@/components/zeno-dashboard-shell";
import { APP_TITLE } from "@/lib/app-config";

export function meta() {
  return [
    { title: `Dashboard | ${APP_TITLE}` },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

type UserProfile = {
  id?: string;
  email?: string;
  fullName?: string;
  phone?: string;
  city?: string;
  skills?: string[];
  packageId?: string;
  packageName?: string;
  packagePrice?: number;
  paymentStatus?: string;
};

const practiceTasks = [
  {
    category: "Response evaluation",
    title: "Compare two AI explanations",
    description: "Review clarity, relevance, and factual support.",
  },
  {
    category: "Data labeling",
    title: "Classify short support messages",
    description: "Assign a topic label to each example message.",
  },
  {
    category: "Search relevance",
    title: "Review results for a sample query",
    description: "Decide whether each result matches the search intent.",
  },
];

function TaskSkeleton() {
  return (
    <div className="grid gap-3" aria-label="Loading available tasks">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="h-24 animate-pulse rounded-xl border border-border bg-card"
        />
      ))}
    </div>
  );
}

export default function DashboardRoute() {
  const location = useLocation();
  return location.pathname === "/dashboard" ? (
    <DashboardOverview />
  ) : (
    <Outlet />
  );
}

function DashboardOverview() {
  const { session } = useSession();
  const tasksQuery = useActionQuery("list-marketplace-tasks", {});
  const profileQuery = useActionQuery("get-user-profile", {});
  const tasks = tasksQuery.data ?? [];
  const profile = (profileQuery.data ?? null) as UserProfile | null;
  const hasPackage = Boolean(profile?.packageId);

  return (
    <ZenoDashboardShell>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Welcome back
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Your dashboard
            </h1>
          </div>
          <Link
            to="/dashboard/earnings"
            className="text-sm font-semibold text-primary transition-colors hover:underline"
          >
            View earnings
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,0.75fr)] lg:gap-8">
          <section id="opportunities" className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-[-0.025em]">
                Available tasks
              </h2>
              <span className="text-sm text-muted-foreground">Kenya · KSh</span>
            </div>

            {!hasPackage ? (
              <div className="rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Package required
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                  Select a task package to unlock work
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  Your task access is activated after you choose a package and
                  confirm the status. Once selected, your profile is saved and the
                  marketplace opens for your account.
                </p>
                <Link
                  to="/dashboard/payments"
                  className="mt-5 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Choose my package
                </Link>
              </div>
            ) : tasksQuery.isLoading ? (
              <TaskSkeleton />
            ) : tasksQuery.isError ? (
              <div className="rounded-2xl border border-border bg-card px-6 py-9">
                <h3 className="font-semibold">Tasks could not load</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {actionErrorMessage(tasksQuery.error) ??
                    "Check your connection and try again."}
                </p>
                <button
                  type="button"
                  onClick={() => void tasksQuery.refetch()}
                  className="mt-5 min-h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Try again
                </button>
              </div>
            ) : tasks.length === 0 ? (
              <div className="zeno-empty-state rounded-2xl border border-border bg-card px-6 py-10 sm:px-8 sm:py-12">
                <h3 className="text-lg font-semibold tracking-[-0.03em]">
                  No live tasks right now
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                  New opportunities appear here when they are published. Demo
                  tasks are never shown as paid work.
                </p>
                <Link
                  to="/#how-it-works"
                  className="mt-5 inline-flex min-h-10 items-center rounded-full border border-border px-4 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  How Zeno works
                </Link>
              </div>
            ) : (
              <ul className="grid gap-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="grid gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                        {task.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em]">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                          {task.description}
                        </p>
                      )}
                      <p className="mt-3 text-xs text-muted-foreground">
                        {task.difficulty} · {task.estimatedMinutes} min
                        {task.premiumRequired ? " · Premium" : ""}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-lg font-semibold">
                        KSh {task.reward.toLocaleString("en-KE")}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Paid after approval
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {task.remainingSlots}{" "}
                        {task.remainingSlots === 1 ? "slot" : "slots"} available
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-9 border-t border-border pt-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold">Practice task examples</h3>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  Unpaid · not open for submission
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                These examples explain common task formats. They are not live
                opportunities and do not earn rewards.
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {practiceTasks.map((task) => (
                  <li
                    key={task.title}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                      {task.category}
                    </p>
                    <h4 className="mt-2 font-semibold">{task.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {task.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">Earnings</h2>
                  <p className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-muted-foreground">
                    —
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  Not connected
                </span>
              </div>
              <Link
                to="/dashboard/earnings"
                className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                Open wallet
              </Link>
            </section>

            <section className="rounded-2xl border border-border bg-primary p-5 text-primary-foreground sm:p-6">
              <h2 className="font-semibold">Task access package</h2>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.045em]">
                {profile?.packageName ? profile.packageName : "Not selected"}
              </p>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/75">
                {profile?.packagePrice
                  ? `KSh ${Number(profile.packagePrice).toLocaleString("en-KE")}`
                  : "Task access activates only after payment confirmation."}
              </p>
              <Link
                to="/dashboard/payments"
                className="mt-5 inline-flex min-h-10 items-center rounded-full bg-primary-foreground px-4 text-sm font-semibold text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
              >
                {profile?.packageId ? "Manage package" : "View packages"}
              </Link>
            </section>
          </aside>
        </div>
      </main>
    </ZenoDashboardShell>
  );
}
