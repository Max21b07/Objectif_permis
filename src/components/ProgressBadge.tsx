import type { Importance } from "../data/types";

const styles: Record<Importance, string> = {
  Vital: "bg-clay text-white",
  Important: "bg-lemon text-ink",
  Useful: "bg-skysoft text-ink",
};

export function ProgressBadge({ value }: { value: Importance | string }) {
  const style = value === "Vital" || value === "Important" || value === "Useful" ? styles[value] : "bg-mint text-moss";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold ${style}`}>{value}</span>;
}
