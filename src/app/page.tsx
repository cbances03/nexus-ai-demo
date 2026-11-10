import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  LockKeyhole,
  Workflow,
  MousePointer2,
  Check,
  Orbit,
} from "lucide-react";
import { ProductPreview } from "@/components/product-preview";
import { Reveal, SectionTitle } from "@/components/ui";
import { tools } from "@/lib/data";
export default function Home() {
  return (
    <main id="contenido">
      <section className="hero container">
        <div className="hero-copy">
          <Link href="/herramientas" className="announcement">
            <span className="tiny-dot" /> Tu próxima idea empieza aquí{" "}
            <ArrowUpRight size={13} />
          </Link>
          <h1>
            Tu mente, con
            <br />
            más <span className="gradient-text">posibilidades.</span>
          </h1>
          <p>
            Un espacio para pensar, escribir y dar forma a lo que imaginas.
            Explora tus ideas con las herramientas de Nexus AI.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard" className="button">
              Explorar el workspace <ArrowUpRight size={17} />
            </Link>
            <Link href="#workspace" className="text-link">
              Ver cómo funciona <ArrowRight size={16} />
            </Link>
          </div>
          <div className="hero-notes">
            <span>
              <Check size={13} /> Sin registro
            </span>
            <span>
              <Check size={13} /> Sin tarjeta
            </span>
            <span>
              <Check size={13} /> Demo interactiva
            </span>
          </div>
        </div>
        <div className="orbital-art" aria-hidden="true">
          <div className="orbital-grid" />
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="orbit-ring ring-three" />
          <div className="orb-core">
            <Orbit size={94} strokeWidth={0.7} />
          </div>
          <span className="orbit-node node-a">
            <Sparkles size={20} />
          </span>
          <span className="orbit-node node-b">
            <Workflow size={19} />
          </span>
          <span className="orbit-node node-c">
            <MousePointer2 size={17} />
          </span>
          <div className="orbit-coordinate">IDEAS → POSIBILIDADES</div>
          <div className="orbit-badge">
            <span className="tiny-dot" /> Un universo de ideas
          </div>
        </div>
      </section>
      <div className="principles-strip container">
        <span>MENOS FRICCIÓN. MÁS CREACIÓN.</span>
        <div>
          <Sparkles size={17} /> Piensa en grande
        </div>
        <div>
          <Workflow size={17} /> Encuentra tu ritmo
        </div>
        <div>
          <LockKeyhole size={17} /> Explora sin cuentas
        </div>
      </div>
      <section className="section container" id="workspace">
        <Reveal>
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">01 / TU NUEVO PUNTO DE PARTIDA</span>
              <h2>
                Menos pestañas.
                <br />
                Más ideas en marcha.
              </h2>
            </div>
            <p>
              Cambia de perspectiva sin cambiar de espacio. Cuatro herramientas,
              una conversación a la vez.
            </p>
          </div>
          <ProductPreview />
        </Reveal>
      </section>
      <section className="section container">
        <Reveal>
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">
                02 / UNA HERRAMIENTA PARA CADA MOMENTO
              </span>
              <h2>De «¿y si…?» a «aquí está».</h2>
            </div>
            <Link href="/herramientas" className="text-link">
              Todas las herramientas <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="tool-grid">
            {tools.map((t, i) => (
              <Link
                href={`/dashboard?tool=${t.id}`}
                className={`tool-card ${t.color}`}
                key={t.id}
              >
                <div className="tool-card-top">
                  <span className={`tool-icon ${t.color}`}>
                    <t.icon size={23} />
                  </span>
                  <span className="card-index">0{i + 1}</span>
                </div>
                <span className="tool-category">{t.category}</span>
                <h3>
                  {t.name} <ArrowUpRight size={19} />
                </h3>
                <p>{t.description}</p>
                <span className="card-link">
                  Explorar herramienta <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="section container">
        <Reveal className="manifesto">
          <div>
            <span className="eyebrow">03 / DISEÑADO PARA TU FLUJO</span>
            <h2>
              La tecnología se siente mejor
              <br />
              cuando te deja <span>crear.</span>
            </h2>
            <p>
              Empieza con una pregunta. Dale contexto. Conserva lo que te sirva.
              Un recorrido sencillo para probar una nueva forma de trabajar.
            </p>
            <Link className="text-link" href="/caracteristicas">
              Conoce la experiencia <ArrowUpRight size={16} />
            </Link>
          </div>
          <ol className="steps">
            {[
              [
                "Elige tu perspectiva",
                "Planifica, escribe, sintetiza o revisa código.",
              ],
              [
                "Pon una idea sobre la mesa",
                "Prueba un ejemplo o escribe tu propio contexto.",
              ],
              [
                "Retoma donde lo dejaste",
                "Tus conversaciones se guardan en este navegador.",
              ],
            ].map(([title, text], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>
      <section className="section container">
        <SectionTitle
          eyebrow="SIN CAJAS NEGRAS"
          title="Una demo, con las cosas claras."
        />
        <div className="honesty-grid">
          <div>
            <LockKeyhole size={21} />
            <h3>Local por diseño</h3>
            <p>
              Los mensajes permanecen en el almacenamiento de este navegador. No
              se envían a un servidor.
            </p>
          </div>
          <div>
            <Sparkles size={21} />
            <h3>Simulación transparente</h3>
            <p>
              Las respuestas usan plantillas y reglas locales. No hay un modelo
              de inteligencia artificial conectado.
            </p>
          </div>
          <div>
            <Workflow size={21} />
            <h3>Libertad para experimentar</h3>
            <p>
              Sin cuenta, sin pagos y sin compromisos. Puedes borrar tus
              conversaciones desde el workspace.
            </p>
          </div>
        </div>
      </section>
      <section className="container final-cta">
        <div className="cta-glow" aria-hidden="true" />
        <span className="eyebrow">EL SIGUIENTE PASO ES TUYO</span>
        <h2>
          Haz espacio para
          <br />
          tu próxima gran idea.
        </h2>
        <Link href="/dashboard" className="button">
          Comenzar a explorar <ArrowUpRight size={17} />
        </Link>
        <p>Un workspace. Cuatro perspectivas. Muchas posibilidades.</p>
      </section>
    </main>
  );
}
