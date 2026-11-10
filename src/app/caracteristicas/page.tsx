import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  MessagesSquare,
  ShieldCheck,
  SlidersHorizontal,
  History,
  Zap,
  MonitorSmartphone,
} from "lucide-react";
import { Reveal } from "@/components/ui";
import { ProductPreview } from "@/components/product-preview";
export const metadata: Metadata = { title: "Características" };
const features = [
  {
    icon: MessagesSquare,
    title: "Una conversación, una dirección",
    text: "Cada conversación conserva su herramienta. Explora un objetivo sin mezclarlo con tus otros proyectos.",
  },
  {
    icon: SlidersHorizontal,
    title: "Cuatro formas de empezar",
    text: "Atlas organiza, Prism estructura borradores, Vector extrae frases y Code propone una checklist de desarrollo.",
  },
  {
    icon: History,
    title: "El contexto se queda contigo",
    text: "Retoma tus conversaciones después de cerrar la página. El historial se conserva solo en este navegador.",
  },
  {
    icon: ShieldCheck,
    title: "Tú decides qué conservar",
    text: "Elimina una conversación o borra todo el historial. No hay cuentas ni sincronización con servidores.",
  },
  {
    icon: Zap,
    title: "De la curiosidad a la acción",
    text: "Los ejemplos iniciales te ayudan a explorar sin pensar en el prompt perfecto. Edita cada ejemplo antes de enviarlo.",
  },
  {
    icon: MonitorSmartphone,
    title: "Tu espacio, a tu tamaño",
    text: "El workspace se adapta al móvil y al escritorio, con controles accesibles y movimiento reducido cuando lo prefieres.",
  },
];
export default function Features() {
  return (
    <main id="contenido" className="container">
      <header className="page-heading">
        <span className="eyebrow">LA EXPERIENCIA NEXUS</span>
        <h1>
          Un flujo más simple.
          <br />
          <span className="gradient-text">Una mente más libre.</span>
        </h1>
        <p>
          Todo lo que necesitas para explorar esta demo, en un espacio que sigue
          el ritmo de tus ideas.
        </p>
      </header>
      <Reveal>
        <ProductPreview />
      </Reveal>
      <section className="section feature-grid">
        {features.map((f) => (
          <Reveal key={f.title} className="feature-card">
            <f.icon size={24} />
            <h2>{f.title}</h2>
            <p>{f.text}</p>
          </Reveal>
        ))}
      </section>
      <section className="boundary-note">
        <span className="eyebrow">ALCANCE DE LA DEMO</span>
        <h2>Explora con expectativas claras.</h2>
        <p>
          Nexus AI es un producto ficticio. Las respuestas son resultados de
          reglas y plantillas locales; pueden ser repetitivas y no interpretan
          tu contexto como un modelo de IA. No incluye colaboración,
          integraciones, exportación ni servicios en la nube.
        </p>
        <Link href="/dashboard" className="button">
          Probar el workspace <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
