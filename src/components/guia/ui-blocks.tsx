import type { ReactNode } from "react";
import { AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/averias-data";

export const toneBg: Record<Tone, string> = {
  transport: "bg-transport",
  pdv: "bg-pdv",
  quality: "bg-quality",
  alert: "bg-alert",
  neutral: "bg-ink",
};
export const toneText: Record<Tone, string> = {
  transport: "text-transport",
  pdv: "text-pdv",
  quality: "text-quality",
  alert: "text-alert",
  neutral: "text-ink",
};
export const toneSoft: Record<Tone, string> = {
  transport: "bg-transport/10",
  pdv: "bg-pdv/10",
  quality: "bg-quality/10",
  alert: "bg-alert/10",
  neutral: "bg-ink/5",
};
export const toneRing: Record<Tone, string> = {
  transport: "ring-transport/25",
  pdv: "ring-pdv/25",
  quality: "ring-quality/25",
  alert: "ring-alert/25",
  neutral: "ring-ink/10",
};

export function Section({
  id,
  eyebrow,
  title,
  tone = "neutral",
  icon,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  tone?: Tone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 pb-8", className)}>
      <div className="panel p-6 sm:p-8">
        <div className="flex items-center gap-3">
          {icon && (
            <span
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-xl",
                toneSoft[tone],
                toneText[tone],
              )}
            >
              {icon}
            </span>
          )}
          <div>
            {eyebrow && (
              <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", toneText[tone])}>
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-balance">
              {title}
            </h2>
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{children}</p>
  );
}

export function Steps({ items, tone = "transport" }: { items: ReactNode[]; tone?: Tone }) {
  return (
    <ol className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 rounded-xl bg-mist/70 p-3">
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-lg font-display text-sm font-bold text-on-color",
              toneBg[tone],
            )}
          >
            {i + 1}
          </span>
          <p className="pt-0.5 text-pretty text-ink/80">{item}</p>
        </li>
      ))}
    </ol>
  );
}

export function Checklist({ items, checked = false }: { items: ReactNode[]; checked?: boolean }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-3 rounded-xl bg-surface p-3 ring-1 ring-black/5">
          <span
            className={cn(
              "grid size-6 shrink-0 place-items-center rounded-md border-2",
              checked ? "border-quality bg-quality text-on-color" : "border-ink/25 text-ink/30",
            )}
          >
            <Check className="size-4" strokeWidth={3} />
          </span>
          <span className="text-ink/85">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExampleCards({ items, tone }: { items: { icon: string; label: string }[]; tone: Tone }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className={cn("rounded-xl p-4 ring-1", toneSoft[tone], toneRing[tone])}>
          <span className="text-2xl" aria-hidden="true">
            {it.icon}
          </span>
          <p className="mt-2 text-sm font-semibold leading-snug">{it.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Alert({
  title,
  children,
  tone = "alert",
  icon,
  className,
}: {
  title?: string;
  children?: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-3 rounded-2xl p-4 ring-1", toneSoft[tone], toneRing[tone], className)}>
      <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl text-on-color", toneBg[tone])}>
        {icon ?? <AlertTriangle className="size-5" />}
      </span>
      <div className="min-w-0">
        {title && <p className={cn("font-display font-semibold", toneText[tone])}>{title}</p>}
        {children && <div className="text-sm text-ink/75">{children}</div>}
      </div>
    </div>
  );
}

export function EmailList({ items, label }: { items: string[]; label: string }) {
  return (
    <div>
      <SubTitle>{label}</SubTitle>
      <ul className="space-y-1.5">
        {items.map((e) => (
          <li key={e} className="rounded-lg bg-surface px-3 py-2 text-sm ring-1 ring-black/5">
            {e.includes("@") ? (
              <a href={`mailto:${e}`} className="break-all font-medium text-transport underline-offset-2 hover:underline">
                {e}
              </a>
            ) : (
              <span className="text-ink/80">{e}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
