"use client";

import { useMemo, useState } from "react";
import { serviceCatalog } from "@/app/data/services";
import { automations } from "@/app/data/automations";
import { calculateQuote, type QuoteBreakdown } from "@/app/lib/pricing";

const companySizes = [
  { value: "startup", label: "Startup (0-20 employés)" },
  { value: "scaleup", label: "Scale-up (20-100 employés)" },
  { value: "enterprise", label: "Entreprise (100+ employés)" },
] as const;

type FormState = {
  companyName: string;
  companySize: (typeof companySizes)[number]["value"];
  monthlyAdSpend: number;
  selectedServiceIds: string[];
  selectedAddOns: Record<string, string[]>;
  automationTracks: string[];
  needBilingual: boolean;
  requiresEcommerce: boolean;
};

const initialState: FormState = {
  companyName: "",
  companySize: "scaleup",
  monthlyAdSpend: 15000,
  selectedServiceIds: ["social-ai", "funnel-ops"],
  selectedAddOns: {},
  automationTracks: [],
  needBilingual: true,
  requiresEcommerce: true,
};

export function QuoteEngine() {
  const [form, setForm] = useState<FormState>(initialState);
  const [quote, setQuote] = useState<QuoteBreakdown | null>(null);

  const estimatedQuote = useMemo(() => calculateQuote(form), [form]);

  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 text-white shadow-xl shadow-black/40">
      <header className="mb-6 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Calculateur de devis IA</p>
        <h2 className="text-3xl font-semibold">Positionnement prix compétitif</h2>
        <p className="text-sm text-zinc-300">
          Estimation instantanée des coûts en combinant nos offres, les options d&apos;automatisation et la pression concurrentielle pour
          rester sous la moyenne du marché québécois et nord-américain.
        </p>
      </header>

      <form
        className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
        onSubmit={(event) => {
          event.preventDefault();
          setQuote(estimatedQuote);
        }}
      >
        <div className="space-y-6">
          <div className="grid gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
            <label className="text-xs uppercase tracking-wide text-emerald-300">Informations client</label>
            <input
              type="text"
              value={form.companyName}
              onChange={(event) => setForm((prev) => ({ ...prev, companyName: event.target.value }))}
              placeholder="Nom de la société"
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="text-sm text-zinc-400">Taille de l&apos;organisation</label>
              <div className="flex flex-wrap gap-2">
                {companySizes.map((size) => (
                  <button
                    type="button"
                    key={size.value}
                    onClick={() => setForm((prev) => ({ ...prev, companySize: size.value }))}
                    className={`rounded-full px-3 py-1 text-xs transition ${
                      form.companySize === size.value
                        ? "bg-emerald-400 text-zinc-950"
                        : "border border-white/10 text-zinc-300 hover:border-emerald-400/60 hover:text-white"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400" htmlFor="ad-spend">
                Budget publicitaire mensuel
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="ad-spend"
                  type="range"
                  min={5000}
                  max={60000}
                  step={1000}
                  value={form.monthlyAdSpend}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, monthlyAdSpend: Number(event.target.value) }))
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-800"
                />
                <span className="w-24 text-right text-sm text-emerald-300">
                  {form.monthlyAdSpend.toLocaleString("fr-CA", {
                    style: "currency",
                    currency: "CAD",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
            <label className="text-xs uppercase tracking-wide text-emerald-300">Services IA à inclure</label>
            <div className="grid gap-3">
              {serviceCatalog.map((service) => {
                const isSelected = form.selectedServiceIds.includes(service.id);
                return (
                  <div
                    key={service.id}
                    className={`rounded-lg border p-4 transition ${
                      isSelected ? "border-emerald-400/60 bg-emerald-500/10" : "border-white/10 bg-black/30"
                    }`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{service.name}</p>
                        <p className="text-xs text-zinc-400">{service.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => {
                            const selected = new Set(prev.selectedServiceIds);
                            if (selected.has(service.id)) {
                              selected.delete(service.id);
                            } else {
                              selected.add(service.id);
                            }
                            return { ...prev, selectedServiceIds: Array.from(selected) };
                          })
                        }
                        className={`rounded-full px-3 py-1 text-xs ${
                          isSelected ? "bg-emerald-400 text-zinc-900" : "border border-white/20 text-zinc-200"
                        }`}
                      >
                        {isSelected ? "Inclu" : "Ajouter"}
                      </button>
                    </div>
                    {isSelected && service.addOns.length > 0 && (
                      <div className="mt-3 rounded-lg border border-dashed border-emerald-400/40 bg-black/40 p-3 text-xs text-zinc-200">
                        <p className="text-[11px] uppercase tracking-wide text-emerald-300">Add-ons automatisés</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {service.addOns.map((addon) => {
                            const active = form.selectedAddOns[service.id]?.includes(addon.name);
                            return (
                              <button
                                key={addon.name}
                                type="button"
                                onClick={() =>
                                  setForm((prev) => {
                                    const current = new Set(prev.selectedAddOns[service.id] ?? []);
                                    if (current.has(addon.name)) {
                                      current.delete(addon.name);
                                    } else {
                                      current.add(addon.name);
                                    }
                                    return {
                                      ...prev,
                                      selectedAddOns: {
                                        ...prev.selectedAddOns,
                                        [service.id]: Array.from(current),
                                      },
                                    };
                                  })
                                }
                                className={`rounded-full px-3 py-1 text-[11px] ${
                                  active
                                    ? "bg-emerald-400 text-zinc-900"
                                    : "border border-white/20 text-zinc-200"
                                }`}
                              >
                                {addon.name} ({addon.price.toLocaleString("fr-CA", {
                                  style: "currency",
                                  currency: "CAD",
                                  maximumFractionDigits: 0,
                                })})
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
            <label className="text-xs uppercase tracking-wide text-emerald-300">Automatisations</label>
            <div className="flex flex-col gap-3">
              {automations.map((track) => {
                const active = form.automationTracks.includes(track.id);
                return (
                  <div
                    key={track.id}
                    className={`rounded-lg border p-4 transition ${
                      active ? "border-emerald-400/60 bg-emerald-500/10" : "border-white/10 bg-black/30"
                    }`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{track.name}</p>
                        <p className="text-xs text-zinc-400">{track.value}</p>
                        <p className="mt-1 text-[11px] text-zinc-500">
                          Stack: {track.stack.join(" · ")} — KPIs: {track.kpis.join(" / ")}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => {
                            const selected = new Set(prev.automationTracks);
                            if (selected.has(track.id)) {
                              selected.delete(track.id);
                            } else {
                              selected.add(track.id);
                            }
                            return { ...prev, automationTracks: Array.from(selected) };
                          })
                        }
                        className={`rounded-full px-3 py-1 text-xs ${
                          active ? "bg-emerald-400 text-zinc-900" : "border border-white/20 text-zinc-200"
                        }`}
                      >
                        {active ? "Activé" : "Ajouter"}
                      </button>
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-3">
                      {track.timeline.map((phase) => (
                        <div key={phase.phase} className="rounded-lg bg-black/40 p-3 text-[11px] text-zinc-300">
                          <p className="font-semibold text-emerald-200">{phase.phase}</p>
                          <p className="mt-1 text-xs text-zinc-400">{phase.focus}</p>
                          <p className="mt-2 text-[10px] uppercase tracking-wide text-zinc-500">
                            {phase.durationWeeks} sem.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-300 sm:grid-cols-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.needBilingual}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, needBilingual: event.target.checked }))
                }
                className="h-4 w-4 rounded border border-white/20 bg-black/30 text-emerald-400 focus:ring-emerald-400"
              />
              Bilingue (FR/EN)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.requiresEcommerce}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, requiresEcommerce: event.target.checked }))
                }
                className="h-4 w-4 rounded border border-white/20 bg-black/30 text-emerald-400 focus:ring-emerald-400"
              />
              Intégration eCommerce
            </label>
            <button
              type="submit"
              className="col-span-2 rounded-lg bg-emerald-400 py-3 text-center text-sm font-semibold text-zinc-950 hover:bg-emerald-300 sm:col-span-1"
            >
              Générer le devis
            </button>
          </div>
        </div>

        <aside className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-6">
          <h3 className="text-xl font-semibold text-white">Projection tarifaire</h3>
          <p className="text-sm text-zinc-400">
            Cette projection maintient un prix moyen {quote ? "confirmé" : "estimé"}{" "}
            <span className="text-emerald-300">12-18% sous</span> le panier des agences IA concurrentes au Québec.
          </p>
          <div className="space-y-3 rounded-lg border border-white/10 bg-black/40 p-4 text-sm">
            <div className="flex items-center justify-between text-zinc-300">
              <span>Sous-total ajusté</span>
              <span className="font-medium text-white">
                {estimatedQuote.subtotal.toLocaleString("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span>Frais de performance</span>
              <span>
                {estimatedQuote.performanceFees.toLocaleString("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                })}
              </span>
            </div>
            {estimatedQuote.automationBundle > 0 && (
              <div className="flex items-center justify-between text-zinc-300">
                <span>Bundle automatisation</span>
                <span>
                  {estimatedQuote.automationBundle.toLocaleString("fr-CA", {
                    style: "currency",
                    currency: "CAD",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            )}
            {estimatedQuote.bilingualPremium > 0 && (
              <div className="flex items-center justify-between text-zinc-300">
                <span>Premium bilingue</span>
                <span>
                  {estimatedQuote.bilingualPremium.toLocaleString("fr-CA", {
                    style: "currency",
                    currency: "CAD",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            )}
            {estimatedQuote.ecommerceIntegration > 0 && (
              <div className="flex items-center justify-between text-zinc-300">
                <span>Module eCommerce</span>
                <span>
                  {estimatedQuote.ecommerceIntegration.toLocaleString("fr-CA", {
                    style: "currency",
                    currency: "CAD",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
              <span>Total annuel</span>
              <span>
                {estimatedQuote.total.toLocaleString("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-emerald-300">
              <span>Mensualité moyenne</span>
              <span>
                {estimatedQuote.monthly.toLocaleString("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                })}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 p-4 text-xs text-emerald-200">
            <p className="text-[11px] uppercase tracking-wide text-emerald-300">Synthèse compétitive</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>
                Retainer visé {Math.round(estimatedQuote.monthly).toLocaleString("fr-CA")} CAD vs moyenne Québec de 3 650 CAD (-14%).
              </li>
              <li>Bonus performance aligné sur les best-in-class (10-12%).</li>
              <li>
                Automatisation incluse sur-mesure pour réduire le coût humain et garantir une marge saine.
              </li>
            </ul>
          </div>

          {quote && (
            <div className="space-y-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              <p className="text-[11px] uppercase tracking-wide text-emerald-300">
                Devis enregistré pour {form.companyName || "client"}
              </p>
              <p>Total annuel confirmé: {quote.total.toLocaleString("fr-CA", { style: "currency", currency: "CAD" })}</p>
              <p>Mensualité: {quote.monthly.toLocaleString("fr-CA", { style: "currency", currency: "CAD" })}</p>
              <p className="text-xs text-emerald-200">
                Export automatique vers contrat électronique et facture initiale configuré via notre pipeline Zapier + Stripe.
              </p>
            </div>
          )}
        </aside>
      </form>
    </section>
  );
}

