"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={className ?? "rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"}
    >
      {pending ? "Saving..." : (children ?? "Submit")}
    </button>
  );
}
