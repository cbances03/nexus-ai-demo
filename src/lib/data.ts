import { Compass, Feather, Layers3, Code2 } from "lucide-react";
export const tools = [
  {
    id: "atlas",
    name: "Atlas",
    label: "Planifica con claridad",
    category: "Organización",
    icon: Compass,
    color: "violet",
    description:
      "Convierte una idea en un punto de partida: objetivos, tareas y próximos pasos.",
    prompt:
      "Organizar el lanzamiento de una newsletter de diseño en cuatro semanas",
    sample: "Un plan concreto para tu próximo gran proyecto.",
  },
  {
    id: "prism",
    name: "Prism",
    label: "Encuentra las palabras",
    category: "Escritura",
    icon: Feather,
    color: "blue",
    description:
      "Explora un borrador estructurado para comunicar tu propuesta con intención.",
    prompt:
      "Presentar un estudio de diseño que crea identidades para marcas sostenibles",
    sample: "De una página en blanco a una primera versión.",
  },
  {
    id: "vector",
    name: "Vector",
    label: "Quédate con lo esencial",
    category: "Análisis",
    icon: Layers3,
    color: "mint",
    description:
      "Extrae las primeras ideas de un texto y revisa su longitud en un solo lugar.",
    prompt:
      "El equipo lanzará la nueva web el lunes. Diseño revisará los componentes. Desarrollo comprobará el rendimiento. El viernes compartiremos los resultados.",
    sample: "Menos ruido. Más perspectiva.",
  },
  {
    id: "code",
    name: "Code",
    label: "Piensa en componentes",
    category: "Desarrollo",
    icon: Code2,
    color: "peach",
    description:
      "Consulta una guía local de revisión frontend para organizar tu implementación.",
    prompt: "Crear un formulario accesible con validación y estados de error",
    sample: "Una checklist para construir con criterio.",
  },
] as const;
export type ToolId = (typeof tools)[number]["id"];
export const toolIds: readonly string[] = tools.map((t) => t.id);
export const navigation = [
  { href: "/caracteristicas", label: "Características" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/precios", label: "Precios" },
];
export const plans = [
  {
    name: "Explorer",
    monthly: 0,
    annual: 0,
    description: "Un primer espacio para experimentar.",
    features: [
      "4 herramientas de demostración",
      "Historial en este navegador",
      "Plantillas de inicio",
    ],
    note: "Ideal para explorar",
    cta: "Explorar la demo",
  },
  {
    name: "Creator",
    monthly: 19,
    annual: 15,
    description: "Más espacio para tus proyectos e ideas.",
    features: [
      "Todo lo de Explorer",
      "Proyectos organizados*",
      "Exportación de contenido*",
      "Plantillas personalizadas*",
    ],
    note: "Para el trabajo de cada día",
    cta: "Me interesa Creator",
  },
  {
    name: "Studio",
    monthly: 49,
    annual: 39,
    description: "Una visión compartida para tu equipo.",
    features: [
      "Todo lo de Creator",
      "Espacios de equipo*",
      "Roles y permisos*",
      "Asistencia prioritaria*",
    ],
    note: "Para crear en equipo",
    cta: "Me interesa Studio",
  },
] as const;
