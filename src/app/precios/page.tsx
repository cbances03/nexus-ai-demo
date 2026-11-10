import type { Metadata } from "next";
import { Pricing } from "@/components/pricing";
export const metadata: Metadata = { title: "Precios" };
export default function PricingPage() {
  return (
    <main id="contenido" className="container">
      <header className="page-heading centered">
        <span className="eyebrow">UN ESPACIO A TU MEDIDA</span>
        <h1>
          Grandes ideas.
          <br />
          <span className="gradient-text">Un comienzo sencillo.</span>
        </h1>
        <p>
          Explora la demo gratis e imagina cómo podría crecer contigo.
          <br />
          Todos los planes y precios son ficticios.
        </p>
      </header>
      <Pricing />
    </main>
  );
}
