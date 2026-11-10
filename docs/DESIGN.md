# Nexus AI — sistema de diseño

Identidad: un espacio de pensamiento tranquilo con energía tecnológica. Orbitales originales representan perspectivas que se encuentran; no se usan fotografías, logos ajenos ni métricas comerciales inventadas.

## Tokens

| Uso                | Valor   |
| ------------------ | ------- |
| Fondo              | #090A10 |
| Superficie         | #11121C |
| Superficie elevada | #181925 |
| Texto              | #F2F1F8 |
| Texto secundario   | #A5A5B9 |
| Violeta principal  | #B9A2FF |
| Azul / Prism       | #87B5FF |
| Menta / Vector     | #89DACA |
| Melocotón / Code   | #F2B89B |

Tipografía: Space Grotesk Variable en títulos y marca, Manrope Variable en texto y controles, autoalojadas desde paquetes Fontsource. Ambas familias están bajo SIL Open Font License. Pesos variables; sin solicitudes a Google Fonts. Monoespaciada del sistema en índices.

Espaciado: base 4 px, con separación de secciones entre 40 y 64 px. Contenedor máximo de 1200 px, workspace de 1550 px. Breakpoints 768, 1024 y 1400 px; el contenido determina las adaptaciones. Verificar también 360, 390 y 768 px.

## Componentes y composición

- Navbar fija con navegación activa, menú móvil desplegable y Escape.
- Hero asimétrico con orbitales CSS y valor principal. Sin raster ni coste de descarga de imágenes.
- Vista de producto interactiva que permite cambiar herramienta antes de abrir el dashboard.
- Tarjetas de herramientas identificadas por nombre, icono y categoría, además del color.
- Catálogo con búsqueda combinada con filtros y estado vacío recuperable.
- Planes con periodicidad, tabla comparable y formulario de interés claramente simulado.
- Dashboard con historial lateral, bienvenida, mensajes, avisos de alcance y editor.
- Diálogos nativos: captura de foco, Escape, fondo modal y retorno al disparador.

Motion se limita a revelados discretos. Mensajes usan una entrada de 250 ms y el estado de espera emplea puntos animados. prefers-reduced-motion desactiva transiciones, animaciones y scroll suave.

## Accesibilidad y contenido

HTML semántico, un h1 por página, skip link, foco visible, etiquetas asociadas, mensajes de error con role alert, anuncios de estado con aria-live y tabla con encabezados. Las pruebas axe complementan los flujos de teclado; no sustituyen una auditoría humana completa con tecnologías de asistencia.

Los precios, planes y ejemplos son ficticios. Las capacidades no implementadas llevan asterisco y explicación visible. Nunca se presentan los resultados locales como una respuesta de un modelo de IA.
