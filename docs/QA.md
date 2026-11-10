# Validación de Nexus AI

Fecha: 2026-11-10. Entorno Windows, Node 22.19.0, npm 10.9.3. Producción local con Next.js 16.4.6 y React 19.3.0. Navegador: Microsoft Edge instalado, automatizado con Playwright 1.65.0.

## Resultados

| Control                  | Resultado                                                                      |
| ------------------------ | ------------------------------------------------------------------------------ |
| `npm run lint`           | Aprobado, cero warnings                                                        |
| `npm run typecheck`      | Aprobado                                                                       |
| `npm run build`          | Aprobado, cinco rutas principales y 404                                        |
| `npm run test:e2e`       | 36 pruebas aprobadas sobre servidor de producción, ejecución fuera del sandbox |
| axe WCAG 2 A/AA y 2.1 AA | Cero infracciones detectadas en cinco páginas, escritorio y móvil              |
| Consola y recursos HTTP  | Sin errores detectados en las cinco rutas principales durante las pruebas      |
| Responsive               | Sin overflow horizontal en rutas principales a 360, 390, 768, 1024 y 1440 px   |
| Movimiento reducido      | Scroll automático y animaciones desactivadas verificados                       |
| `npm audit --omit=dev`   | Cero vulnerabilidades conocidas                                                |

Escritorio: 1440 × 1000. Móvil: 390 × 844 con emulación táctil. También se verificaron anchos intermedios y mínimos. No se afirma cobertura de Safari, Firefox ni dispositivos físicos.

## Flujos probados

Navegación entre páginas, entrada directa al dashboard con herramienta seleccionada, menú móvil con Escape y retorno de foco, ruta inexistente con recuperación. Filtros combinados, búsqueda, estado vacío y restablecimiento. Periodicidad mensual/anual, total anual y selección de columna de comparación.

Formulario: nombre y correo inválidos, envío simulado válido, cierre Escape y retorno de foco; sin peticiones POST durante la simulación.

Chat: mensaje vacío, respuesta local, cuatro herramientas, ejemplo editable, extracción de las tres primeras frases, persistencia tras recarga, cancelación y confirmación de eliminación, borrado de todo el historial, recuperación de almacenamiento corrupto y uso temporal cuando setItem está bloqueado.

Las capturas de landing y workspace se generan en test-results (ignorado por Git). Se revisaron visualmente la landing de escritorio y el workspace móvil. Hay copias de referencia en docs/preview.

## Problemas encontrados y corregidos

- Restricción de sockets del sandbox: resuelta usando comandos aprobados fuera de él, sin modificar autenticación.
- Contraste transitorio durante revelado: se eliminó la reducción de opacidad para conservar legibilidad durante la animación.
- Diálogo desconectado sin restauración de foco: se conserva y restaura explícitamente el disparador.
- Avisos de pruebas ambiguos por el anunciador de Next.js: se delimitan los avisos al contenido de la aplicación.
- Selector de prueba del menú con etiqueta cambiante: se admite la etiqueta de abrir y cerrar.
- Git detecta distinto propietario al ejecutar desde el usuario del sandbox: se usa safe.directory solo para el comando y la ruta exacta, sin cambiar configuración global.
- El runner dentro del sandbox mostró los casos aprobados pero no terminó correctamente al cerrar procesos. La ejecución final autorizada fuera del sandbox terminó con código 0 y 36 passed en 27.0 s.

## Dependencias y limitaciones

La auditoría completa detecta ocho avisos moderados en la cadena de desarrollo de typescript-eslint/minimatch. No afectan dependencias de producción según npm audit --omit=dev. La versión actual de typescript-eslint instala minimatch 10 afectado por GHSA-g3hv-75wg-m249. No se aplicó una sustitución mayor no validada ni una degradación de Next.js para ocultarlo.

ESLint 9.39.5 tiene aviso de fin de soporte, pero es compatible con los plugins de la versión instalada de Next.js. Se probó ESLint 10 y se retiró al comprobar peers incompatibles en plugins de React/import/accesibilidad. Actualizar cuando el conjunto del framework soporte la nueva versión, repitiendo lint y pruebas.

La revisión automática de accesibilidad no equivale a certificación ni a una auditoría completa con lector de pantalla. No se han medido Lighthouse ni Core Web Vitals en producción; no se atribuyen puntuaciones. Persistencia local sin sincronización, última escritura entre pestañas y cancelación de respuesta pendiente al salir de la ruta, documentadas en ARCHITECTURE.md.

## Publicación

Pendiente de autorización para crear un repositorio público nuevo y un proyecto Vercel. No hay URL pública creada ni verificada. La consulta de solo lectura al repositorio propuesto devolvió 404; no se modificó un repositorio existente.
