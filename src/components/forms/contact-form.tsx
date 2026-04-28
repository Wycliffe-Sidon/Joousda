import { submitContactForm } from "@/app/actions";
import { SubmitButton } from "./submit-button";

export function ContactForm() {
  return (
    <form
      action={submitContactForm}
      className="rounded-[1.75rem] border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Contact Form</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Send us a message</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Full name" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-900" />
        <input name="email" type="email" required placeholder="Email address" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-900" />
        <input name="phone" placeholder="Phone number" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-900" />
        <input name="subject" required placeholder="Subject" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-900" />
      </div>
      <textarea
        name="message"
        required
        rows={6}
        placeholder="Tell us how we can help..."
        className="mt-4 w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
      />
      <div className="mt-5">
        <SubmitButton />
      </div>
    </form>
  );
}
