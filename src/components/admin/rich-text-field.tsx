"use client";

import { useRef } from "react";

type RichTextFieldProps = {
  name: string;
  label: string;
  defaultValue?: string | null;
  rows?: number;
};

export function RichTextField({
  name,
  label,
  defaultValue,
  rows = 8,
}: RichTextFieldProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function wrap(before: string, after = before) {
    const element = ref.current;
    if (!element) return;

    const start = element.selectionStart;
    const end = element.selectionEnd;
    const selected = element.value.slice(start, end);
    const next = `${element.value.slice(0, start)}${before}${selected}${after}${element.value.slice(end)}`;
    element.value = next;
    element.focus();
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <div className="flex flex-wrap gap-2">
        {[
          ["Heading", "## ", ""],
          ["Bold", "**", "**"],
          ["Italic", "_", "_"],
          ["Quote", "> ", ""],
          ["List", "- ", ""],
        ].map(([labelText, before, after]) => (
          <button
            key={labelText}
            type="button"
            onClick={() => wrap(before, after)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
          >
            {labelText}
          </button>
        ))}
      </div>
      <textarea
        ref={ref}
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
      />
    </div>
  );
}
