"use client";

import Image from "next/image";
import { useState } from "react";

type UploadFieldProps = {
  name: string;
  folder: string;
  accept: string;
  label: string;
  defaultValue?: string | null;
  onUploadStateChange?: (uploading: boolean) => void;
  onValueChange?: (value: string) => void;
};

export function UploadField({
  name,
  folder,
  accept,
  label,
  defaultValue,
  onUploadStateChange,
  onValueChange,
}: UploadFieldProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    onUploadStateChange?.(true);
    try {
      const response = await fetch(`/api/upload?folder=${folder}`, {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Upload failed");
      }

      if (payload.url) {
        setValue(payload.url);
        onValueChange?.(payload.url);
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setLoading(false);
      onUploadStateChange?.(false);
    }
  }

  const isPdf = value.endsWith(".pdf") || value.startsWith("data:application/pdf");

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={value} readOnly />
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        type="file"
        accept={accept}
        disabled={loading}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void handleUpload(file);
          }
        }}
        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-sky-50 file:px-4 file:py-2 file:font-semibold file:text-sky-700 dark:text-slate-300 dark:file:bg-sky-950/50 dark:file:text-sky-100"
      />
      {loading ? <p className="text-xs text-slate-500">Uploading...</p> : null}
      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
      {value ? (
        isPdf ? (
          <a href={value} target="_blank" rel="noreferrer" className="text-sm text-sky-600">
            Current file: {value}
          </a>
        ) : (
          <div className="relative h-32 w-48 overflow-hidden rounded-2xl">
            <Image src={value} alt="Upload preview" fill className="object-cover" />
          </div>
        )
      ) : null}
    </div>
  );
}
