"use client";

import { useMemo, useRef, useState } from "react";

type Gender = "" | "Male" | "Female";
type PackageType =
  | ""
  | "Hajj Package A"
  | "Hajj Package B"
  | "Umrah Package"
  | "Ziyarah Package";
type NusukHajjCompany = "" | "Rawaf Mina" | "Ikram Aldeif" | "Holiday inn";

type FormState = {
  firstName: string;
  middleName: string;
  lastName: string;
  motherName: string;
  fatherName: string;
  email: string;
  cellPhone: string;
  dateOfBirth: string;
  gender: Gender;
  nationality: string;
  previousNationality: string;

  streetAddress: string;
  city: string;
  zipCode: string;
  state: string;
  passportNumber: string;
  dateOfIssue: string;
  dateOfExpiration: string;
  passportCopy: File | null;
  photograph: File | null;

  packageType: PackageType;
  departureCity: string;
  nusukHajjCompany: NusukHajjCompany;
  travelingCompanions: string;

  termsAccepted: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

type FieldKind =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "select"
  | "textarea"
  | "file";
type FieldDef = {
  name: Exclude<keyof FormState, "termsAccepted">;
  label: string;
  kind: FieldKind;
  required?: boolean;
  colSpan?: 1 | 2;
  options?: readonly string[];
  accept?: string;
};

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

const initialState: FormState = {
  firstName: "",
  middleName: "",
  lastName: "",
  motherName: "",
  fatherName: "",
  email: "",
  cellPhone: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  previousNationality: "",

  streetAddress: "",
  city: "",
  zipCode: "",
  state: "",
  passportNumber: "",
  dateOfIssue: "",
  dateOfExpiration: "",
  passportCopy: null,
  photograph: null,

  packageType: "",
  departureCity: "",
  nusukHajjCompany: "",
  travelingCompanions: "",

  termsAccepted: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const personalFields: readonly FieldDef[] = [
  { name: "firstName", label: "First Name", kind: "text", required: true },
  { name: "middleName", label: "Middle Name", kind: "text" },
  { name: "lastName", label: "Last Name", kind: "text", required: true },
  { name: "motherName", label: "Mother Name", kind: "text", required: true },
  { name: "fatherName", label: "Father Name", kind: "text", required: true },
  { name: "email", label: "Email", kind: "email", required: true },
  { name: "cellPhone", label: "Cell Phone", kind: "tel", required: true },
  { name: "dateOfBirth", label: "Date of Birth", kind: "date", required: true },
  {
    name: "gender",
    label: "Gender",
    kind: "select",
    required: true,
    options: ["Male", "Female"],
  },
  { name: "nationality", label: "Nationality", kind: "text", required: true },
  { name: "previousNationality", label: "Previous Nationality", kind: "text" },
] as const;

const addressPassportFields: readonly FieldDef[] = [
  {
    name: "streetAddress",
    label: "Street Address",
    kind: "text",
    required: true,
    colSpan: 2,
  },
  { name: "city", label: "City", kind: "text", required: true },
  { name: "zipCode", label: "Zip Code", kind: "text", required: true },
  { name: "state", label: "State", kind: "text", required: true },
  {
    name: "passportNumber",
    label: "Passport Number",
    kind: "text",
    required: true,
  },
  { name: "dateOfIssue", label: "Date of Issue", kind: "date", required: true },
  {
    name: "dateOfExpiration",
    label: "Date of Expiration",
    kind: "date",
    required: true,
  },
  {
    name: "passportCopy",
    label: "Passport Copy (Image, max 4MB)",
    kind: "file",
    required: true,
    accept: "image/*",
  },
  {
    name: "photograph",
    label: "Photograph (Image, max 4MB)",
    kind: "file",
    required: true,
    accept: "image/*",
  },
] as const;

const travelFields: readonly FieldDef[] = [
  {
    name: "packageType",
    label: "Package Type",
    kind: "select",
    required: true,
    options: ["Hajj Package A", "Hajj Package B", "Umrah Package", "Ziyarah Package"],
  },
  {
    name: "departureCity",
    label: "Departure City",
    kind: "text",
    required: true,
  },
  {
    name: "nusukHajjCompany",
    label: "Nusuk Hajj Company",
    kind: "select",
    required: true,
    options: ["Rawaf Mina", "Ikram Aldeif", "Holiday inn"],
  },
  {
    name: "travelingCompanions",
    label: "Traveling Companions",
    kind: "textarea",
    colSpan: 2,
  },
] as const;

const requiredOrder: readonly (keyof FormState)[] = [
  "firstName",
  "lastName",
  "motherName",
  "fatherName",
  "email",
  "cellPhone",
  "dateOfBirth",
  "gender",
  "nationality",
  "streetAddress",
  "city",
  "zipCode",
  "state",
  "passportNumber",
  "dateOfIssue",
  "dateOfExpiration",
  "passportCopy",
  "photograph",
  "packageType",
  "departureCity",
  "nusukHajjCompany",
  "termsAccepted",
] as const;

function inputClass(hasError: boolean) {
  return `mt-1 w-full rounded-[12px] border px-3 py-2 text-[14px] outline-none transition-colors ${
    hasError
      ? "border-red-500 bg-red-50 focus:border-red-500"
      : "border-[var(--line)] bg-white focus:border-[var(--gold-deep)]"
  }`;
}

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};

  const requiredText: Array<
    Exclude<keyof FormState, "termsAccepted" | "passportCopy" | "photograph">
  > = [
    "firstName",
    "lastName",
    "motherName",
    "fatherName",
    "email",
    "cellPhone",
    "dateOfBirth",
    "gender",
    "nationality",
    "streetAddress",
    "city",
    "zipCode",
    "state",
    "passportNumber",
    "dateOfIssue",
    "dateOfExpiration",
    "packageType",
    "departureCity",
    "nusukHajjCompany",
  ];

  for (const field of requiredText) {
    const value = state[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      errors[field] = "This field is required.";
    }
  }

  if (state.email.trim().length > 0 && !emailRegex.test(state.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!state.passportCopy) errors.passportCopy = "This file is required.";
  if (!state.photograph) errors.photograph = "This file is required.";
  if (!state.termsAccepted) errors.termsAccepted = "This field is required.";

  const checkFile = (field: "passportCopy" | "photograph", file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      errors[field] = "Only image files are allowed.";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      errors[field] = "File must be 4MB or smaller.";
    }
  };

  checkFile("passportCopy", state.passportCopy);
  checkFile("photograph", state.photograph);

  return errors;
}

function Field({
  label,
  required,
  error,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#31423a]"
      >
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      {children}
      {error ? <p className="mt-2 text-[12px] text-red-600">{error}</p> : null}
    </div>
  );
}

function Section({ title }: { title: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-[14px] font-semibold uppercase tracking-[0.24em] text-[var(--forest)]">
        {title}
      </h3>
      <div className="mt-2 h-px w-full bg-[linear-gradient(90deg,rgba(201,155,67,0.34),transparent)]" />
    </div>
  );
}

export function FallbackRegistrationForm({
  className = "",
  showHeader = true,
}: {
  className?: string;
  showHeader?: boolean;
}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  const fieldRefs = useRef<Partial<Record<keyof FormState, HTMLElement | null>>>({});
  const isSubmitting = submitState.status === "submitting";
  const hasAnyError = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const setFieldRef = (name: keyof FormState) => (el: HTMLElement | null) => {
    fieldRefs.current[name] = el;
  };

  const clearError = (name: keyof FormState) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const setString = (
    name: Exclude<keyof FormState, "termsAccepted" | "passportCopy" | "photograph">
  ) => {
    return (value: string) => {
      setForm((prev) => ({ ...prev, [name]: value } as FormState));
      clearError(name);
    };
  };

  const onText =
    (name: Exclude<keyof FormState, "termsAccepted" | "passportCopy" | "photograph">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setString(name)(e.target.value);
    };

  const onFile =
    (name: "passportCopy" | "photograph") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setForm((prev) => ({ ...prev, [name]: file }));
      clearError(name);
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, [name]: "Only image files are allowed." }));
        return;
      }
      if (file.size > MAX_IMAGE_BYTES) {
        setErrors((prev) => ({ ...prev, [name]: "File must be 4MB or smaller." }));
      }
    };

  const onTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, termsAccepted: e.target.checked }));
    clearError("termsAccepted");
  };

  const scrollToFirstInvalid = (errs: FormErrors) => {
    const first = requiredOrder.find((field) => Boolean(errs[field]));
    if (!first) return;
    const el = fieldRefs.current[first] ?? document.getElementById(String(first));
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus?.();
  };

  const resetForm = () => {
    setForm(initialState);
    setErrors({});
    setSubmitState({ status: "idle" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildFormData = (state: FormState) => {
    const fd = new FormData();

    const appendString = (name: keyof FormState, value: string) => {
      if (value.trim().length === 0) return;
      fd.append(String(name), value);
    };

    appendString("firstName", state.firstName);
    appendString("middleName", state.middleName);
    appendString("lastName", state.lastName);
    appendString("motherName", state.motherName);
    appendString("fatherName", state.fatherName);
    appendString("email", state.email);
    appendString("cellPhone", state.cellPhone);
    appendString("dateOfBirth", state.dateOfBirth);
    appendString("gender", state.gender);
    appendString("nationality", state.nationality);
    appendString("previousNationality", state.previousNationality);

    appendString("streetAddress", state.streetAddress);
    appendString("city", state.city);
    appendString("zipCode", state.zipCode);
    appendString("state", state.state);
    appendString("passportNumber", state.passportNumber);
    appendString("dateOfIssue", state.dateOfIssue);
    appendString("dateOfExpiration", state.dateOfExpiration);
    if (state.passportCopy) fd.append("passportCopy", state.passportCopy);
    if (state.photograph) fd.append("photograph", state.photograph);

    appendString("packageType", state.packageType);
    appendString("departureCity", state.departureCity);
    appendString("nusukHajjCompany", state.nusukHajjCompany);
    appendString("travelingCompanions", state.travelingCompanions);

    fd.append("termsAccepted", state.termsAccepted ? "true" : "false");
    return fd;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState({ status: "idle" });

    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      scrollToFirstInvalid(errs);
      return;
    }

    setSubmitState({ status: "submitting" });
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: buildFormData(form),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as { error?: string } | null;
        setSubmitState({
          status: "error",
          message: json?.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setSubmitState({ status: "success" });
    } catch {
      setSubmitState({
        status: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  const renderField = (field: FieldDef) => {
    const error = errors[field.name];
    const colSpan = field.colSpan ?? 1;
    const wrapClass = colSpan === 2 ? "md:col-span-2" : "";

    const baseProps = {
      id: field.name,
      name: field.name,
      className: inputClass(Boolean(error)),
    } as const;

    const common = (
      <Field label={field.label} required={field.required} error={error} htmlFor={field.name}>
        {field.kind === "textarea" ? (
          <textarea
            {...baseProps}
            value={form[field.name] as string}
            onChange={onText(field.name as never)}
            ref={setFieldRef(field.name) as unknown as React.Ref<HTMLTextAreaElement>}
            className={`${baseProps.className} min-h-[108px]`}
          />
        ) : field.kind === "select" ? (
          <select
            {...baseProps}
            value={form[field.name] as string}
            onChange={onText(field.name as never)}
            ref={setFieldRef(field.name) as unknown as React.Ref<HTMLSelectElement>}
          >
            <option value="">Select</option>
            {(field.options ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : field.kind === "file" ? (
          <input
            {...baseProps}
            type="file"
            accept={field.accept}
            onChange={onFile(field.name as "passportCopy" | "photograph")}
            ref={setFieldRef(field.name) as unknown as React.Ref<HTMLInputElement>}
          />
        ) : (
          <input
            {...baseProps}
            type={field.kind}
            value={form[field.name] as string}
            onChange={onText(field.name as never)}
            ref={setFieldRef(field.name) as unknown as React.Ref<HTMLInputElement>}
          />
        )}
      </Field>
    );

    return (
      <div key={field.name} className={wrapClass}>
        {common}
      </div>
    );
  };

  if (submitState.status === "success") {
    return (
      <div className={`mx-auto max-w-3xl ${className}`}>
        <div className="overflow-hidden rounded-[22px] border border-[var(--line)] bg-white shadow-[0_24px_60px_rgba(72,51,22,0.08)]">
          <div className="border-b border-[var(--line)] bg-[linear-gradient(135deg,#0a3b30_0%,#124f40_50%,#dfeee6_100%)] px-6 py-6 text-white">
            <h1 className="text-[22px] font-semibold">Submission received</h1>
            <p className="mt-2 text-[14px] text-white/90">
              Your application has been submitted successfully.
            </p>
          </div>
          <div className="px-6 py-6">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] bg-[var(--forest)] px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--forest-strong)]"
            >
              Submit Another Response
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-auto max-w-5xl ${className}`}>
      {showHeader && (
        <div className="mb-6 rounded-[18px] border border-[var(--line)] bg-white/80 px-6 py-6 shadow-[0_18px_42px_rgba(67,49,18,0.06)]">
          <h2
            className="text-[28px] font-extrabold tracking-tight text-[var(--forest)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Fallback Registration Form
          </h2>
          <p className="mt-2 max-w-3xl text-[14px] leading-6 text-[#4b564e]">
            This is a single-page emergency form. Please complete all required fields and upload
            the required images (max 4MB each).
          </p>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="overflow-hidden rounded-[22px] border border-[var(--line)] bg-white shadow-[0_24px_60px_rgba(72,51,22,0.08)]"
        noValidate
      >
        <div className="border-b border-[var(--line)] bg-[linear-gradient(135deg,#0a3b30_0%,#124f40_50%,#dfeee6_100%)] px-6 py-6 text-white">
          <h3 className="text-[18px] font-semibold uppercase tracking-[0.2em]">
            Pilgrimage Application
          </h3>
          <p className="mt-2 text-[13px] text-white/90">
            Required fields are marked. Validation runs on submit.
          </p>
        </div>

        <div className="px-6 py-8">
          {submitState.status === "error" && (
            <div className="mb-6 rounded-[14px] border border-red-200 bg-red-50 px-4 py-4 text-[14px] text-red-800">
              {submitState.message}
            </div>
          )}

          {hasAnyError && (
            <div className="mb-6 rounded-[14px] border border-[#e8d9bf] bg-[#fff8ec] px-4 py-4 text-[14px] text-[#5b4a2a]">
              Please review the highlighted fields and try again.
            </div>
          )}

          <Section title="Personal Information" />
          <div className="grid gap-4 md:grid-cols-2">{personalFields.map(renderField)}</div>

          <div className="mt-10">
            <Section title="Address & Passport Details" />
            <div className="grid gap-4 md:grid-cols-2">
              {addressPassportFields.map(renderField)}
            </div>
          </div>

          <div className="mt-10">
            <Section title="Travel Details" />
            <div className="grid gap-4 md:grid-cols-2">{travelFields.map(renderField)}</div>
          </div>

          <div className="mt-10">
            <Section title="Terms" />
            <div
              className={`rounded-[14px] border px-4 py-4 ${
                errors.termsAccepted
                  ? "border-red-500 bg-red-50"
                  : "border-[var(--line)] bg-[#fffdf8]"
              }`}
            >
              <label className="flex items-start gap-3">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={onTerms}
                  ref={setFieldRef("termsAccepted") as unknown as React.Ref<HTMLInputElement>}
                  className="mt-1 h-4 w-4 rounded border-[var(--line)]"
                />
                <span className="text-[14px] font-semibold text-[#2a342d]">
                  I accept the Terms and Conditions
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="mt-2 text-[12px] text-red-600">{errors.termsAccepted}</p>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex min-h-[48px] items-center justify-center rounded-[12px] border border-[var(--line)] bg-white px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2b3a31] transition-colors hover:bg-[#faf6ee]"
              disabled={isSubmitting}
            >
              Reset
            </button>

            <button
              type="submit"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[12px] bg-[var(--forest)] px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--forest-strong)] sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

