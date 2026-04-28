import { submitPrayerRequest } from "@/app/actions";
import { SubmitButton } from "./submit-button";

export function PrayerRequestForm() {
  return (
    <form
      action={submitPrayerRequest}
      className="rounded-[1.75rem] border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-950"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Prayer Requests</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Share a prayer need</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Full name" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-900" />
        <input name="email" placeholder="Email address" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-900" />
        <input name="phone" placeholder="Phone number" className="h-12 rounded-2xl border border-slate-200 px-4 text-sm dark:border-slate-700 dark:bg-slate-900 sm:col-span-2" />
      </div>
      <textarea
        name="request"
        required
        rows={6}
        placeholder="Write your prayer request here..."
        className="mt-4 w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
      />
      <label className="mt-4 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
        <input name="isConfidential" type="checkbox" className="h-4 w-4 rounded border-slate-300" />
        Keep this request confidential
      </label>
      <div className="mt-5">
        <SubmitButton>Submit Prayer Request</SubmitButton>
      </div>
    </form>
  );
}
