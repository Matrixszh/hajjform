import Image from "next/image";
import { FallbackRegistrationForm } from "./_components/FallbackRegistrationForm";

type PackageFeatureIconType =
  | "hotel"
  | "plane"
  | "train"
  | "bus"
  | "mosque"
  | "tent"
  | "meal"
  | "clipboard"
  | "support";

type PackageFeatureRow = {
  number: string;
  icon: PackageFeatureIconType;
  text: string;
};

type StandardPackage = {
  variant: "standard";
  title: string;
  price: string;
  accent: string;
  buttonClass: string;
  packageLabel: string;
  featureRows: PackageFeatureRow[];
  cta: string;
};

type DeluxePackage = {
  variant: "deluxe";
  title: string;
  price: string;
  accent: string;
  buttonClass: string;
  packageLabel: string;
  featureRows: PackageFeatureRow[];
  cta: string;
};

type PackageCard = StandardPackage | DeluxePackage;

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Packages", href: "#packages" },
  { label: "Why Choose Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

const highlights = [
  { label: "Visa Assistance", icon: "V" },
  { label: "Guided Rituals", icon: "G" },
  { label: "Haramain Train", icon: "T" },
  { label: "24/7 Support", icon: "S" },
  { label: "Premium Hotels", icon: "H" },
];

const packages: PackageCard[] = [
  {
    variant: "standard",
    title: "Standard Package",
    price: "$11,900",
    accent: "var(--forest)",
    buttonClass:
      "bg-[var(--forest)] text-white hover:bg-[var(--forest-strong)]",
    packageLabel: "Package Includes:",
    featureRows: [
      {
        number: "1",
        icon: "hotel",
        text: "3 nights accommodation in Madinah",
      },
      {
        number: "2",
        icon: "hotel",
        text: "10-15 nights accommodation in Makkah (depending on the package selected)",
      },
      {
        number: "3",
        icon: "plane",
        text: "Round-trip airfare from New York (JFK). Departures from other U.S. cities are available for a nominal surcharge, depending on the selected package.",
      },
      {
        number: "4",
        icon: "train",
        text: "Haramain High-Speed Train from Jeddah to Madinah.",
      },
      {
        number: "5",
        icon: "train",
        text: "Haramain High-Speed Train from Madinah to Makkah.",
      },
      {
        number: "6",
        icon: "bus",
        text: "Ground transportation from the Madinah train station to your hotel.",
      },
      {
        number: "7",
        icon: "bus",
        text: "Ground transportation from your hotel to the Miqat, then to the Madinah train station.",
      },
      {
        number: "8",
        icon: "bus",
        text: "Ground transportation from the Makkah train station to your hotel.",
      },
      {
        number: "9",
        icon: "mosque",
        text: "Guided Ziarat tour in Madinah.",
      },
      {
        number: "10",
        icon: "tent",
        text: "Transportation to Mina on the 10th and 11th of Dhul Hijjah.",
      },
      {
        number: "11",
        icon: "meal",
        text: "Daily breakfast and dinner buffet throughout the package.",
      },
      {
        number: "12",
        icon: "clipboard",
        text: "Complete Nusuk registration and Hajj visa processing. Our experienced team will complete your registration and obtain your Hajj visa. Your visa is guaranteed upon successful package confirmation through the official Hajj system.",
      },
      {
        number: "13",
        icon: "support",
        text: "Dedicated ground support from our team in both Madinah and Makkah throughout your Hajj journey.",
      },
    ],
    cta: "Choose Standard",
  },
  {
    variant: "deluxe",
    title: "Deluxe Package",
    price: "$15,900",
    accent: "var(--gold-deep)",
    buttonClass:
      "bg-[var(--gold-deep)] text-white hover:bg-[#b98a34]",
    packageLabel: "Package Includes:",
    featureRows: [
      {
        number: "1",
        icon: "clipboard",
        text: "Everything in Standard Package, plus",
      },
      {
        number: "2",
        icon: "hotel",
        text: "Upgraded five-star hotels in Makkah for 10 days from 4th Zul Hijjah to 14th Zul Hijjah",
      },
      {
        number: "3",
        icon: "mosque",
        text: "Walking-distance stay near Masjid Al Haram",
      },
      {
        number: "4",
        icon: "hotel",
        text: "Luxury rooms with premium Haram view",
      },
      {
        number: "5",
        icon: "support",
        text: "Priority support and curated group coordination",
      },
      {
        number: "6",
        icon: "meal",
        text: "Exclusive amenities and concierge assistance",
      },
    ],
    cta: "Choose Deluxe",
  },
];

type ReasonIconType =
  | "shield"
  | "people"
  | "support"
  | "hotel"
  | "logistics"
  | "ibadah";

const reasons = [
  {
    title: "Visa Guaranteed",
    text: "Official Nusuk processing and clear documentation guidance.",
    icon: "shield" as ReasonIconType,
  },
  {
    title: "Experienced Team",
    text: "Managers and group leaders who guide with care and trust.",
    icon: "people" as ReasonIconType,
  },
  {
    title: "Ground Support",
    text: "Arabic-speaking coordinators in Madinah and Makkah.",
    icon: "support" as ReasonIconType,
  },
  {
    title: "Premium Stay",
    text: "Carefully selected hotels chosen for comfort and convenience.",
    icon: "hotel" as ReasonIconType,
  },
  {
    title: "Organized Logistics",
    text: "Every leg of your journey arranged with calm precision.",
    icon: "logistics" as ReasonIconType,
  },
  {
    title: "Focus on Ibadah",
    text: "We handle the details so you can worship with peace of mind.",
    icon: "ibadah" as ReasonIconType,
  },
];

const faqColumns = [
  [
    "What is included in the package?",
    "Is the Hajj visa guaranteed?",
    "Can families and groups stay together?",
  ],
  [
    "What are the payment options?",
    "How far are the hotels from Haram?",
    "Is assistance available during the Hajj days?",
  ],
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-4 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--gold-deep)]">
      <span className="h-px w-10 bg-[var(--gold-soft)] sm:w-16" />
      <span>{children}</span>
      <span className="h-px w-10 bg-[var(--gold-soft)] sm:w-16" />
    </div>
  );
}

function CircleIcon({ label }: { label: string }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--gold-soft)] bg-white text-[12px] font-bold uppercase text-[var(--forest)] shadow-[0_8px_18px_rgba(65,49,22,0.08)]">
      {label}
    </span>
  );
}

function ReasonIcon({ type }: { type: ReasonIconType }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold-soft)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f1df_100%)] text-[var(--forest)] shadow-[0_10px_20px_rgba(65,49,22,0.08)]">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        {type === "shield" && (
          <>
            <path d="M12 3 18 5.5v5.7c0 4.1-2.5 7.7-6 9.3-3.5-1.6-6-5.2-6-9.3V5.5L12 3Z" {...stroke} />
            <path d="m9.5 12 1.7 1.7L14.8 10" {...stroke} />
          </>
        )}
        {type === "people" && (
          <>
            <circle cx="9" cy="9" r="2.5" {...stroke} />
            <circle cx="15.5" cy="10" r="2" {...stroke} />
            <path d="M4.5 18c.6-2.3 2.5-3.8 4.5-3.8s3.9 1.5 4.5 3.8" {...stroke} />
            <path d="M13.5 17.5c.4-1.7 1.7-2.8 3.3-2.8 1.4 0 2.6.9 3.1 2.3" {...stroke} />
          </>
        )}
        {type === "support" && (
          <>
            <path d="M6 12a6 6 0 1 1 12 0" {...stroke} />
            <path d="M6.5 14H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2.5" {...stroke} />
            <path d="M17.5 18H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1.5" {...stroke} />
            <path d="M9.5 19.5c.8.3 1.6.5 2.5.5 1 0 1.9-.2 2.8-.6" {...stroke} />
          </>
        )}
        {type === "hotel" && (
          <>
            <rect x="5" y="4.5" width="14" height="15" rx="1.5" {...stroke} />
            <path d="M9 4.5v15M15 4.5v15M5 10h14M11 13h2" {...stroke} />
          </>
        )}
        {type === "logistics" && (
          <>
            <rect x="3.5" y="7" width="10" height="8" rx="1.5" {...stroke} />
            <path d="M13.5 10h3l2 2.5V15h-5" {...stroke} />
            <circle cx="7" cy="17.5" r="1.5" {...stroke} />
            <circle cx="16.5" cy="17.5" r="1.5" {...stroke} />
          </>
        )}
        {type === "ibadah" && (
          <>
            <path d="M6 19h12" {...stroke} />
            <path d="M8.5 19v-4.5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5V19" {...stroke} />
            <path d="M10.5 11V8.5a1.5 1.5 0 0 1 3 0V11" {...stroke} />
            <path d="M12 5V3.5M10.8 4.7h2.4" {...stroke} />
          </>
        )}
      </svg>
    </span>
  );
}

function PackageFeatureIcon({
  type,
  tone = "standard",
}: {
  type: PackageFeatureIconType;
  tone?: "standard" | "deluxe";
}) {
  const iconTransforms: Record<PackageFeatureIconType, string> = {
    hotel: "translate(0 0) scale(1)",
    plane: "translate(0.2 0.2) scale(0.96)",
    train: "translate(0 0) scale(1)",
    bus: "translate(0 0) scale(1)",
    mosque: "translate(0.9 0.9) scale(0.92)",
    tent: "translate(1.1 1.1) scale(0.9)",
    meal: "translate(1.1 1.1) scale(0.9)",
    clipboard: "translate(0.5 0.5) scale(0.95)",
    support: "translate(1 1) scale(0.91)",
  };

  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
        tone === "deluxe"
          ? "border border-[#c7943a] bg-[linear-gradient(180deg,#fff3c8_0%,#e4be71_34%,#c9963d_70%,#a87522_100%)] text-[#5d4010] shadow-[inset_0_1px_0_rgba(255,255,255,0.58),0_12px_26px_rgba(159,117,34,0.24)]"
          : "bg-[var(--forest)] text-white shadow-[0_8px_18px_rgba(12,67,54,0.18)]"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`h-5 w-5 shrink-0 ${tone === "deluxe" ? "drop-shadow-[0_1px_1px_rgba(255,255,255,0.18)]" : ""}`}
      >
        <g transform={iconTransforms[type]}>
          {type === "hotel" && (
            <>
              <rect x="4" y="6" width="16" height="14" rx="1.5" {...stroke} />
              <path d="M8 6v14M16 6v14M4 11h16M11 14h2" {...stroke} />
            </>
          )}
          {type === "plane" && (
            <>
              <path d="M3 12h18" {...stroke} />
              <path d="M10 12 6 8m4 4-4 4m8-4 5-6m-5 6 5 6" {...stroke} />
            </>
          )}
          {type === "train" && (
            <>
              <rect x="5" y="4" width="14" height="13" rx="2" {...stroke} />
              <path d="M8 8h8M9 17l-2 3m8-3 2 3M7 20h10M8 12h2m4 0h2" {...stroke} />
            </>
          )}
          {type === "bus" && (
            <>
              <rect x="4" y="5" width="16" height="11" rx="2" {...stroke} />
              <path d="M7 16v3m10-3v3M6 19h12M7 9h10M8 12h1m7 0h1" {...stroke} />
            </>
          )}
          {type === "mosque" && (
            <>
              <path d="M4 19h16M7 19v-5l5-4 5 4v5M10 19v-3h4v3M6 10V6m12 4V6M5 6h2m10 0h2" {...stroke} />
            </>
          )}
          {type === "tent" && (
            <>
              <path d="M4 18h16L12 6 4 18Zm8-12v12" {...stroke} />
            </>
          )}
          {type === "meal" && (
            <>
              <path d="M7 4v8M5 4v5m4-5v5M7 12v8M15 4v18M15 4c2 0 4 2 4 4v2h-4" {...stroke} />
            </>
          )}
          {type === "clipboard" && (
            <>
              <rect x="6" y="5" width="12" height="15" rx="1.5" {...stroke} />
              <path d="M9 5.5V4h6v1.5M9 10h6M9 13h6M9 16h4" {...stroke} />
            </>
          )}
          {type === "support" && (
            <>
              <path d="M7 14v-2a5 5 0 0 1 10 0v2M7 14a2 2 0 0 0-2 2v1h3m9-3a2 2 0 0 1 2 2v1h-3M9 18c.8 1 1.9 1.5 3 1.5s2.2-.5 3-1.5" {...stroke} />
            </>
          )}
        </g>
      </svg>
    </span>
  );
}

function FaqRow({ question }: { question: string }) {
  return (
    <div className="flex items-center justify-between rounded-[14px] border border-[var(--line)] bg-white px-4 py-4 text-sm font-medium text-[#2f362f] shadow-[0_8px_24px_rgba(56,40,14,0.05)]">
      <span>{question}</span>
      <span className="text-lg font-light text-[var(--gold-deep)]">+</span>
    </div>
  );
}

export default function Home() {
  return (
    <main
      id="home"
      className="reference-page min-h-screen bg-[var(--paper)] text-[#243028]"
    >
      <div className="mx-auto max-w-full px-4 pb-0 pt-5 sm:px-6 lg:px-8">
        <header className="rounded-[18px] border border-[var(--line)] bg-white/90 px-4 py-4 shadow-[0_20px_50px_rgba(64,44,17,0.08)] backdrop-blur md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-[14px] border border-[var(--gold-soft)] bg-[var(--forest)] text-[var(--paper)]">
                <span className="text-[22px] leading-none">C</span>
              </div>
              <div>
                <p
                  className="text-[28px] leading-none text-[var(--forest)]"
                  style={{ fontFamily: "var(--font-brand)" }}
                >
                  Hajj Journey
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-[#8e7b60]">
                  Faith Travel Experience
                </p>
              </div>
            </div>

            <details className="group relative lg:hidden">
              <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-[12px] border border-[var(--line)] bg-white text-[var(--forest)] shadow-[0_10px_24px_rgba(64,44,17,0.06)] transition-colors hover:bg-[#faf6ee] [&::-webkit-details-marker]:hidden">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 group-open:hidden"
                >
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="hidden h-5 w-5 group-open:block"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>

              <div className="absolute right-0 top-[calc(100%+12px)] z-30 w-[260px] rounded-[18px] border border-[var(--line)] bg-white p-4 shadow-[0_24px_50px_rgba(64,44,17,0.12)]">
                <nav className="flex flex-col gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#374239]">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="rounded-[10px] px-2 py-2 transition-colors hover:bg-[#faf6ee] hover:text-[var(--gold-deep)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <a
                  href="#fallback-registration"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-[12px] bg-[var(--forest)] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--forest-strong)]"
                >
                  Book Now
                </a>
              </div>
            </details>
          </div>

          <div className="mt-4 hidden items-center justify-between gap-6 lg:flex">
            <nav className="flex flex-wrap items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#374239]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-[var(--gold-deep)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#fallback-registration"
              className="inline-flex items-center justify-center rounded-[12px] bg-[var(--forest)] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--forest-strong)]"
            >
              Book Now
            </a>
          </div>
        </header>

        <section className="mt-4 overflow-hidden rounded-[24px] border border-[var(--line)] bg-[linear-gradient(135deg,#fbf7ef_0%,#f2e8d8_100%)] shadow-[0_24px_60px_rgba(72,51,22,0.08)]">
          <div className="grid gap-8 px-5 py-6 lg:grid-cols-[0.98fr_1.18fr] lg:px-7 lg:py-7">
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[var(--gold-deep)]">
                  Hajj 2027
                </p>
                <h1
                  className="mt-3 max-w-[540px] text-[clamp(3.1rem,6vw,5.2rem)] leading-[0.9] text-[var(--forest)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Perform Hajj
                  <br />
                  with Confidence.
                </h1>
                <p className="mt-4 max-w-[430px] text-[15px] leading-7 text-[#5f625a]">
                  We take care of every flight, visa, accommodation,
                  transport, and every detail so you can focus on your ibadah
                  with peace of mind.
                </p>

                <div className="mt-7 max-w-[360px] rounded-[18px] border border-[var(--gold-soft)] bg-white px-4 py-4 shadow-[0_18px_38px_rgba(63,46,18,0.08)]">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-[rgba(216,191,138,0.35)] text-[var(--forest)]">
                      <span className="text-lg">+</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--gold-deep)]">
                        Tentative Date
                      </p>
                      <p className="mt-2 text-[24px] font-semibold text-[var(--forest)]">
                        May 5 - May 22, 2027
                      </p>
                      <p className="mt-1 text-[12px] text-[#7c776c]">
                        Subject to Saudi calendar confirmation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#fallback-registration"
                    className="inline-flex min-w-[190px] items-center justify-center rounded-[12px] bg-[var(--forest)] px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--forest-strong)]"
                  >
                    Reserve Your Spot
                  </a>
                  <a
                    href="#packages"
                    className="inline-flex min-w-[170px] items-center justify-center rounded-[12px] border border-[var(--gold-soft)] bg-white px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2f3c33] transition-colors hover:bg-[#faf5eb]"
                  >
                    View Packages
                  </a>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[16px] border border-[var(--line)] bg-white/85 px-3 py-3 text-center shadow-[0_14px_32px_rgba(65,45,19,0.05)]"
                  >
                    <div className="mx-auto mb-2">
                      <CircleIcon label={item.icon} />
                    </div>
                    <p className="text-[12px] font-semibold leading-5 text-[#334036]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[430px] overflow-hidden rounded-[24px] ">
              <Image
                src="/hajj.jpeg"
                alt="Pilgrims gathered around the Kaaba in Mecca"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain object-center"
              />

              <div className="absolute right-4 top-5 grid h-[118px] w-[118px] place-items-center rounded-full border-[6px] border-[#d3b36a] bg-[radial-gradient(circle_at_30%_30%,#175646_0%,#083428_70%)] text-center text-white shadow-[0_18px_30px_rgba(17,45,36,0.3)]">
                <div className="w-[82px]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#eed291]">
                    Limited Seats
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase leading-4 tracking-[0.14em] text-[#fff5d8]">
                    Book early to secure your spot
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="packages"
          className="mt-7 rounded-[22px] border border-[var(--line)] bg-white/80 px-4 py-6 shadow-[0_20px_48px_rgba(67,49,18,0.06)] sm:px-6"
        >
          <SectionTitle>Packages</SectionTitle>
          <div className="grid gap-5 xl:grid-cols-2">
            {packages.map((pkg) => {
              const isDeluxe = pkg.variant === "deluxe";
              const isStandard = pkg.variant === "standard";

              return (
                <article
                  key={pkg.title}
                  className={`overflow-hidden rounded-[22px] border bg-[#fffdf8] ${
                    isDeluxe
                      ? "border-[#d8bb80] shadow-[0_24px_52px_rgba(140,101,26,0.14)]"
                      : "border-[#b8d0c2] shadow-[0_20px_46px_rgba(21,69,55,0.1)]"
                  }`}
                >
                  <div
                    className={`relative flex items-center justify-between px-5 py-4 ${
                      isDeluxe
                        ? "overflow-hidden border-b border-[#d8bb80] bg-[linear-gradient(135deg,#8a5e14_0%,#c5963d_18%,#f3dfab_39%,#fffdf4_58%,#e4c06c_77%,#9a6a1f_100%)]"
                        : "overflow-hidden border-b border-[#7ea894] bg-[linear-gradient(135deg,#08372c_0%,#145443_28%,#3d725f_64%,#5f8f7d_100%)] text-white"
                    }`}
                    style={undefined}
                  >
                    {(isDeluxe || isStandard) && (
                      <>
                        <div
                          className={`pointer-events-none absolute inset-0 ${
                            isDeluxe
                              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0)_38%,rgba(255,244,221,0.16)_100%)]"
                              : "bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0)_38%,rgba(92,149,127,0.14)_100%)]"
                          }`}
                        />
                        <div
                          className={`pointer-events-none absolute -left-10 top-0 h-16 w-44 rotate-[8deg] ${
                            isDeluxe
                              ? "bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.76),rgba(255,255,255,0))] opacity-70"
                              : "bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.62),rgba(255,255,255,0))] opacity-60"
                          } blur-lg`}
                        />
                        <div
                          className={`pointer-events-none absolute right-6 top-1 h-10 w-24 rounded-full ${
                            isDeluxe
                              ? "bg-[radial-gradient(circle,rgba(255,255,255,0.88)_0%,rgba(255,242,205,0.48)_36%,transparent_75%)]"
                              : "bg-[radial-gradient(circle,rgba(241,255,248,0.56)_0%,rgba(128,183,161,0.28)_38%,transparent_76%)]"
                          } blur-md`}
                        />
                        {!isDeluxe && (
                          <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-[linear-gradient(90deg,rgba(8,55,44,0)_0%,rgba(8,55,44,0.14)_34%,rgba(8,55,44,0.28)_100%)]" />
                        )}
                        <div
                          className={`pointer-events-none absolute inset-x-4 bottom-0 h-px ${
                            isDeluxe
                              ? "bg-[linear-gradient(90deg,transparent,rgba(131,87,18,0.4),transparent)]"
                              : "bg-[linear-gradient(90deg,transparent,rgba(18,70,56,0.36),transparent)]"
                          }`}
                        />
                      </>
                    )}

                    <p
                      className={`relative text-[13px] font-semibold uppercase tracking-[0.22em] ${
                        isDeluxe ? "text-[#1d4034]" : isStandard ? "text-white" : ""
                      }`}
                    >
                      {pkg.title}
                    </p>
                    <p
                      className={`relative text-[40px] leading-none ${
                        isDeluxe
                          ? "text-[#fff9ee] drop-shadow-[0_2px_8px_rgba(93,63,16,0.26)]"
                          : "text-[#fbfffc] drop-shadow-[0_2px_10px_rgba(6,31,24,0.34)]"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {pkg.price}
                    </p>
                  </div>

                  <div className="p-4 md:p-5">
                    <div
                      className={`relative overflow-hidden rounded-[18px] border px-4 py-5 ${
                        isDeluxe
                          ? "border-[#dcc18a] bg-[linear-gradient(135deg,rgba(169,120,33,0.2)_0%,rgba(246,228,182,0.78)_24%,rgba(255,255,255,0.98)_50%,rgba(255,249,235,0.96)_70%,rgba(214,178,94,0.26)_100%)] shadow-[0_20px_40px_rgba(140,101,26,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]"
                          : "border-[#b8d4c7] bg-[linear-gradient(135deg,rgba(15,84,66,0.22)_0%,rgba(111,164,142,0.52)_24%,rgba(229,242,236,0.92)_52%,rgba(211,231,222,0.94)_74%,rgba(87,149,122,0.22)_100%)] shadow-[0_18px_36px_rgba(21,69,55,0.08),inset_0_1px_0_rgba(255,255,255,0.42)]"
                      }`}
                    >
                      {(isDeluxe || isStandard) && (
                        <>
                          <div className="pointer-events-none absolute inset-[1px] rounded-[17px] border border-white/55" />
                          <div
                            className={`pointer-events-none absolute inset-0 ${
                              isDeluxe
                                ? "bg-[linear-gradient(122deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.22)_26%,rgba(255,255,255,0.78)_48%,rgba(255,249,229,0.3)_62%,rgba(198,152,55,0.12)_100%)]"
                                : "bg-[linear-gradient(122deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_24%,rgba(255,255,255,0.72)_48%,rgba(231,245,238,0.32)_64%,rgba(42,110,85,0.1)_100%)]"
                            }`}
                          />
                          <div
                            className={`pointer-events-none absolute inset-x-[18%] top-0 h-16 ${
                              isDeluxe
                                ? "bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.5)_36%,rgba(255,250,234,0.95)_50%,rgba(255,255,255,0.22)_62%,transparent_100%)] opacity-85"
                                : "bg-[linear-gradient(100deg,transparent_0%,rgba(244,255,249,0.28)_34%,rgba(222,243,233,0.62)_50%,rgba(255,255,255,0.12)_62%,transparent_100%)] opacity-75"
                            } blur-lg`}
                          />
                          <div
                            className={`pointer-events-none absolute -right-8 top-3 h-28 w-28 rounded-full ${
                              isDeluxe
                                ? "bg-[radial-gradient(circle,rgba(255,255,255,0.94)_0%,rgba(255,244,214,0.56)_34%,transparent_74%)]"
                                : "bg-[radial-gradient(circle,rgba(243,255,248,0.62)_0%,rgba(150,199,178,0.36)_34%,transparent_74%)]"
                            } blur-xl`}
                          />
                          <div
                            className={`pointer-events-none absolute left-7 top-9 h-20 w-20 rounded-full ${
                              isDeluxe
                                ? "bg-[radial-gradient(circle,rgba(255,247,228,0.7)_0%,transparent_72%)]"
                                : "bg-[radial-gradient(circle,rgba(241,255,248,0.62)_0%,transparent_72%)]"
                            } blur-2xl`}
                          />
                          <div
                            className={`pointer-events-none absolute inset-3 rounded-[14px] ${
                              isDeluxe
                                ? "border border-[rgba(201,155,67,0.34)]"
                                : "border border-[rgba(22,84,66,0.22)]"
                            }`}
                          />
                          <span className="pointer-events-none absolute left-[14%] top-[18%] h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.75)]" />
                          <span
                            className={`pointer-events-none absolute right-[18%] top-[34%] h-1 w-1 rounded-full ${
                              isDeluxe
                                ? "bg-[#fff2cf] shadow-[0_0_8px_rgba(255,235,182,0.72)]"
                                : "bg-[#e8fff2] shadow-[0_0_8px_rgba(213,244,227,0.68)]"
                            }`}
                          />
                          <span
                            className={`pointer-events-none absolute right-[28%] bottom-[22%] h-1.5 w-1.5 rounded-full ${
                              isDeluxe
                                ? "bg-[#fff9ed] shadow-[0_0_10px_rgba(255,247,220,0.7)]"
                                : "bg-[#f6fff9] shadow-[0_0_10px_rgba(237,255,245,0.68)]"
                            }`}
                          />
                          <span
                            className={`pointer-events-none absolute left-[22%] bottom-[28%] h-1 w-1 rounded-full ${
                              isDeluxe
                                ? "bg-[#fae7b4] shadow-[0_0_8px_rgba(245,217,143,0.66)]"
                                : "bg-[#d6efe3] shadow-[0_0_8px_rgba(196,230,214,0.62)]"
                            }`}
                          />
                        </>
                      )}

                      <div className="relative z-10">
                        <p
                          className={`border-b pb-3 text-center text-[26px] font-italic uppercase tracking-[0.04em] ${
                            isDeluxe
                              ? "border-[#e2ca9a] text-[#8f6524]"
                              : "border-[#d3e2da] text-[var(--forest)]"
                          }`}
                          style={undefined}
                        >
                          {pkg.packageLabel}
                        </p>
                        <ul className="mt-4 space-y-0">
                          {pkg.featureRows.map((feature) => (
                            <li
                              key={`${pkg.title}-${feature.number}`}
                              className={`grid grid-cols-[2.75rem_2rem_minmax(0,1fr)] items-start gap-3 py-3 last:border-b-0 ${
                                isDeluxe
                                  ? "border-b border-[#ead8b4]"
                                  : "border-b border-[#dde9e2]"
                              }`}
                            >
                              <PackageFeatureIcon
                                type={feature.icon}
                                tone={isDeluxe ? "deluxe" : "standard"}
                              />
                              <span
                                className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-[7px] text-[12px] font-bold tabular-nums ${
                                  isDeluxe
                                    ? "border border-[#c7943a] bg-[linear-gradient(180deg,#fbefc6_0%,#d0a24b_100%)] text-[#1f4337] shadow-[inset_0_1px_0_rgba(255,255,255,0.62),0_8px_18px_rgba(201,155,67,0.18)]"
                                    : "bg-[var(--forest)] text-white"
                                }`}
                              >
                                {feature.number}
                              </span>
                              <span className="min-w-0 text-[14px] font-semibold leading-6 text-[#28372f]">
                                {feature.text}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <a
                          href="#fallback-registration"
                          className={`mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] px-5 text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors ${pkg.buttonClass} ${
                            isDeluxe
                              ? "shadow-[0_12px_22px_rgba(172,126,39,0.18)]"
                              : ""
                          }`}
                        >
                          {pkg.cta}
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="why"
          className="mt-7 rounded-[22px] border border-[var(--line)] bg-white/80 px-4 py-6 shadow-[0_18px_42px_rgba(67,49,18,0.06)] sm:px-6"
        >
          <SectionTitle>Why Choose Us?</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-[18px] border border-[var(--line)] bg-[#fffefb] p-5 shadow-[0_14px_34px_rgba(66,47,18,0.05)]"
              >
                <ReasonIcon type={reason.icon} />
                <h3 className="mt-4 text-[18px] font-semibold text-[var(--forest)]">
                  {reason.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-[#64675f]">
                  {reason.text}
                </p>
              </article>
            ))}
          </div>
        </section>

      </div>

      <section id="fallback-registration" className="bg-[var(--paper)]">
        <div className="mx-auto max-w-[1220px] px-4 pb-2 pt-8 sm:px-6 lg:px-8">
          <div className="rounded-[22px] border border-[var(--line)] bg-white/80 px-4 py-6 shadow-[0_18px_42px_rgba(67,49,18,0.06)] sm:px-6">
            <SectionTitle>Registration</SectionTitle>
            <FallbackRegistrationForm showHeader={false} />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="bg-[linear-gradient(135deg,#0a3b30_0%,#072d24_100%)] text-[#f6efdf]"
      >
        <div className="mx-auto max-w-[1220px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-[24px] border border-[#1c5c4d] bg-[linear-gradient(90deg,rgba(203,159,73,0.12),rgba(255,255,255,0.02))] px-5 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.16)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.34em] text-[#e6c98b]">
                  Begin Your Sacred Journey
                </p>
                <h2
                  className="mt-3 text-[42px] leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Spots are limited for Hajj 2027.
                </h2>
                <p className="mt-3 text-[15px] text-[#d9d4c7]">
                  Book early to secure your package and speak with our team.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="tel:+18775756775"
                  className="rounded-[14px] border border-[#2d705f] bg-[#0f473a] px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-[#145845]"
                >
                  (877) 575-6775
                </a>
                <a
                  href="/terms-and-conditions"
                  className="rounded-[14px] bg-[var(--gold-deep)] px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-[#17372e] transition-colors hover:bg-[#dcb262]"
                >
                  Terms and Conditions
                </a>
              </div>
            </div>
          </div>

          <footer className="pb-10 pt-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-[14px] border border-[#d1b574] bg-[#0e473a] text-[#f6e6bd]">
                  <span className="text-[22px] leading-none">C</span>
                </div>
                <div>
                  <p
                    className="text-[28px] leading-none"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Hajj Journey
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-[#c7b183]">
                    Hajj Travel Agency
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-[360px] text-[14px] leading-7 text-[#d5d0c5]">
                Your trusted partner for a comfortable and spiritually focused
                Hajj journey.
              </p>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
