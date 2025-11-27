"use client";

import { useMemo, useState } from "react";
import { competitors, demandMetrics, type Competitor } from "@/app/data/competitors";

function averageRetainerByRegion(region: Competitor["region"]) {
  const regionCompetitors = competitors.filter((c) => c.region === region);
  const retainers = regionCompetitors.flatMap((c) => c.serviceTiers.map((tier) => tier.monthlyRetainer));
  const avg = retainers.reduce((acc, value) => acc + value, 0) / (retainers.length || 1);
  return Math.round(avg);
}

export function CompetitorOverview() {
  const [regionFilter, setRegionFilter] = useState<Competitor["region"] | "All">("Quebec");

  const filteredCompetitors = useMemo(() => {
    if (regionFilter === "All") {
      return competitors;
    }
    return competitors.filter((competitor) => competitor.region === regionFilter);
  }, [regionFilter]);

  const averageRetainer = useMemo(() => {
    if (regionFilter === "All") {
      const retainers = competitors.flatMap((competitor) => competitor.serviceTiers.map((tier) => tier.monthlyRetainer));
      return Math.round(retainers.reduce((acc, value) => acc + value, 0) / (retainers.length || 1));
    }
    return averageRetainerByRegion(regionFilter);
  }, [regionFilter]);

  const socialFocusRate = useMemo(() => {
    const relevant = filteredCompetitors.length || 1;
    return Math.round(
      (filteredCompetitors.filter((competitor) => competitor.adSpendFocus === "Social").length / relevant) * 100
    );
  }, [filteredCompetitors]);

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900/60 p-8 text-white shadow-xl shadow-black/20">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-emerald-400">Veille concurrentielle</p>
          <h2 className="text-2xl font-semibold">Panorama IA Marketing Digital</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Focus sur l'Amérique du Nord avec accent Québec. Benchmark des offres IA pour nourrir notre positionnement prix et valeur.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 p-1">
          {(["Quebec", "Canada", "USA", "All"] as const).map((region) => (
            <button
              key={region}
              onClick={() => setRegionFilter(region)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                regionFilter === region ? "bg-emerald-400 text-zinc-950" : "text-emerald-200 hover:bg-emerald-400/20"
              }`}
            >
              {region === "All" ? "Amérique du Nord" : region}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
          <p className="text-sm text-zinc-400">Retainer mensuel moyen</p>
          <p className="mt-2 text-3xl font-semibold text-white">${averageRetainer.toLocaleString("fr-CA")}</p>
          <p className="mt-2 text-xs text-zinc-500">Basé sur {filteredCompetitors.length} acteurs clé</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
          <p className="text-sm text-zinc-400">Priorité Paid Social</p>
          <p className="mt-2 text-3xl font-semibold text-white">{socialFocusRate}%</p>
          <p className="mt-2 text-xs text-zinc-500">% d'agences orientées social-first</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
          <p className="text-sm text-zinc-400">Top services demandés</p>
          <div className="mt-2 space-y-1 text-xs text-emerald-200">
            {demandMetrics.slice(0, 3).map((metric) => (
              <div key={metric.service} className="flex items-center justify-between">
                <span>{metric.service}</span>
                <span className="text-zinc-400">{Math.round(metric.demandIndex)} / 100</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filteredCompetitors.map((competitor) => (
          <article
            key={competitor.name}
            className="group rounded-xl border border-white/10 bg-zinc-950/40 p-5 transition hover:border-emerald-400/60"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{competitor.name}</h3>
              <span className="rounded-full border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200">
                {competitor.region}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-400">Spécialités</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-zinc-300">
              {competitor.specialties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-zinc-400">Positionnement tarification</p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-zinc-200">
              {competitor.serviceTiers.map((tier) => (
                <div key={tier.tier} className="rounded-lg bg-zinc-900/80 p-2 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-zinc-500">{tier.tier}</p>
                  <p className="mt-1 font-semibold">
                    {tier.monthlyRetainer.toLocaleString("fr-CA", {
                      style: "currency",
                      currency: "CAD",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-[10px] text-zinc-500">Perf {tier.performanceFeePct}%</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-zinc-400">Différenciateurs</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {competitor.differentiators.map((point) => (
                <span
                  key={point}
                  className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-200"
                >
                  {point}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-zinc-500">Stack IA</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {competitor.aiStack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-white/5 bg-white/5 px-2 py-1 text-[11px] text-zinc-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
