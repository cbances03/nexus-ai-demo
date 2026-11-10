import { toolIds, type ToolId } from "./data";
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
export type Conversation = {
  id: string;
  title: string;
  tool: ToolId;
  messages: Message[];
  example?: boolean;
};
export type Workspace = {
  conversations: Conversation[];
  activeId: string | null;
};
export const storageKey = "nexus.workspace.v1";
export const initialWorkspace: Workspace = {
  activeId: "example",
  conversations: [
    {
      id: "example",
      title: "Una idea en cuatro pasos",
      tool: "atlas",
      example: true,
      messages: [
        {
          id: "example-u",
          role: "user",
          content: "Organizar una sesión creativa con el equipo",
        },
        {
          id: "example-a",
          role: "assistant",
          content:
            "PLAN DE EJEMPLO · ATLAS\n\n01 / Define una pregunta\n¿Qué queremos explorar en esta sesión?\n\n02 / Prepara el espacio\nReserva 30 minutos y reúne las referencias del equipo.\n\n03 / Abre posibilidades\nAnota ideas individuales y agrúpalas por afinidad.\n\n04 / Elige el siguiente paso\nSelecciona una propuesta y asigna una persona responsable.\n\nContenido ficticio precargado para mostrar la experiencia.",
        },
      ],
    },
  ],
};
export function isWorkspace(value: unknown): value is Workspace {
  if (!value || typeof value !== "object") return false;
  const w = value as Workspace;
  return (
    (typeof w.activeId === "string" || w.activeId === null) &&
    Array.isArray(w.conversations) &&
    w.conversations.length <= 30 &&
    w.conversations.every(
      (c) =>
        c &&
        typeof c.id === "string" &&
        typeof c.title === "string" &&
        c.title.length <= 100 &&
        toolIds.includes(c.tool) &&
        (c.example === undefined || typeof c.example === "boolean") &&
        Array.isArray(c.messages) &&
        c.messages.length <= 100 &&
        c.messages.every(
          (m) =>
            m &&
            typeof m.id === "string" &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string" &&
            m.content.length <= 12000,
        ),
    ) &&
    new Set(w.conversations.map((c) => c.id)).size === w.conversations.length &&
    (w.activeId === null || w.conversations.some((c) => c.id === w.activeId))
  );
}
export function reply(tool: ToolId, input: string): string {
  const text = input.trim();
  const topic = text.length > 180 ? text.slice(0, 180) + "…" : text;
  switch (tool) {
    case "atlas":
      return `PLAN INICIAL · ATLAS\n\nTu punto de partida\n«${topic}»\n\n01 / Define el resultado\nEscribe qué tendría que ocurrir para considerar este objetivo logrado. Elige un entregable verificable.\n\n02 / Divide el trabajo\n• Reúne contexto y referencias.\n• Prepara una primera versión pequeña.\n• Revisa esa versión con las personas implicadas.\n\n03 / Dale un lugar en la agenda\nAsigna una fecha y una persona responsable a cada tarea. Empieza por lo que desbloquee el resto.\n\n04 / Cierra el ciclo\nCompara el resultado con el objetivo y decide el siguiente paso.\n\nPlantilla local: adapta tiempos, tareas y responsables a tu proyecto.`;
    case "prism":
      return `BORRADOR ESTRUCTURADO · PRISM\n\nTema\n${topic}\n\nApertura sugerida\nToda buena propuesta empieza por una necesidad concreta. Queremos explorar una forma más clara y útil de abordarla.\n\nDesarrollo\nNuestra propuesta se centra en «${topic}». Explica aquí a quién ayuda, qué problema resuelve y qué la hace relevante. Añade un ejemplo real y evita afirmaciones que no puedas demostrar.\n\nCierre sugerido\nEl siguiente paso es sencillo: definir una primera versión y ponerla a prueba. ¿Qué te gustaría explorar primero?\n\nPlantilla local: este borrador inserta tu tema; no interpreta su significado.`;
    case "vector": {
      const sentences = text
        .split(/(?<=[.!?])\s+|\n+/)
        .map((s) => s.trim())
        .filter(Boolean);
      const words = text.split(/\s+/).length;
      return `EXTRACCIÓN DE TEXTO · VECTOR\n\n${words} palabras · ${text.length} caracteres\n\nPrimeras ${Math.min(3, sentences.length)} frases\n${sentences
        .slice(0, 3)
        .map((s) => `• ${s}`)
        .join(
          "\n",
        )}\n\nMétodo: separación por signos de puntuación y saltos de línea, conservando las primeras tres frases. No es un resumen semántico ni una verificación de hechos.`;
    }
    case "code":
      return `CHECKLIST FRONTEND · CODE\n\nObjetivo\n«${topic}»\n\n□ Define las entradas, salidas y estados del componente.\n□ Modela los datos con TypeScript estricto.\n□ Usa HTML semántico y etiquetas asociadas.\n□ Incluye estados de carga, vacío, éxito y error.\n□ Valida las entradas antes de actualizar el estado.\n□ Comprueba teclado, foco visible y lectura en móvil.\n□ Prueba el flujo principal y un caso de error.\n\n${/formulario|form|valid/i.test(text) ? "Para formularios: conecta cada error con aria-describedby y conserva los valores al fallar la validación." : "Antes de abstraer: construye el flujo más pequeño que resuelva tu objetivo y extrae componentes cuando haya una repetición clara."}\n\nChecklist local predefinida. No ejecuta, analiza ni genera código de forma inteligente.`;
  }
}
