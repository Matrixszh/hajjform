export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] px-4 py-10 text-[#243028] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[22px] border border-[var(--line)] bg-white/85 shadow-[0_24px_60px_rgba(72,51,22,0.08)]">
          <div className="border-b border-[var(--line)] bg-[linear-gradient(135deg,#0a3b30_0%,#124f40_50%,#dfeee6_100%)] px-6 py-6 text-white sm:px-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e7cf97]">
              Hajj 2027
            </p>
            <h1
              className="mt-3 text-[34px] leading-none sm:text-[42px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Terms and Conditions
            </h1>
          </div>

          <div className="space-y-8 px-6 py-8 sm:px-8">
            <Section title="Acceptance of Terms">
              <p>
                By submitting this application, you acknowledge that you have
                read, understood, and accepted all of the Terms and Conditions
                outlined below.
              </p>
              <p>
                As the Nusuk system is based on numerous variables,
                probabilities, and operational limitations, all applicants are
                expected to maintain realistic expectations regarding both the
                registration process and the final travel arrangements. Caravan
                72 will make every reasonable effort to ensure that your Hajj
                journey is smooth, comfortable, and well-organized. Above all,
                our primary objective is to assist pilgrims in performing Hajj
                correctly and in a manner pleasing to Allah (SWT).
              </p>
            </Section>

            <Rule />

            <Section title="Responsibilities of Caravan 72">
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Register applicants in the best manner possible through the
                  Nusuk platform.
                </li>
                <li>
                  Secure the best available Hajj package options for applicants
                  and organize them as a group whenever possible.
                </li>
                <li>
                  Serve as the liaison between Nusuk and the applicant,
                  minimizing the need for applicants to communicate directly
                  with Nusuk.
                </li>
                <li>
                  Fill service gaps left by Nusuk and other providers whenever
                  possible to improve the overall Hajj experience.
                </li>
                <li>
                  Provide guidance to help ensure that Hajj rituals are
                  performed correctly.
                </li>
                <li>
                  Ensure fairness and respect toward all service providers
                  involved in the Hajj journey, including hotel staff,
                  transportation personnel, workers, guides, and other support
                  personnel.
                </li>
                <li>
                  Treat all pilgrims with the utmost respect, dignity, and
                  honor.
                </li>
              </ol>
            </Section>

            <Rule />

            <Section title="Responsibilities of the Applicant">
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  Complete all registration forms accurately and truthfully.
                </li>
                <li>Upload a clear JPEG copy of a valid passport.</li>
                <li>
                  Upload a clear personal photograph with a plain background and
                  a neutral facial expression (no smiling).
                </li>
                <li>
                  Observe the following photograph requirements:
                  <ul className="mt-3 list-disc space-y-2 pl-5">
                    <li>
                      Female applicants must observe proper Hijab in submitted
                      photographs.
                    </li>
                    <li>
                      Female applicants must also maintain proper Hijab in the
                      WhatsApp profile photograph used for the Hajj group
                      communication.
                    </li>
                  </ul>
                </li>
                <li>Submit all required payments by the stated deadlines.</li>
              </ol>
            </Section>

            <Rule />

            <Section title="Disclaimer">
              <p>Caravan 72 acts as a facilitator and coordinator of Hajj services.</p>
              <p>
                Caravan 72 shall not be held liable for any cancellation,
                modification, delay, reduction, or withdrawal of services by
                Nusuk, Saudi authorities, the Saudi sponsor company, airlines,
                hotels, transportation providers, or any other third-party
                service provider.
              </p>
              <p>
                All Hajj services remain subject to the rules, policies,
                availability, and operational decisions of Nusuk and the Kingdom
                of Saudi Arabia.
              </p>
            </Section>

            <Rule />

            <Section title="Payment of Funds">
              <div className="rounded-[18px] border border-[var(--line)] bg-[#fffaf1] px-5 py-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--gold-deep)]">
                  Standard Package Price
                </p>
                <p className="mt-2 text-[28px] font-semibold text-[var(--forest)]">
                  $11,900 per person
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-[var(--forest)]">
                  Payment Schedule
                </h3>
                <ol className="mt-4 list-decimal space-y-5 pl-5">
                  <li>
                    <p className="font-semibold text-[#2d3c33]">Initial Deposit</p>
                    <ul className="mt-2 list-disc space-y-2 pl-5">
                      <li>$2,000 per person due upon submission of the application.</li>
                      <li>Payment method: Zelle</li>
                      <li>Zelle Account: hajjandziarat@gmail.com</li>
                    </ul>
                  </li>
                  <li>
                    <p className="font-semibold text-[#2d3c33]">Second Payment</p>
                    <ul className="mt-2 list-disc space-y-2 pl-5">
                      <li>
                        A second payment will be made directly to Nusuk using the
                        applicant’s credit card or bank card.
                      </li>
                      <li>
                        The exact amount will be specified once package
                        arrangements have been finalized.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="font-semibold text-[#2d3c33]">Final Payment</p>
                    <ul className="mt-2 list-disc space-y-2 pl-5">
                      <li>
                        The remaining balance of the package price will be due
                        after deducting all previous payments.
                      </li>
                      <li>Total package cost: $11,900 per person.</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </Section>

            <Rule />

            <Section title="Cancellation and Refund Policy">
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  The full amount paid is refundable until funds have been
                  uploaded into the applicant’s Nusuk Wallet.
                </li>
                <li>
                  Once funds have been uploaded into the Nusuk Wallet,
                  cancellations may be subject to penalties and handling fees
                  imposed by Nusuk.
                </li>
                <li>
                  Nusuk may charge a handling fee of approximately 3.5% or such
                  other amount as determined by Nusuk.
                </li>
                <li>
                  Any refund after funds have been transferred to Nusuk will be
                  processed only after Caravan 72 receives the refund from
                  Nusuk.
                </li>
                <li>
                  Refund processing times are dependent upon Nusuk and
                  applicable financial institutions.
                </li>
              </ol>
            </Section>

            <Rule />

            <Section title="Acknowledgment">
              <p>
                By submitting this application and making payment, the applicant
                acknowledges and agrees to all terms, conditions,
                responsibilities, disclaimers, payment obligations, and refund
                policies contained herein.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 text-[15px] leading-7 text-[#4f5a52]">
      <h2 className="text-[22px] font-semibold text-[var(--forest)]">{title}</h2>
      {children}
    </section>
  );
}

function Rule() {
  return <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(201,155,67,0.44),transparent)]" />;
}
