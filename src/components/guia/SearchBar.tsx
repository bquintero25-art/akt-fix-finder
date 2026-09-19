import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchSections } from "@/lib/averias-data";
import { toneBg } from "./ui-blocks";

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  const panel = el.querySelector<HTMLElement>(".panel") ?? el;
  panel.classList.remove("section-flash");
  void panel.offsetWidth;
  panel.classList.add("section-flash");
}

const SUGGESTIONS = ["48 horas", "Fotos", "Correo", "REST", "Cambio", "Rayón", "Formato"];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchSections(query), [query]);
  const open = query.trim().length > 0;

  const go = (id: string) => {
    setQuery("");
    scrollToSection(id);
  };

  return (
    <div className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) go(results[0].id);
        }}
        className="flex items-center gap-3 rounded-2xl bg-surface/70 p-2 pl-4 ring-1 ring-black/5 backdrop-blur-md transition-shadow focus-within:ring-2 focus-within:ring-transport/40"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-mist text-ink/50" aria-hidden="true">
          <Search className="size-5" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔎 ¿Qué necesitas consultar?"
          aria-label="Buscar en la guía"
          className="w-full bg-transparent py-2 text-base text-ink placeholder:text-ink/40 focus:outline-none"
        />
        <button
          type="submit"
          className="hidden rounded-lg bg-ink px-4 py-2 text-sm font-medium text-on-color sm:block"
        >
          Buscar
        </button>
      </form>

      {!open && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Prueba:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuery(s)}
              className="rounded-full bg-surface/70 px-3 py-1 text-xs font-medium text-ink/70 ring-1 ring-black/5 hover:bg-surface"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl bg-surface shadow-xl ring-1 ring-black/10">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              Sin resultados para “{query}”. Prueba con: transporte, fotos, correo, REST, cambio, formato.
            </p>
          ) : (
            <ul className="max-h-80 overflow-auto p-1.5">
              {results.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => go(r.id)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-mist"
                  >
                    <span className={cn("size-2.5 shrink-0 rounded-full", toneBg[r.tone])} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display font-semibold">{r.title}</span>
                      <span className="block truncate text-sm text-muted-foreground">{r.short}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-ink/40" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
