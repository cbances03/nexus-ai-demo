import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { Navigation, Footer } from "@/components/navigation";
export const metadata: Metadata = {
  title: {
    default: "Nexus AI — Espacio para tus mejores ideas",
    template: "%s · Nexus AI",
  },
  description:
    "Explora un espacio de productividad con herramientas de escritura, síntesis y planificación. Demo interactiva con lógica local, sin conexión a modelos de IA.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
