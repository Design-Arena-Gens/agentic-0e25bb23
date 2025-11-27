import { serviceCatalog } from "@/app/data/services";
import { demandMetrics } from "@/app/data/competitors";

export function ServiceMatrix() {
  return (
    <section className="rounded-2xl border border-white/5 bg-white/90 p-8 shadow-2xl shadow-emerald-200/20 dark:bg-zinc-950/80">
      <header className="mb-6 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-500">
          Services Prioritaires
        </p>
        <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white">
          Offre calibrée pour le marché nord-américain
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Sélection basée sur la demande observée chez les concurrents
          québécois et nord-américains, avec différenciation par automatisation
          native et prix compétitifs.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          {serviceCatalog.map((service) => (
            <article
              key={service.id}
              className="rounded-xl border border-emerald-200/40 bg-white/70 p-5 dark:border-emerald-400/20 dark:bg-zinc-900/70"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {service.description}
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-500/15 px-3 py-2 text-right text-xs text-emerald-700 dark:text-emerald-300">
                  <p className="font-semibold">
                    {service.baseMonthly.toLocaleString("fr-CA", {
                      style: "currency",
                      currency: "CAD",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p>
                    Setup{" "}
                    {service.setupFee.toLocaleString("fr-CA", {
                      style: "currency",
                      currency: "CAD",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="uppercase tracking-wide text-[10px] text-emerald-500 dark:text-emerald-300">
                    Perf {Math.round(service.performanceFeePct * 100)}%
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-500">
                    Livrables
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-500">
                    Automatisation
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                    {service.automation.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {service.addOns.length > 0 && (
                <div className="mt-4 rounded-lg border border-dashed border-emerald-400/40 bg-emerald-500/5 p-3 text-sm text-emerald-700 dark:text-emerald-300">
                  <p className="text-xs uppercase tracking-wide text-emerald-500">
                    Options
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {service.addOns.map((addon) => (
                      <li key={addon.name}>
                        <span className="font-medium">{addon.name}</span> —{" "}
                        {addon.description} (
                        {addon.price.toLocaleString("fr-CA", {
                          style: "currency",
                          currency: "CAD",
                          maximumFractionDigits: 0,
                        })}
                        )
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
        <aside className="space-y-4 rounded-xl border border-zinc-200 bg-white/80 p-5 dark:border-zinc-700 dark:bg-zinc-900/70">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Indices de demande
          </h3>
          <ul className="space-y-3">
            {demandMetrics.map((metric) => (
              <li
                key={metric.service}
                className="rounded-lg border border-zinc-200 bg-white/80 p-3 dark:border-zinc-700 dark:bg-zinc-950/60"
              >
                <p className="text-sm font-medium text-zinc-800 dark:text-white">
                  {metric.service}
                </p>
                <div className="mt-2 h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${Math.min(metric.demandIndex, 100)}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>Indice {metric.demandIndex}</span>
                  <span>Croissance {Math.round(metric.growthYoY * 100)}% YoY</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

