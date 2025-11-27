import { CompetitorOverview } from "@/app/components/CompetitorOverview";
import { ServiceMatrix } from "@/app/components/ServiceMatrix";
import { QuoteEngine } from "@/app/components/QuoteEngine";
import { AutomationSuite } from "@/app/components/AutomationSuite";
import { ClientPortal } from "@/app/components/ClientPortal";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white">
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 p-10 shadow-2xl shadow-black/40">
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
                IA Marketing Québec
              </span>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Positionnement stratégique &amp; offres IA pour dominer le marché nord-américain
              </h1>
              <p className="text-lg text-zinc-300">
                Benchmark concurrence (Québec, Canada, USA), sélection des services les plus rentables, tarification
                dynamique, automatisations bout en bout et portail client avec signature électronique + paiements instantanés.
              </p>
              <div className="grid gap-4 text-sm text-zinc-200 sm:grid-cols-3">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <p className="text-emerald-300">Retainer cible</p>
                  <p className="text-2xl font-semibold text-white">3 150 $ CAD</p>
                  <p className="text-xs text-zinc-400">-14% vs moyenne agences IA Québec</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-emerald-300">Automatisation</p>
                  <p className="text-2xl font-semibold text-white">17 workflows</p>
                  <p className="text-xs text-zinc-400">CRM, Ads, Contrats, Facturation</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-emerald-300">Conversion</p>
                  <p className="text-2xl font-semibold text-white">92%</p>
                  <p className="text-xs text-zinc-400">Taux signature via e-contract</p>
                </div>
              </div>
            </div>
            <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/20 via-black/60 to-black/80 p-6 text-sm text-zinc-200">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Synthèse concurrentielle</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <span className="text-emerald-200">PixelNord AI</span> : Retainer 3 800 CAD (tier Growth), focus social bilingue.
                </li>
                <li>
                  <span className="text-emerald-200">Montreal Metrics Lab</span> : 4 100 CAD, MMM + automatisation Shopify.
                </li>
                <li>
                  <span className="text-emerald-200">Blueprint Growth AI (USA)</span> : 4 700 USD, créatif performatif.
                </li>
              </ul>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-3">
                <p className="text-xs text-zinc-400">Notre différenciation</p>
                <p className="text-sm text-white">
                  Positionnement hybride Québec/USA, offres modulaires, moteur de devis temps réel, signature + paiement en
                  <span className="text-emerald-300"> moins de 5 minutes</span>.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.35),transparent_55%)]" />
        </section>

        <CompetitorOverview />
        <ServiceMatrix />
        <QuoteEngine />
        <AutomationSuite />
        <ClientPortal />
      </main>
    </div>
  );
}
