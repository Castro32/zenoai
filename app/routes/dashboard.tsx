import { signOut } from "@agent-native/core/client";
import {
  actionErrorMessage,
  useActionQuery,
} from "@agent-native/core/client/hooks";
import { Link } from "react-router";

import { APP_TITLE } from "@/lib/app-config";

export function meta() {
  return [
    { title: `Tasks | ${APP_TITLE}` },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

function TaskSkeleton() {
  return (
    <div className="grid gap-3" aria-label="Loading tasks">
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
  const tasksQuery = useActionQuery("list-marketplace-tasks", {});
  const tasks = tasksQuery.data ?? [];

  return (
    <div className="min-h-full bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="zeno-wordmark" aria-label="Zeno home">
            zeno<span>.</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/#how-it-works"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              How it works
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Zeno marketplace
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Find your next task
            </h1>
          </div>
          <span className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
            Kenya · KSh
          </span>
        </div>

        {tasksQuery.isLoading ? (
          <TaskSkeleton />
        ) : tasksQuery.isError ? (
          <section className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
            <h2 className="text-lg font-semibold">Tasks could not load</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              {actionErrorMessage(tasksQuery.error) ??
                "Check your connection and try again."}
            </p>
            <button
              type="button"
              onClick={() => void tasksQuery.refetch()}
              className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Try again
            </button>
          </section>
        ) : tasks.length === 0 ? (
          <section className="zeno-empty-state rounded-2xl border border-border bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-secondary text-lg font-semibold text-primary">
              Z
            </div>
            <h2 className="text-xl font-semibold tracking-[-0.03em]">
              No live tasks right now
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              New opportunities appear here when they are published. Demo tasks
              are never shown as paid work.
            </p>
            <Link
              to="/#how-it-works"
              className="mt-6 inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              How Zeno works
            </Link>
          </section>
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
                  <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em]">
                    {task.title}
                  </h2>
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
      </main>
    </div>
  );
}
