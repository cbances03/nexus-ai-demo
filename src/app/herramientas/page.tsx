import type { Metadata } from "next";
import { ToolCatalog } from "@/components/tool-catalog";
export const metadata: Metadata = { title: "Herramientas" };
export default function ToolsPage() {
  return (
    <main id="contenido" className="container tools-page">
      <header className="page-heading">
        <span className="eyebrow">TU CAJA DE POSIBILIDADES</span>
        <h1>
          Una idea.
          <br />
          <span className="gradient-text">Cuatro perspectivas.</span>
        </h1>
        <p>
          Encuentra una forma de empezar. Cada herramienta utiliza una lógica
          local distinta para ayudarte a explorar.
        </p>
      </header>
      <ToolCatalog />
      <aside className="subtle-note">
        Las herramientas no usan modelos de IA. Los resultados son ilustrativos
        y requieren revisión humana.
      </aside>
    </main>
  );
}
