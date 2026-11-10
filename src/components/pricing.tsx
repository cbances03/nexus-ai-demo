"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Minus, Sparkles } from "lucide-react";
import { plans } from "@/lib/data";
import { Modal, Toast } from "./ui";

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [compare, setCompare] = useState("Creator");
  const [interest, setInterest] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Escribe un nombre de al menos 2 caracteres.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Introduce un correo electrónico válido.");
      return;
    }
    setNotice(
      `Simulación completada para ${interest}. No se han enviado ni guardado tus datos.`,
    );
    setInterest("");
    setName("");
    setEmail("");
    setError("");
  }
  const rows: [string, string, string, string][] = [
    ["Herramientas demo", "4", "4", "4"],
    ["Historial local", "Incluido", "Incluido", "Incluido"],
    ["Proyectos organizados*", "—", "Incluido", "Incluido"],
    ["Exportación*", "—", "Incluido", "Incluido"],
    ["Espacios de equipo*", "—", "—", "Incluido"],
    ["Roles y permisos*", "—", "—", "Incluido"],
  ];
  return (
    <>
      <div className="billing-switch" aria-label="Periodicidad de precios">
        <button
          aria-pressed={!annual}
          className={!annual ? "active" : ""}
          onClick={() => setAnnual(false)}
        >
          Mensual
        </button>
        <button
          aria-pressed={annual}
          className={annual ? "active" : ""}
          onClick={() => setAnnual(true)}
        >
          Anual <span>Hasta −21%</span>
        </button>
      </div>
      <div className="pricing-grid">
        {plans.map((p) => (
          <article
            className={`plan-card ${p.name === "Creator" ? "featured" : ""}`}
            key={p.name}
          >
            {p.name === "Creator" && (
              <div className="plan-ribbon">
                <Sparkles size={13} /> PARA DAR FORMA A TUS IDEAS
              </div>
            )}
            <span className="eyebrow">{p.note}</span>
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <div className="plan-price">
              <span>US$</span>
              <strong>{annual ? p.annual : p.monthly}</strong>
              <span>/ mes</span>
            </div>
            <p className="billing-detail">
              {p.monthly === 0
                ? "Gratis en esta demostración"
                : annual
                  ? `US$${p.annual * 12} al año · precio ficticio`
                  : "Facturación mensual ficticia"}
            </p>
            {p.name === "Explorer" ? (
              <Link href="/dashboard" className="button button-secondary">
                {p.cta}
                <ArrowUpRight size={16} />
              </Link>
            ) : (
              <button
                className={
                  p.name === "Creator" ? "button" : "button button-secondary"
                }
                onClick={() => {
                  setInterest(p.name);
                  setError("");
                  setNotice("");
                }}
              >
                {p.cta}
                <ArrowUpRight size={16} />
              </button>
            )}
            <ul>
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={16} />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="subtle-note">
        Precios ilustrativos en USD. No hay cobros ni suscripciones. *Conceptos
        de producto no implementados en esta demo.
      </p>
      <section className="comparison">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">LOS DETALLES IMPORTAN</span>
            <h2>Encuentra tu espacio.</h2>
          </div>
          <label className="compare-select">
            Destacar plan
            <select
              value={compare}
              onChange={(e) => setCompare(e.target.value)}
            >
              {plans.map((p) => (
                <option key={p.name}>{p.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Tabla comparativa de planes, desplazable horizontalmente"
        >
          <table>
            <caption className="sr-only">
              Comparación de planes ficticios de Nexus AI
            </caption>
            <thead>
              <tr>
                <th scope="col">Funcionalidad</th>
                {plans.map((p) => (
                  <th
                    key={p.name}
                    scope="col"
                    className={compare === p.name ? "highlight-column" : ""}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  {row.slice(1).map((v, i) => (
                    <td
                      key={i}
                      className={
                        compare === plans[i].name ? "highlight-column" : ""
                      }
                    >
                      {v === "—" ? (
                        <Minus size={15} aria-label="No incluido" />
                      ) : (
                        v
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="faq">
        <div>
          <span className="eyebrow">ANTES DE EMPEZAR</span>
          <h2>
            Buenas preguntas.
            <br />
            Respuestas claras.
          </h2>
        </div>
        <div>
          {[
            [
              "¿Necesito una tarjeta o una cuenta?",
              "No. Todas las funciones implementadas en esta demo están disponibles sin registro, tarjeta ni pago.",
            ],
            [
              "¿Las respuestas vienen de una IA real?",
              "No. Son plantillas y reglas ejecutadas en tu navegador. Vector, por ejemplo, extrae frases del texto; no comprende ni evalúa su significado.",
            ],
            [
              "¿Qué ocurre al elegir un plan?",
              "Explorer abre el workspace. Los otros planes abren un formulario de interés simulado. No envía datos ni crea una suscripción.",
            ],
            [
              "¿Dónde se guarda mi historial?",
              "Solo en localStorage de este navegador. No se sincroniza entre dispositivos. Puedes borrarlo desde el workspace o desde los ajustes del navegador.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      {interest && (
        <Modal
          title={`Explora ${interest}`}
          close={() => {
            setInterest("");
            setError("");
          }}
        >
          <p className="modal-description">
            Formulario de demostración. No envía ni guarda información y no
            activa ningún plan.
          </p>
          <form onSubmit={submit} noValidate>
            <label className="field-label" htmlFor="interest-name">
              Nombre
            </label>
            <input
              className="field"
              id="interest-name"
              autoComplete="given-name"
              value={name}
              maxLength={80}
              onChange={(e) => setName(e.target.value)}
              aria-describedby={error ? "interest-error" : undefined}
              required
            />
            <label className="field-label" htmlFor="interest-email">
              Correo electrónico
            </label>
            <input
              className="field"
              id="interest-email"
              type="email"
              autoComplete="email"
              value={email}
              maxLength={160}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={error ? "interest-error" : undefined}
              required
            />
            {error && (
              <p className="form-error" id="interest-error" role="alert">
                {error}
              </p>
            )}
            <button className="button full-width" type="submit">
              Simular interés <ArrowUpRight size={16} />
            </button>
          </form>
        </Modal>
      )}
      <Toast message={notice} />
    </>
  );
}
