"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

type PortalStep = 1 | 2 | 3 | 4;

type Requirements = {
  goals: string;
  audiences: string;
  deliverables: string;
  approvalCadence: string;
  budgetNotes: string;
};

const initialRequirements: Requirements = {
  goals: "",
  audiences: "",
  deliverables: "",
  approvalCadence: "Hebdomadaire",
  budgetNotes: "",
};

export function ClientPortal() {
  const [step, setStep] = useState<PortalStep>(1);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [accountData, setAccountData] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
  });
  const [requirements, setRequirements] = useState<Requirements>(initialRequirements);
  const [signatureCompleted, setSignatureCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "ach" | "cardToken">("stripe");

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-950/80 p-8 text-white shadow-xl shadow-black/30">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
          Espace client sécurisé
        </p>
        <h2 className="mt-2 text-3xl font-semibold">
          Ouverture de compte, signature et paiement en autonomie
        </h2>
        <p className="mt-2 text-sm text-zinc-300">
          Chaque client dispose d&apos;un cockpit avec statut en temps réel : cahier des charges, contrat signé
          électroniquement (DocuSign / Dropbox Sign) et paiement récurrent configuré.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.4fr)_minmax(0,1.2fr)]">
        <div className="space-y-6">
          <nav className="grid gap-3 sm:grid-cols-4">
            {[
              { id: 1, label: "Compte" },
              { id: 2, label: "Cahier des charges" },
              { id: 3, label: "Signature" },
              { id: 4, label: "Paiement" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setStep(item.id as PortalStep)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  step === item.id
                    ? "border-emerald-400 bg-emerald-500/10 text-white"
                    : "border-white/10 bg-black/30 text-zinc-300 hover:border-emerald-400/60"
                }`}
              >
                <p className="text-[11px] uppercase tracking-wide text-emerald-300">{`Étape ${item.id}`}</p>
                <p className="font-medium">{item.label}</p>
              </button>
            ))}
          </nav>

          {step === 1 && (
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm">
              <p className="text-xs uppercase tracking-wide text-emerald-300">Création de compte</p>
              <p className="mt-2 text-zinc-300">
                Les informations sont synchronisées dans HubSpot + Notion Client Book automatiquement.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase text-zinc-400">Société</label>
                  <input
                    type="text"
                    value={accountData.company}
                    onChange={(event) => setAccountData((prev) => ({ ...prev, company: event.target.value }))}
                    placeholder="Ex: Horizon SaaS"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase text-zinc-400">Contact principal</label>
                  <input
                    type="text"
                    value={accountData.contact}
                    onChange={(event) => setAccountData((prev) => ({ ...prev, contact: event.target.value }))}
                    placeholder="Nom et prénom"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase text-zinc-400">Email</label>
                  <input
                    type="email"
                    value={accountData.email}
                    onChange={(event) => setAccountData((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="client@exemple.com"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase text-zinc-400">Téléphone</label>
                  <input
                    type="tel"
                    value={accountData.phone}
                    onChange={(event) => setAccountData((prev) => ({ ...prev, phone: event.target.value }))}
                    placeholder="+1 514 555 0199"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-emerald-300"
                >
                  Sauvegarder et passer aux besoins
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm">
              <p className="text-xs uppercase tracking-wide text-emerald-300">Cahier des charges</p>
              <p className="mt-2 text-zinc-300">
                Les réponses alimentent automatiquement le générateur de contrat et le runbook d&apos;onboarding.
              </p>
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="text-xs uppercase text-zinc-400">Objectifs marketing</label>
                  <textarea
                    value={requirements.goals}
                    onChange={(event) => setRequirements((prev) => ({ ...prev, goals: event.target.value }))}
                    placeholder="Croissance des leads, expansion USA, lancement produit..."
                    className="mt-1 min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase text-zinc-400">Audiences & marchés</label>
                  <textarea
                    value={requirements.audiences}
                    onChange={(event) => setRequirements((prev) => ({ ...prev, audiences: event.target.value }))}
                    placeholder="Personas, territoires, langues..."
                    className="mt-1 min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase text-zinc-400">Livrables souhaités</label>
                  <textarea
                    value={requirements.deliverables}
                    onChange={(event) => setRequirements((prev) => ({ ...prev, deliverables: event.target.value }))}
                    placeholder="Campagnes Meta, TikTok, CRM, dashboards..."
                    className="mt-1 min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase text-zinc-400">Cadence de validation</label>
                    <select
                      value={requirements.approvalCadence}
                      onChange={(event) => setRequirements((prev) => ({ ...prev, approvalCadence: event.target.value }))}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400"
                    >
                      <option>Hebdomadaire</option>
                      <option>Bi-hebdomadaire</option>
                      <option>Mensuel</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase text-zinc-400">Notes budget</label>
                    <textarea
                      value={requirements.budgetNotes}
                      onChange={(event) => setRequirements((prev) => ({ ...prev, budgetNotes: event.target.value }))}
                      className="mt-1 min-h-[90px] w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between text-xs text-zinc-500">
                <p>Synchronisation automatique → HubSpot (Deal), Notion (Projet), ClickUp (Tâches).</p>
                <button
                  onClick={() => setStep(3)}
                  className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-emerald-300"
                >
                  Générer projet + contrat
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm">
              <p className="text-xs uppercase tracking-wide text-emerald-300">Signature électronique</p>
              <p className="mt-2 text-zinc-300">
                Contrat généré depuis notre template IA (Clause bilingue, SLA, RGPD). Signature via DocuSign/Dropbox Sign
                déclenchée instantanément.
              </p>
              <div className="mt-4 rounded-xl border border-dashed border-emerald-400/40 bg-black/30 p-4">
                <p className="text-xs text-emerald-200">Aperçu du contrat</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-200">
                  <li>Résumé de mission et périmètre (issu du cahier des charges).</li>
                  <li>Forfait + frais variables + modalités de révision trimestrielle.</li>
                  <li>Clauses de confidentialité, droits d&apos;auteur, conformité québécoise.</li>
                  <li>Checklist d&apos;automatisation: CRM, paymedia, analytics.</li>
                </ul>
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span>Doc généré le {new Date().toLocaleDateString("fr-CA")}</span>
                  <button
                    onClick={() => {
                      setShowSignatureModal(true);
                      setSignatureCompleted(true);
                    }}
                    className="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-emerald-300"
                  >
                    Envoyer pour signature
                  </button>
                </div>
              </div>
              {signatureCompleted && (
                <div className="mt-4 rounded-lg border border-emerald-500/50 bg-emerald-500/10 p-4 text-xs text-emerald-100">
                  <p className="font-medium text-emerald-200">Signature complétée</p>
                  <p className="mt-1 text-emerald-200">
                    Horodatage et certificat stockés dans AWS S3 + CRM. Déclenchement automatique du workflow onboarding.
                  </p>
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(4)}
                  className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-emerald-300"
                >
                  Configurer paiement
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm">
              <p className="text-xs uppercase tracking-wide text-emerald-300">Paiement & facturation</p>
              <p className="mt-2 text-zinc-300">
                Paiement initial et récurrence automatisés via Stripe. Option ACH ou cartes corporatives. Factures générées
                et envoyées tous les mois avec QR code de paiement.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {[
                  { id: "stripe", title: "Carte + Apple Pay", description: "Stripe Billing, paiements instantanés." },
                  { id: "ach", title: "Prélèvement ACH", description: "Mandat bancaire pour clients américains." },
                  { id: "cardToken", title: "Carte d&apos;achat", description: "Tokenisation carte corporate / virtual card." },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPaymentMethod(option.id as typeof paymentMethod)}
                    className={`rounded-xl border p-4 text-left transition ${
                      paymentMethod === option.id
                        ? "border-emerald-400 bg-emerald-500/15 text-white"
                        : "border-white/10 bg-black/40 text-zinc-300 hover:border-emerald-400/60"
                    }`}
                  >
                    <p className="text-sm font-semibold" dangerouslySetInnerHTML={{ __html: option.title }} />
                    <p className="mt-2 text-xs text-zinc-400" dangerouslySetInnerHTML={{ __html: option.description }} />
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-black/50 p-4">
                  <p className="text-xs uppercase tracking-wide text-emerald-300">Paramètres récurrents</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-200">
                    <li>Facturation mensuelle en CAD ou USD.</li>
                    <li>Indexation automatique selon ROAS contractuel.</li>
                    <li>Notifications Slack + email côté client.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/50 p-4">
                  <p className="text-xs uppercase tracking-wide text-emerald-300">Sécurité & conformité</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-200">
                    <li>Tokenisation PCI-DSS via Stripe Vault.</li>
                    <li>Double authentification pour validation factures.</li>
                    <li>Exports comptables (QuickBooks, Acomba, Sage).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/15 p-6 text-sm text-emerald-50">
          <h3 className="text-xl font-semibold text-white">Workflow automatisé</h3>
          <ol className="space-y-3 text-xs">
            <li>
              <span className="font-semibold text-emerald-200">1. Intake</span> — Formulaire web ↔ HubSpot (Deal + Tickets),
              Slack (channel client).
            </li>
            <li>
              <span className="font-semibold text-emerald-200">2. Contrat</span> — Template IA → DocuSign → stockage S3 →
              trigger onboarding ClickUp.
            </li>
            <li>
              <span className="font-semibold text-emerald-200">3. Finance</span> — Stripe Billing, mapping QuickBooks, suivi
              KPI rentabilité.
            </li>
            <li>
              <span className="font-semibold text-emerald-200">4. Reporting</span> — Dashboard Looker + Figma Board (créa)
              partagés au client.
            </li>
          </ol>
          <div className="rounded-xl border border-white/20 bg-black/40 p-4 text-xs text-emerald-100">
            <p className="text-[11px] uppercase tracking-wide text-emerald-300">Statut en temps réel</p>
            <ul className="mt-2 space-y-2">
              <li>
                <span className="font-semibold text-white">Compte:</span>{" "}
                {accountData.company ? `Créé pour ${accountData.company}` : "En attente d'informations"}
              </li>
              <li>
                <span className="font-semibold text-white">Cahier des charges:</span>{" "}
                {requirements.goals ? "Validé" : "À compléter"}
              </li>
              <li>
                <span className="font-semibold text-white">Contrat:</span>{" "}
                {signatureCompleted ? "Signé" : "En attente de signature"}
              </li>
              <li>
                <span className="font-semibold text-white">Paiement:</span>{" "}
                {signatureCompleted ? `Méthode configurée (${paymentMethod})` : "Débloqué après signature"}
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <Transition show={showSignatureModal} as={Fragment}>
        <Dialog onClose={() => setShowSignatureModal(false)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel className="max-w-xl rounded-2xl border border-emerald-400/30 bg-zinc-950 p-6 text-sm text-white shadow-2xl">
                <Dialog.Title className="text-lg font-semibold">
                  Signature envoyée à {accountData.contact || "le client"}
                </Dialog.Title>
                <p className="mt-2 text-zinc-300">
                  Un email sécurisé vient d&apos;être transmis via DocuSign. Une fois le contrat signé, le webhook Stripe
                  active la facturation et l&apos;espace client se met à jour automatiquement.
                </p>
                <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-4 text-xs text-zinc-200">
                  <p className="text-[11px] uppercase tracking-wide text-emerald-300">Metadonnées</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4">
                    <li>Timestamp: {new Date().toLocaleString("fr-CA")}</li>
                    <li>Hash contrat: 0x7b3f-89aa-4fd1 (SHA256)</li>
                    <li>Audit trail stocké dans S3 (bucket: client-contracts-quebec).</li>
                  </ul>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowSignatureModal(false)}
                    className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-emerald-300"
                  >
                    Fermer
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
}

