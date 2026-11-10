"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ArrowUpRight, X } from "lucide-react";
import { tools } from "@/lib/data";
export function ToolCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const filtered = tools.filter(
    (t) =>
      (category === "Todas" || t.category === category) &&
      `${t.name} ${t.description} ${t.category}`
        .toLocaleLowerCase("es")
        .includes(query.toLocaleLowerCase("es").trim()),
  );
  return (
    <>
      <div className="catalog-controls">
        <div className="search-box">
          <Search size={18} />
          <label className="sr-only" htmlFor="tool-search">
            Buscar herramientas
          </label>
          <input
            id="tool-search"
            placeholder="Busca una idea, una tarea, una herramienta…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="icon-button"
              aria-label="Limpiar búsqueda"
              onClick={() => setQuery("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="filter-list" aria-label="Categoría de herramienta">
          {["Todas", ...tools.map((t) => t.category)].map((c) => (
            <button
              key={c}
              className={category === c ? "filter active" : "filter"}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="result-count" role="status">
        {filtered.length}{" "}
        {filtered.length === 1
          ? "herramienta disponible"
          : "herramientas disponibles"}{" "}
        · simulación local
      </p>
      <div className="catalog-grid">
        {filtered.map((t) => (
          <article className={`catalog-card ${t.color}`} key={t.id}>
            <div className="catalog-card-top">
              <span className={`tool-icon ${t.color}`}>
                <t.icon size={26} />
              </span>
              <span className="chip">{t.category}</span>
            </div>
            <h2>
              {t.name}
              <span>{t.label}</span>
            </h2>
            <p>{t.description}</p>
            <div className="sample-box">
              <span className="eyebrow">PRUEBA CON ESTO</span>
              <p>«{t.prompt}»</p>
            </div>
            <Link
              className="button button-secondary"
              href={`/dashboard?tool=${t.id}`}
            >
              Abrir {t.name} <ArrowUpRight size={16} />
            </Link>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Search size={28} />
          <h2>No encontramos esa herramienta.</h2>
          <p>Prueba otra palabra o elimina los filtros.</p>
          <button
            className="button button-secondary"
            onClick={() => {
              setQuery("");
              setCategory("Todas");
            }}
          >
            Restablecer búsqueda
          </button>
        </div>
      )}
    </>
  );
}
