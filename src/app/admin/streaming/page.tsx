import { saveLiveStream, saveYearOnDuty } from "@/app/admin/actions";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAdminData } from "@/lib/site";

function parseJson(value?: string | null) {
  try {
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
}

export default async function AdminStreamingPage() {
  const data = await getAdminData();
  const yearOnDuty = data.content["year-on-duty"];
  const yearMeta = parseJson(yearOnDuty?.metadata) as {
    currentYear?: string;
    theme?: string;
    keyText?: string;
    sopBook?: string;
    guideTitle?: string;
    guideUrl?: string;
  };
  const liveStream = data.content["live-stream"];
  const liveMeta = parseJson(liveStream?.metadata) as {
    eventDate?: string;
    status?: string;
    youtubeUrl?: string;
    embedCode?: string;
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Worship & Leadership Focus</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Live Stream and Year on Duty</h1>
      </div>

      <form action={saveLiveStream} className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Live Streaming Event</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <input name="title" defaultValue={liveStream?.title ?? ""} placeholder="Event title" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <input name="subtitle" defaultValue={liveStream?.subtitle ?? "Watch Live"} placeholder="Subtitle" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <textarea name="body" defaultValue={liveStream?.body ?? ""} rows={5} placeholder="Description" className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <input name="eventDate" defaultValue={liveMeta.eventDate ?? ""} placeholder="Date & time" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </div>
          <div className="space-y-4">
            <select name="status" defaultValue={liveMeta.status ?? "Upcoming"} className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              <option value="Upcoming">Upcoming</option>
              <option value="Live Now">Live Now</option>
            </select>
            <input name="youtubeUrl" defaultValue={liveMeta.youtubeUrl ?? liveStream?.ctaHref ?? ""} placeholder="YouTube live link" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <textarea name="embedCode" defaultValue={liveMeta.embedCode ?? ""} rows={5} placeholder="Embed URL or embed code" className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <div className="grid gap-4 md:grid-cols-2">
              <input name="ctaLabel" defaultValue={liveStream?.ctaLabel ?? "Watch Live"} placeholder="Button label" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              <input name="ctaHref" defaultValue={liveStream?.ctaHref ?? ""} placeholder="Button link" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <SubmitButton>Save Live Stream</SubmitButton>
        </div>
      </form>

      <form action={saveYearOnDuty} className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Year on Duty</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <input name="title" defaultValue={yearOnDuty?.title ?? "2026 Year on Duty"} placeholder="Section title" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <input name="subtitle" defaultValue={yearOnDuty?.subtitle ?? "Year on Duty"} placeholder="Subtitle" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <input name="currentYear" defaultValue={yearMeta.currentYear ?? ""} placeholder="Current year / academic year" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <input name="theme" defaultValue={yearMeta.theme ?? ""} placeholder="Theme of the year" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <textarea name="body" defaultValue={yearOnDuty?.body ?? ""} rows={4} placeholder="Section description" className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <textarea name="keyText" defaultValue={yearMeta.keyText ?? ""} rows={4} placeholder="Key text / memory verse" className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </div>
          <div className="space-y-4">
            <input name="sopBook" defaultValue={yearMeta.sopBook ?? ""} placeholder="SOP book of the year" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <input name="guideTitle" defaultValue={yearMeta.guideTitle ?? ""} placeholder="Weekly guide title" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            <div className="rounded-[1.5rem] border border-slate-200 p-4 dark:border-slate-700">
              <UploadField name="guideUrl" label="Sabbath School Guide / Quarterly (PDF)" folder="resources" accept=".pdf" defaultValue={yearMeta.guideUrl} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input name="ctaLabel" defaultValue={yearOnDuty?.ctaLabel ?? "Download Weekly Guide"} placeholder="Button label" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              <input name="ctaHref" defaultValue={yearOnDuty?.ctaHref ?? yearMeta.guideUrl ?? ""} placeholder="Button link" className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <SubmitButton>Save Year on Duty</SubmitButton>
        </div>
      </form>
    </div>
  );
}
