import Link from "next/link";
import { Orbit, ArrowLeft } from "lucide-react";
export default function NotFound() {
  return (
    <main id="contenido" className="container not-found">
      <Orbit size={55} />
      <span className="eyebrow">404 / FUERA DE ÓRBITA</span>
      <h1>Esta idea aún no existe.</h1>
      <p>La página que buscas no está en nuestro universo.</p>
      <Link href="/" className="button">
        <ArrowLeft size={16} /> Volver al inicio
      </Link>
    </main>
  );
}
