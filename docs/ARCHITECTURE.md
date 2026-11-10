# Arquitectura

Next.js App Router con páginas de presentación en Server Components y límites de cliente para navegación, animación, catálogo, precios y dashboard. TypeScript estricto. Tailwind CSS 4 disponible con tokens y estilos de producto en globals.css. Sin API, base de datos, autenticación ni variables de entorno necesarias.

## Módulos

- `src/lib/data.ts`: catálogo tipado, navegación y planes ilustrativos.
- `src/lib/chat.ts`: tipos, ejemplo, validación de estructura y lógica determinista de respuestas.
- `src/hooks/use-workspace.ts`: adaptador de almacenamiento con useSyncExternalStore, snapshot de servidor estable y fallback de pestaña si falla la escritura.
- `src/components/dashboard.tsx`: selección de conversación y herramienta, editor, envío, estado temporal, copiado y eliminación.
- `src/components/ui.tsx`: revelados, diálogo nativo y anuncios.

## Datos

Clave: `nexus.workspace.v1`. Contiene conversaciones, mensajes y activeId. Hasta 30 conversaciones, hasta 100 mensajes por conversación y 2000 caracteres de entrada. El límite se valida antes de enviar; el lector valida estructura, herramientas permitidas y límites para recuperar almacenamiento corrupto sin renderizar objetos arbitrarios. Los datos se renderizan como texto; no se interpreta HTML ni Markdown.

Al enviar, se guarda el mensaje de usuario y luego, tras 650 ms, se calcula el resultado local. Esa espera es una animación de demostración, no latencia de un servicio. Durante ella se deshabilitan envío y cambios de conversación. Si se abandona la ruta, el temporizador se cancela y el mensaje ya enviado permanece, sin fingir una respuesta completada. No hay ejecución de código ni llamadas a modelos.

Atlas inserta el objetivo en un plan genérico; Prism lo inserta en una estructura de borrador; Vector cuenta palabras/caracteres y extrae las tres primeras frases; Code devuelve una checklist y una variación para formularios. No entienden semántica ni verifican hechos.

Cambios en la pestaña disparan un evento local para sincronizar suscripciones; el evento storage propaga cambios entre pestañas. No hay control de concurrencia transaccional entre múltiples pestañas: prevalece la última escritura.

## Seguridad y límites

El almacenamiento local es editable y visible para cualquier persona con acceso al navegador. No introducir secretos. La demo no ofrece aislamiento entre usuarios de un mismo perfil ni sincronización. Borrar el historial guarda una colección vacía; así no reaparece el ejemplo precargado. Si el navegador bloquea localStorage, se conserva una copia temporal en memoria y se informa al usuario.

El formulario de precios valida localmente y descarta los datos al completar la simulación. No envía peticiones de datos, no registra interés real y no crea suscripciones.

No se ha implementado backend, colaboración, exportación, autenticación ni pago. Son límites explícitos de la demo.
