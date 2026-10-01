import { useActionMutation, useActionQuery, useSession } from "@agent-native/core/client/hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { ZenoDashboardShell } from "@/components/zeno-dashboard-shell";
import { APP_TITLE } from "@/lib/app-config";

export function meta() {
  return [
    { title: `Task packages | ${APP_TITLE}` },
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

const packageCatalog = [
  {
    id: "starter",
    name: "Starter Access",
    price: 700,
    label: "One-time access",
    description: "Best for new freelancers trying their first AI task flows.",
    benefits: [
      "Unlock the marketplace for eligible tasks",
      "Access project categories matching your current skill set",
      "Opportunity to build a verified task history in Kenya",
    ],
  },
  {
    id: "standard",
    name: "Standard Access",
    price: 1800,
    label: "More flexibility",
    description: "A stronger entry point if you plan to take on higher-volume work.",
    benefits: [
      "Wider access to higher-frequency task listings",
      "Designed for multi-task reliability and faster output",
      "Better fit for active freelancers with multiple strengths",
    ],
  },
  {
    id: "premium",
    name: "Premium Access",
    price: 3500,
    label: "Priority access",
    description: "For dedicated workers who want a more complete task pipeline.",
    benefits: [
      "Priority visibility on stronger task opportunities",
      "Supports more focused work across multiple AI categories",
      "Ideal for professionals building repeat task volume",
    ],
  },
] as const;

type PackageId = (typeof packageCatalog)[number]["id"];

export default function TaskPackagesRoute() {
  const { session } = useSession();
  const profileQuery = useActionQuery("get-user-profile", {});
  const saveProfile = useActionMutation("save-user-profile");

  const profile = (profileQuery.data ?? null) as UserProfile | null;
  const selectedPackageId = (profile?.packageId as PackageId | undefined) ?? "starter";

  const [form, setForm] = useState({
    fullName: profile?.fullName ?? session?.name ?? "",
    phone: profile?.phone ?? "",
    city: profile?.city ?? "",
    skills: Array.isArray(profile?.skills) ? profile.skills.join(", ") : "",
  });

  useEffect(() => {
    setForm({
      fullName: profile?.fullName ?? session?.name ?? "",
      phone: profile?.phone ?? "",
      city: profile?.city ?? "",
      skills: Array.isArray(profile?.skills) ? profile.skills.join(", ") : "",
    });
  }, [profile, session]);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleProfileSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session?.email) {
      return;
    }

    const nextSkills = form.skills
      .split(",")
      .map((skill: string) => skill.trim())
      .filter((skill: string) => Boolean(skill))
      .slice(0, 10);

    saveProfile.mutate({
      fullName: form.fullName,
      phone: form.phone,
      city: form.city,
      skills: nextSkills,
      packageId: selectedPackageId,
      packageName:
        packageCatalog.find((pkg) => pkg.id === selectedPackageId)?.name ??
        "Starter Access",
      packagePrice:
        packageCatalog.find((pkg) => pkg.id === selectedPackageId)?.price ?? 700,
      paymentStatus: "pending",
      notes: "Package selection saved.",
    });
  };

  const selectedPackage =
    packageCatalog.find((pkg) => pkg.id === selectedPackageId) ?? packageCatalog[0];

  const handlePackageSelect = (pkgId: PackageId) => {
    if (!session?.email) {
      return;
    }

    const target = packageCatalog.find((pkg) => pkg.id === pkgId);
    if (!target) {
      return;
    }

    const nextSkills = form.skills
      .split(",")
      .map((skill: string) => skill.trim())
      .filter((skill: string) => Boolean(skill))
      .slice(0, 10);

    saveProfile.mutate({
      fullName: form.fullName || session.name || "",
      phone: form.phone,
      city: form.city,
      skills: nextSkills,
      packageId: target.id,
      packageName: target.name,
      packagePrice: target.price,
      paymentStatus: "pending",
      notes: `Selected ${target.name}.`,
    });
  };

  return (
    <ZenoDashboardShell>
      <main className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <Link
              to="/dashboard"
              className="mb-4 inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Dashboard
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Select your access
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Choose a task package
            </h1>
          </div>
          <div className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
            {profile?.paymentStatus === "pending"
              ? "Payment status: pending"
              : "Ready to activate"}
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-5">
            {packageCatalog.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;

              return (
                <article
                  key={pkg.id}
                  className={`rounded-[1.75rem] border p-5 shadow-sm transition-all sm:p-6 ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/10"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-lg">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary-foreground">
                          {pkg.label}
                        </span>
                        {isSelected && (
                          <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
                            Selected
                          </span>
                        )}
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                        {pkg.name}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {pkg.description}
                      </p>
                    </div>
                    <div className="text-left lg:text-right">
                      <p className="text-3xl font-semibold tracking-[-0.06em]">
                        KSh {pkg.price.toLocaleString("en-KE")}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        one-time package
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                    {pkg.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 rounded-2xl bg-background/80 p-3">
                        <span aria-hidden="true" className="mt-0.5 text-primary">
                          ✓
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                    <p className="text-xs text-muted-foreground">
                      Access activates after provider confirmation.
                    </p>
                    <button
                      type="button"
                      onClick={() => handlePackageSelect(pkg.id)}
                      className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-opacity ${
                        isSelected
                          ? "bg-secondary text-foreground"
                          : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {isSelected ? "Selected" : "Choose package"}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="space-y-5">
            <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary">
                  {selectedPackage.name.charAt(0)}
                </span>
                <div>
                  <h2 className="font-semibold">Current selection</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {selectedPackage.name}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-background p-4">
                <p className="text-sm font-medium">Package status</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  KSh {selectedPackage.price.toLocaleString("en-KE")}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Task access for your profile is saved and ready to unlock the
                  marketplace once it is confirmed.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleProfileSave}
              className="rounded-[1.75rem] border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <h2 className="font-semibold">Freelancer details</h2>
              <div className="mt-5 grid gap-4">
                <label className="grid gap-2 text-sm font-medium">
                  Full name
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleFieldChange}
                    className="min-h-11 rounded-xl border border-border bg-background px-3 font-normal"
                    placeholder="Your full name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Phone number
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleFieldChange}
                    className="min-h-11 rounded-xl border border-border bg-background px-3 font-normal"
                    placeholder="+254 ..."
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  City / region
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleFieldChange}
                    className="min-h-11 rounded-xl border border-border bg-background px-3 font-normal"
                    placeholder="Nairobi, Mombasa, Kisumu..."
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Skills
                  <input
                    name="skills"
                    value={form.skills}
                    onChange={handleFieldChange}
                    className="min-h-11 rounded-xl border border-border bg-background px-3 font-normal"
                    placeholder="Prompt evaluation, data labeling, research"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={saveProfile.isPending}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
              >
                {saveProfile.isPending ? "Saving..." : "Save my profile"}
              </button>
            </form>
          </aside>
        </div>
      </main>
    </ZenoDashboardShell>
  );
}
