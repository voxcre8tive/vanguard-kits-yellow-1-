import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Paperclip, X } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Container, Section } from "@/components/site/Section";
import { VkButton } from "@/components/site/Button";
import { CheckboxRow, Field, SelectInput, TextArea, TextInput } from "@/components/site/FormControls";
import { submitQuoteRequest } from "@/lib/api/quotes";
import { productCategories, sports } from "@/lib/site-data";
import type { QuoteRequest, QuoteSubmissionResult } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Free Team Quote | Vanguard Kits" },
      {
        name: "description",
        content:
          "Request a free custom uniform quote for your team, school, club or league. Share your sport, roster, colors and requirements in a few short steps.",
      },
      { property: "og:title", content: "Get a Free Team Quote | Vanguard Kits" },
      {
        property: "og:description",
        content: "Tell us about your team and we'll price a custom uniform package.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/quote" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: QuotePage,
});

const STEPS = [
  "Your details",
  "Your team",
  "Products",
  "Customization",
  "Files",
  "Review",
];

const ROLE_LABELS: Record<string, string> = {
  coach: "Coach",
  athletic_director: "Athletic Director",
  team_manager: "Team Manager",
  parent: "Parent",
  organization: "Organization",
  other: "Other",
};

const emptyQuote: QuoteRequest = {
  contact: { fullName: "", email: "", phone: "", organization: "", role: "" },
  team: {
    sport: "",
    programType: "",
    teamName: "",
    location: "",
    athleteCount: "",
    requiredBy: "",
  },
  products: [],
  customization: {
    primaryColor: "",
    secondaryColor: "",
    needsNames: false,
    needsNumbers: false,
    needsLogo: false,
    designNotes: "",
  },
  attachments: [],
};

function QuotePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteRequest>(emptyQuote);
  const [files, setFiles] = useState<File[]>([]);

  const mutation = useMutation<QuoteSubmissionResult, Error, QuoteRequest>({
    mutationFn: async (payload) => {
      const result = await submitQuoteRequest(payload);
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  if (mutation.isSuccess) {
    return <Confirmation result={mutation.data} teamName={form.team.teamName} />;
  }

  const toggleProduct = (slug: string) => {
    setForm((f) => {
      const exists = f.products.some((p) => p.category === slug);
      return {
        ...f,
        products: exists
          ? f.products.filter((p) => p.category !== slug)
          : [...f.products, { category: slug, quantity: "" }],
      };
    });
  };

  const setQuantity = (slug: string, quantity: string) =>
    setForm((f) => ({
      ...f,
      products: f.products.map((p) => (p.category === slug ? { ...p, quantity } : p)),
    }));

  const canContinue = (() => {
    if (step === 0)
      return Boolean(form.contact.fullName && form.contact.email && form.contact.organization);
    if (step === 1) return Boolean(form.team.sport && form.team.teamName);
    if (step === 2) return form.products.length > 0;
    return true;
  })();

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files, ...Array.from(list)].slice(0, 8);
    setFiles(next);
    setForm((f) => ({
      ...f,
      attachments: next.map((file) => ({ name: file.name, size: file.size, type: file.type })),
    }));
  };

  const removeFile = (name: string) => {
    const next = files.filter((f) => f.name !== name);
    setFiles(next);
    setForm((f) => ({
      ...f,
      attachments: next.map((file) => ({ name: file.name, size: file.size, type: file.type })),
    }));
  };

  return (
    <>
      <PageHero
        eyebrow="Get a quote"
        title="Get a free team quote"
        copy="Six short steps. The more detail you share, the more accurate your pricing will be."
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <ol className="hidden h-fit border border-border bg-surface p-6 lg:block">
              {STEPS.map((label, i) => (
                <li key={label} className="flex items-center gap-3 py-2.5">
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center border font-display text-xs",
                      i < step && "border-primary bg-primary text-primary-foreground",
                      i === step && "border-primary text-primary",
                      i > step && "border-border text-muted-foreground",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      i === step ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ol>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step < STEPS.length - 1) {
                  setStep((s) => s + 1);
                } else {
                  mutation.mutate(form);
                }
              }}
              className="border border-border bg-surface p-6 sm:p-9"
            >
              <div className="mb-8 lg:hidden">
                <p className="eyebrow">
                  Step {step + 1} of {STEPS.length}
                </p>
                <div className="mt-3 h-1 w-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="text-3xl">{STEPS[step]}</h2>

              <div className="mt-8 space-y-5">
                {step === 0 ? (
                  <>
                    <Field label="Full name" htmlFor="q-name" required>
                      <TextInput
                        id="q-name"
                        value={form.contact.fullName}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            contact: { ...f.contact, fullName: e.target.value },
                          }))
                        }
                      />
                    </Field>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Email" htmlFor="q-email" required>
                        <TextInput
                          id="q-email"
                          type="email"
                          value={form.contact.email}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              contact: { ...f.contact, email: e.target.value },
                            }))
                          }
                        />
                      </Field>
                      <Field label="Phone" htmlFor="q-phone">
                        <TextInput
                          id="q-phone"
                          type="tel"
                          value={form.contact.phone}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              contact: { ...f.contact, phone: e.target.value },
                            }))
                          }
                        />
                      </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Organization / team name" htmlFor="q-org" required>
                        <TextInput
                          id="q-org"
                          value={form.contact.organization}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              contact: { ...f.contact, organization: e.target.value },
                            }))
                          }
                        />
                      </Field>
                      <Field label="Your role" htmlFor="q-role">
                        <SelectInput
                          id="q-role"
                          value={form.contact.role}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              contact: {
                                ...f.contact,
                                role: e.target.value as QuoteRequest["contact"]["role"],
                              },
                            }))
                          }
                        >
                          <option value="">Select a role</option>
                          <option value="coach">Coach</option>
                          <option value="athletic_director">Athletic Director</option>
                          <option value="team_manager">Team Manager</option>
                          <option value="parent">Parent</option>
                          <option value="organization">Organization</option>
                          <option value="other">Other</option>
                        </SelectInput>
                      </Field>
                    </div>
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Sport" htmlFor="q-sport" required>
                        <SelectInput
                          id="q-sport"
                          value={form.team.sport}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              team: {
                                ...f.team,
                                sport: e.target.value as QuoteRequest["team"]["sport"],
                              },
                            }))
                          }
                        >
                          <option value="">Select a sport</option>
                          {sports.map((s) => (
                            <option key={s.slug} value={s.slug}>
                              {s.name}
                            </option>
                          ))}
                          <option value="other">Other sport</option>
                        </SelectInput>
                      </Field>
                      <Field label="Program type" htmlFor="q-program">
                        <SelectInput
                          id="q-program"
                          value={form.team.programType}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              team: {
                                ...f.team,
                                programType: e.target
                                  .value as QuoteRequest["team"]["programType"],
                              },
                            }))
                          }
                        >
                          <option value="">Select a type</option>
                          <option value="school">School</option>
                          <option value="club">Club / travel team</option>
                          <option value="league">League</option>
                          <option value="organization">Organization / event</option>
                        </SelectInput>
                      </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Team / club / school name" htmlFor="q-team" required>
                        <TextInput
                          id="q-team"
                          value={form.team.teamName}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              team: { ...f.team, teamName: e.target.value },
                            }))
                          }
                        />
                      </Field>
                      <Field label="City, State" htmlFor="q-location">
                        <TextInput
                          id="q-location"
                          placeholder="e.g. Riverton, UT"
                          value={form.team.location}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              team: { ...f.team, location: e.target.value },
                            }))
                          }
                        />
                      </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Number of athletes" htmlFor="q-athletes">
                        <TextInput
                          id="q-athletes"
                          type="number"
                          min={1}
                          value={form.team.athleteCount}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              team: { ...f.team, athleteCount: e.target.value },
                            }))
                          }
                        />
                      </Field>
                      <Field label="Required by" htmlFor="q-date">
                        <TextInput
                          id="q-date"
                          type="date"
                          value={form.team.requiredBy}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              team: { ...f.team, requiredBy: e.target.value },
                            }))
                          }
                        />
                      </Field>
                    </div>
                  </>
                ) : null}

                {step === 2 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Select everything your program needs and add quantities.
                    </p>
                    {productCategories.map((cat) => {
                      const selected = form.products.find((p) => p.category === cat.slug);
                      return (
                        <div key={cat.slug} className="flex flex-col gap-3 sm:flex-row">
                          <div className="flex-1">
                            <CheckboxRow
                              id={`prod-${cat.slug}`}
                              label={cat.name}
                              checked={Boolean(selected)}
                              onChange={() => toggleProduct(cat.slug)}
                            />
                          </div>
                          <TextInput
                            aria-label={`${cat.name} quantity`}
                            placeholder="Qty"
                            type="number"
                            min={1}
                            disabled={!selected}
                            value={selected?.quantity ?? ""}
                            onChange={(e) => setQuantity(cat.slug, e.target.value)}
                            className="sm:w-28"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {step === 3 ? (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Primary color" htmlFor="q-color1">
                        <TextInput
                          id="q-color1"
                          placeholder="e.g. Charcoal"
                          value={form.customization.primaryColor}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              customization: { ...f.customization, primaryColor: e.target.value },
                            }))
                          }
                        />
                      </Field>
                      <Field label="Secondary color" htmlFor="q-color2">
                        <TextInput
                          id="q-color2"
                          placeholder="e.g. Red"
                          value={form.customization.secondaryColor}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              customization: {
                                ...f.customization,
                                secondaryColor: e.target.value,
                              },
                            }))
                          }
                        />
                      </Field>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <CheckboxRow
                        id="q-names"
                        label="Player names"
                        checked={form.customization.needsNames}
                        onChange={(v) =>
                          setForm((f) => ({
                            ...f,
                            customization: { ...f.customization, needsNames: v },
                          }))
                        }
                      />
                      <CheckboxRow
                        id="q-numbers"
                        label="Numbers"
                        checked={form.customization.needsNumbers}
                        onChange={(v) =>
                          setForm((f) => ({
                            ...f,
                            customization: { ...f.customization, needsNumbers: v },
                          }))
                        }
                      />
                      <CheckboxRow
                        id="q-logo"
                        label="Team logo"
                        checked={form.customization.needsLogo}
                        onChange={(v) =>
                          setForm((f) => ({
                            ...f,
                            customization: { ...f.customization, needsLogo: v },
                          }))
                        }
                      />
                    </div>
                    <Field label="Design requirements" htmlFor="q-notes">
                      <TextArea
                        id="q-notes"
                        rows={5}
                        placeholder="Anything we should know about your look, existing kit or deadlines."
                        value={form.customization.designNotes}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            customization: { ...f.customization, designNotes: e.target.value },
                          }))
                        }
                      />
                    </Field>
                  </>
                ) : null}

                {step === 4 ? (
                  <>
                    <label
                      htmlFor="q-files"
                      className="flex cursor-pointer flex-col items-center border border-dashed border-input px-6 py-12 text-center transition-colors hover:border-primary"
                    >
                      <Paperclip className="h-6 w-6 text-primary" />
                      <span className="mt-4 font-display text-xl uppercase">Upload files</span>
                      <span className="mt-2 text-sm text-muted-foreground">
                        Team logo, existing artwork or reference images (up to 8 files)
                      </span>
                      <input
                        id="q-files"
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={(e) => addFiles(e.target.files)}
                      />
                    </label>
                    {files.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No files attached yet — this step is optional.
                      </p>
                    ) : (
                      <ul className="divide-y divide-border border border-border">
                        {files.map((file) => (
                          <li key={file.name} className="flex items-center gap-3 px-4 py-3">
                            <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="min-w-0 flex-1 truncate text-sm">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {Math.max(1, Math.round(file.size / 1024))} KB
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(file.name)}
                              aria-label={`Remove ${file.name}`}
                              className="text-muted-foreground transition-colors hover:text-primary"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : null}

                {step === 5 ? (
                  <div className="divide-y divide-border border border-border">
                    <ReviewRow label="Name" value={form.contact.fullName} />
                    <ReviewRow label="Email" value={form.contact.email} />
                    <ReviewRow label="Phone" value={form.contact.phone} />
                    <ReviewRow label="Organization" value={form.contact.organization} />
                    <ReviewRow label="Your role" value={ROLE_LABELS[form.contact.role] ?? ""} />
                    <ReviewRow
                      label="Sport"
                      value={sports.find((s) => s.slug === form.team.sport)?.name ?? form.team.sport}
                    />
                    <ReviewRow label="Team" value={form.team.teamName} />
                    <ReviewRow label="Location" value={form.team.location} />
                    <ReviewRow label="Athletes" value={form.team.athleteCount} />
                    <ReviewRow label="Required by" value={form.team.requiredBy} />
                    <ReviewRow
                      label="Products"
                      value={form.products
                        .map((p) => {
                          const name =
                            productCategories.find((c) => c.slug === p.category)?.name ??
                            p.category;
                          return p.quantity ? `${name} (${p.quantity})` : name;
                        })
                        .join(", ")}
                    />
                    <ReviewRow
                      label="Colors"
                      value={[form.customization.primaryColor, form.customization.secondaryColor]
                        .filter(Boolean)
                        .join(" / ")}
                    />
                    <ReviewRow
                      label="Decoration"
                      value={[
                        form.customization.needsNames && "Names",
                        form.customization.needsNumbers && "Numbers",
                        form.customization.needsLogo && "Logo",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    />
                    <ReviewRow label="Notes" value={form.customization.designNotes} />
                    <ReviewRow
                      label="Files"
                      value={form.attachments.map((a) => a.name).join(", ")}
                    />
                  </div>
                ) : null}

                {mutation.isError ? (
                  <p className="flex items-start gap-2 border border-primary/40 bg-primary/10 p-4 text-sm">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {mutation.error.message} Please try again.
                  </p>
                ) : null}
              </div>

              <div className="mt-9 flex items-center justify-between gap-4 border-t border-border pt-6">
                <VkButton
                  type="button"
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0 || mutation.isPending}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </VkButton>
                <VkButton type="submit" size="lg" disabled={!canContinue || mutation.isPending}>
                  {mutation.isPending
                    ? "Submitting…"
                    : step === STEPS.length - 1
                      ? "Submit Request"
                      : "Continue"}
                  {!mutation.isPending ? <ArrowRight className="h-4 w-4" /> : null}
                </VkButton>
              </div>
            </form>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:gap-6">
      <span className="w-40 shrink-0 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm">{value || <span className="text-muted-foreground">—</span>}</span>
    </div>
  );
}

function Confirmation({
  result,
  teamName,
}: {
  result: QuoteSubmissionResult;
  teamName: string;
}) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl border border-border bg-surface p-8 text-center sm:p-12">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-6 text-4xl">Quote request received</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Thanks{teamName ? ` — we have the details for ${teamName}` : ""}. A team specialist
            will review your requirements and follow up within {result.estimatedResponse}.
          </p>
          <div className="mt-8 border border-primary/40 bg-primary/10 p-6">
            <p className="eyebrow">Your reference number</p>
            <p className="mt-2 font-display text-3xl tracking-[0.08em]">
              {result.referenceNumber}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Submitted {new Date(result.submittedAt).toLocaleString("en-US")}
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <VkButton asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </VkButton>
            <VkButton asChild>
              <Link to="/uniforms">Explore Uniforms</Link>
            </VkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
