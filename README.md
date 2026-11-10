# Nexus AI

Demo SaaS de productividad, en español, con cuatro herramientas locales y una identidad visual propia. No hay un modelo de IA conectado, cuentas, pagos ni servicios de terceros para procesar mensajes.

## Desarrollo

Requisitos: Node.js 22.19 o compatible con Next.js 16.4; npm 10 o superior.

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. Las fuentes se sirven localmente; no se necesitan claves ni archivos .env.

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run start
```

Las pruebas Playwright usan Microsoft Edge instalado, ejecutan un servidor de producción en el puerto 3100 y cubren escritorio y móvil. Para otro navegador, cambiar `channel` en playwright.config.ts. En Linux CI, instalar el navegador compatible o configurar Chromium con `npx playwright install --with-deps chromium` y quitar `channel: msedge`. No se necesita descargar un navegador en Windows si Edge ya está instalado.

Para probar una URL desplegada en PowerShell:

```powershell
$env:PLAYWRIGHT_BASE_URL = 'https://URL-VERIFICADA'
npm run test:e2e
Remove-Item Env:PLAYWRIGHT_BASE_URL
```

La prueba de almacenamiento bloqueado reemplaza setItem únicamente dentro del contexto aislado del navegador de prueba. Los informes se escriben en playwright-report y test-results, ignorados por Git. `npm run test:report` abre el informe.

## Rutas y funciones

| Ruta                     | Contenido                                                               |
| ------------------------ | ----------------------------------------------------------------------- |
| `/`                      | Landing, vista interactiva del workspace, herramientas y recorrido      |
| `/caracteristicas`       | Funciones y límites de la experiencia                                   |
| `/herramientas`          | Catálogo con búsqueda y filtros combinados                              |
| `/precios`               | Precios ficticios mensual/anual, comparación, FAQ y formulario validado |
| `/dashboard`             | Historial, herramientas, mensajes locales, copiado y eliminación        |
| `/dashboard?tool=vector` | Acceso directo a una herramienta (atlas, prism, vector o code)          |

El historial incluye una conversación de ejemplo marcada. No se inventan usuarios, clientes, testimonios ni métricas de rendimiento. El resultado local de cada herramienta explica su método.

Persistencia: clave `nexus.workspace.v1` en localStorage. Se puede borrar desde el workspace con confirmación. El almacenamiento no se sincroniza entre dispositivos; con almacenamiento bloqueado, el modo temporal dura solo en la pestaña. El máximo de demo es 30 conversaciones y 100 mensajes por conversación.

## Tecnologías y organización

Next.js App Router, React, TypeScript estricto, Tailwind CSS, Motion, Lucide, fuentes variables autoalojadas, ESLint, Playwright y axe-core. Detalle de módulos y datos en [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md); tokens y composición en [docs/DESIGN.md](docs/DESIGN.md); validación en [docs/QA.md](docs/QA.md).

No hay dependencias compartidas con los otros proyectos del workspace. package-lock.json fija el árbol de dependencias reproducible.

## Publicación en GitHub y Vercel

Repositorio público: https://github.com/cbances03/nexus-ai-demo

URL pública verificada: https://nexus-ai-demo-beta.vercel.app

Vercel: equipo `c-3`, proyecto `nexus-ai-demo`, Node.js 22.x y rama de producción `main`. Repositorio GitHub conectado. Despliegue de producción y 36 pruebas E2E sobre la URL pública verificados el 2026-11-10, sin sesión ni bypass.

Para reproducir el despliegue en otra cuenta, importar el repositorio en Vercel con preset Next.js, Node.js 22.x, raíz del repositorio y comando de build `npm run build`. Conectar GitHub para despliegues de main. No se necesitan claves ni servicios adicionales. La creación de recursos en otra cuenta requiere la autorización de su propietario.

El proyecto utiliza el plan Hobby existente sin contratar extras. Conservar las verificaciones HTTPS, acceso público, navegación, rutas directas, consola, móvil y flujos E2E después de cambios funcionales.

## Mantenimiento

Trabajar en ramas; instalar con npm ci; ejecutar lint, typecheck, build y E2E antes de integrar en main. Al actualizar dependencias, revisar compatibilidad y npm audit y conservar el lockfile. Si cambia el esquema de historial, crear una migración y versionar la clave. Revisar el despliegue automático resultante de cada merge. Para retirar la demo, desactivar el proyecto desde Vercel con autorización del propietario.

## Recursos y licencia

Gráfico orbital, composición y favicon originales, creados para esta demo. No se utilizan imágenes ni marcas de terceros como contenido comercial. Lucide: licencia ISC. Manrope y Space Grotesk: SIL OFL 1.1, distribuidas por Fontsource. Los paquetes conservan sus licencias. La licencia del código de esta aplicación queda a decisión del propietario; no se concede una licencia pública automáticamente.
