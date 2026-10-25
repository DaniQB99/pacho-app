---
name: vercel-react-best-practices
description: Directrices de optimización de rendimiento para React de Vercel Engineering. Usar al escribir, revisar o refactorizar código React para asegurar patrones de rendimiento óptimos. Se activa en tareas que involucren componentes React, obtención de datos, optimización de bundle o mejoras de rendimiento.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# Buenas Prácticas de React (Vercel)

Guía completa de optimización de rendimiento para aplicaciones React, mantenida por Vercel. Contiene 70 reglas en 8 categorías, priorizadas por impacto para guiar la refactorización automatizada y generación de código.

## Cuándo Aplicar

Consulta estas directrices cuando:
- Escribas nuevos componentes React
- Implementes obtención de datos (cliente o servidor)
- Revises código buscando problemas de rendimiento
- Refactorices código React existente
- Optimices tamaño del bundle o tiempos de carga

## Categorías de Reglas por Prioridad

| Prioridad | Categoría | Impacto | Prefijo |
|-----------|-----------|---------|---------|
| 1 | Eliminar Cascadas (Waterfalls) | CRÍTICO | `async-` |
| 2 | Optimización de Bundle | CRÍTICO | `bundle-` |
| 3 | Rendimiento del Servidor | ALTO | `server-` |
| 4 | Obtención de Datos en Cliente | MEDIO-ALTO | `client-` |
| 5 | Optimización de Re-renders | MEDIO | `rerender-` |
| 6 | Rendimiento de Renderizado | MEDIO | `rendering-` |
| 7 | Rendimiento JavaScript | BAJO-MEDIO | `js-` |
| 8 | Patrones Avanzados | BAJO | `advanced-` |

## Referencia Rápida

### 1. Eliminar Cascadas (CRÍTICO)

- `async-cheap-condition-before-await` - Verificar condiciones síncronas baratas antes de hacer await
- `async-defer-await` - Mover el await a las ramas donde realmente se usa
- `async-parallel` - Usar Promise.all() para operaciones independientes
- `async-dependencies` - Usar better-all para dependencias parciales
- `async-api-routes` - Iniciar promesas temprano, hacer await tarde en rutas API
- `async-suspense-boundaries` - Usar Suspense para transmitir contenido por streaming

### 2. Optimización de Bundle (CRÍTICO)

- `bundle-barrel-imports` - Importar directamente, evitar archivos barrel
- `bundle-analyzable-paths` - Preferir rutas de importación analizables estáticamente para evitar bundles amplios
- `bundle-dynamic-imports` - Usar importación dinámica para componentes pesados
- `bundle-defer-third-party` - Cargar analytics/logging después de la hidratación
- `bundle-conditional` - Cargar módulos solo cuando la funcionalidad está activada
- `bundle-preload` - Precargar en hover/focus para velocidad percibida

### 3. Rendimiento del Servidor (ALTO)

- `server-auth-actions` - Autenticar acciones del servidor como rutas API
- `server-cache-react` - Usar React.cache() para deduplicación por request
- `server-cache-lru` - Usar caché LRU para cacheo entre requests
- `server-dedup-props` - Evitar serialización duplicada en props RSC
- `server-hoist-static-io` - Elevar I/O estático (fuentes, logos) a nivel de módulo
- `server-no-shared-module-state` - Evitar estado mutable a nivel de módulo en RSC/SSR
- `server-serialization` - Minimizar datos pasados a componentes cliente
- `server-parallel-fetching` - Reestructurar componentes para paralelizar fetches
- `server-parallel-nested-fetching` - Encadenar fetches anidados por elemento en Promise.all
- `server-after-nonblocking` - Usar after() para operaciones no bloqueantes

### 4. Obtención de Datos en Cliente (MEDIO-ALTO)

- `client-swr-dedup` - Usar SWR para deduplicación automática de requests
- `client-event-listeners` - Deduplicar event listeners globales
- `client-passive-event-listeners` - Usar listeners pasivos para scroll
- `client-localstorage-schema` - Versionar y minimizar datos en localStorage

### 5. Optimización de Re-renders (MEDIO)

- `rerender-defer-reads` - No suscribirse a estado que solo se usa en callbacks
- `rerender-memo` - Extraer trabajo costoso en componentes memorizados
- `rerender-memo-with-default-value` - Elevar props no-primitivas por defecto
- `rerender-dependencies` - Usar dependencias primitivas en effects
- `rerender-derived-state` - Suscribirse a booleanos derivados, no a valores crudos
- `rerender-derived-state-no-effect` - Derivar estado durante render, no en effects
- `rerender-functional-setstate` - Usar setState funcional para callbacks estables
- `rerender-lazy-state-init` - Pasar función a useState para valores costosos
- `rerender-simple-expression-in-memo` - Evitar memo para primitivos simples
- `rerender-split-combined-hooks` - Separar hooks con dependencias independientes
- `rerender-move-effect-to-event` - Poner lógica de interacción en event handlers
- `rerender-transitions` - Usar startTransition para actualizaciones no urgentes
- `rerender-use-deferred-value` - Diferir renders costosos para mantener input responsivo
- `rerender-use-ref-transient-values` - Usar refs para valores transitorios frecuentes
- `rerender-no-inline-components` - No definir componentes dentro de componentes

### 6. Rendimiento de Renderizado (MEDIO)

- `rendering-animate-svg-wrapper` - Animar wrapper div, no el elemento SVG
- `rendering-content-visibility` - Usar content-visibility para listas largas
- `rendering-hoist-jsx` - Extraer JSX estático fuera de componentes
- `rendering-svg-precision` - Reducir precisión de coordenadas SVG
- `rendering-hydration-no-flicker` - Usar script inline para datos solo-cliente
- `rendering-hydration-suppress-warning` - Suprimir mismatches esperados
- `rendering-activity` - Usar componente Activity para mostrar/ocultar
- `rendering-conditional-render` - Usar ternario, no && para condicionales
- `rendering-usetransition-loading` - Preferir useTransition para estado de carga
- `rendering-resource-hints` - Usar React DOM resource hints para precarga
- `rendering-script-defer-async` - Usar defer o async en tags script

### 7. Rendimiento JavaScript (BAJO-MEDIO)

- `js-batch-dom-css` - Agrupar cambios CSS via clases o cssText
- `js-index-maps` - Construir Map para búsquedas repetidas
- `js-cache-property-access` - Cachear propiedades de objetos en bucles
- `js-cache-function-results` - Cachear resultados de funciones en Map a nivel de módulo
- `js-cache-storage` - Cachear lecturas de localStorage/sessionStorage
- `js-combine-iterations` - Combinar múltiples filter/map en un solo bucle
- `js-length-check-first` - Verificar longitud del array antes de comparación costosa
- `js-early-exit` - Retornar temprano de funciones
- `js-hoist-regexp` - Elevar creación de RegExp fuera de bucles
- `js-min-max-loop` - Usar bucle para min/max en vez de sort
- `js-set-map-lookups` - Usar Set/Map para búsquedas O(1)
- `js-tosorted-immutable` - Usar toSorted() para inmutabilidad
- `js-flatmap-filter` - Usar flatMap para mapear y filtrar en una pasada
- `js-request-idle-callback` - Diferir trabajo no crítico al tiempo idle del navegador

### 8. Patrones Avanzados (BAJO)

- `advanced-effect-event-deps` - No poner resultados de `useEffectEvent` en dependencias de effects
- `advanced-event-handler-refs` - Almacenar event handlers en refs
- `advanced-init-once` - Inicializar app una vez por carga de aplicación
- `advanced-use-latest` - useLatest para refs de callback estables

## Cómo Usar

Lee los archivos de reglas individuales para explicaciones detalladas y ejemplos de código:

```
rules/async-parallel.md
rules/bundle-barrel-imports.md
```

Cada archivo de regla contiene:
- Explicación breve de por qué importa
- Ejemplo de código incorrecto con explicación
- Ejemplo de código correcto con explicación
- Contexto adicional y referencias

## Documento Compilado Completo

Para la guía completa con todas las reglas expandidas: `AGENTS.md`
