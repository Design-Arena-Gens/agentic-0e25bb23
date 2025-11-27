import { automations } from "@/app/data/automations";

export function AutomationSuite() {
  return (
    <section className="rounded-2xl border border-white/5 bg-white/95 p-8 shadow-2xl shadow-zinc-900/20 dark:bg-zinc-950/85">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-500">
          Orchestration 100% automatisée
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-white">
          Pipelines d&apos;exécution sans friction
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Chaque offre est livrée avec un runbook d&apos;automatisations couvrant capture des leads, production créative,
          signatures électroniques et paiements avec une traçabilité complète.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-3">
        {automations.map((automation) => (
          <article
            key={automation.id}
            className="flex flex-col rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-sm text-zinc-700 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-50"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{automation.name}</h3>
              <span className="rounded-full border border-emerald-500/40 px-3 py-1 text-[11px] uppercase tracking-wide text-emerald-600 dark:text-emerald-200">
                Automatisé
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-emerald-50">{automation.value}</p>
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-emerald-600 dark:text-emerald-300">Stack IA & Ops</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {automation.stack.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-white/80 px-2 py-1 text-[11px] text-emerald-700 shadow-sm dark:bg-black/40 dark:text-emerald-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-emerald-600 dark:text-emerald-300">KPIs ciblés</p>
                <ul className="mt-1 list-disc space-y-1 pl-4">
                  {automation.kpis.map((kpi) => (
                    <li key={kpi}>{kpi}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                  Cadencement
                </p>
                <ul className="mt-2 space-y-2">
                  {automation.timeline.map((step) => (
                    <li key={step.phase} className="rounded-xl border border-white/30 bg-white/60 p-3 dark:border-white/10 dark:bg-black/30">
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-200">{step.phase}</p>
                      <p className="text-[11px] text-zinc-600 dark:text-emerald-100">{step.focus}</p>
                      <p className="text-[10px] uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
                        {step.durationWeeks} semaines
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

