---
name: accessibility
description: Auditar y mejorar la accesibilidad web siguiendo las directrices WCAG 2.2. Usar cuando se pida "mejorar accesibilidad", "auditoría a11y", "cumplimiento WCAG", "soporte para lectores de pantalla", "navegación por teclado" o "hacer accesible".
license: MIT
metadata:
  author: web-quality-skills
  version: "1.1"
---

# Accesibilidad (a11y)

Directrices completas de accesibilidad basadas en WCAG 2.2 y auditorías de accesibilidad de Lighthouse. Objetivo: hacer que el contenido sea utilizable por todos, incluyendo personas con discapacidades.

## Principios WCAG: POUR

| Principio | Descripción |
|-----------|-------------|
| **P**erceptible | El contenido puede percibirse a través de diferentes sentidos |
| **O**perable | La interfaz puede ser operada por todos los usuarios |
| **C**omprensible (Understandable) | El contenido y la interfaz son comprensibles |
| **R**obusto | El contenido funciona con tecnologías de asistencia |

## Niveles de conformidad

| Nivel | Requisito | Objetivo |
|-------|-----------|----------|
| **A** | Accesibilidad mínima | Debe cumplirse |
| **AA** | Cumplimiento estándar | Debería cumplirse (requisito legal en muchas jurisdicciones) |
| **AAA** | Accesibilidad mejorada | Deseable |

---

## Perceptible

### Alternativas de texto (1.1)

**Las imágenes requieren texto alternativo:**
```html
<!-- ❌ Falta el alt -->
<img src="chart.png">

<!-- ✅ Alt descriptivo -->
<img src="chart.png" alt="Bar chart showing 40% increase in Q3 sales">

<!-- ✅ Imagen decorativa (alt vacío) -->
<img src="decorative-border.png" alt="" role="presentation">

<!-- ✅ Imagen compleja con descripción larga -->
<figure>
  <img src="infographic.png" alt="2024 market trends infographic" 
       aria-describedby="infographic-desc">
  <figcaption id="infographic-desc">
    <!-- Descripción detallada -->
  </figcaption>
</figure>
```

**Los botones con íconos necesitan nombres accesibles:**
```html
<!-- ❌ Sin nombre accesible -->
<button><svg><!-- menu icon --></svg></button>

<!-- ✅ Usando aria-label -->
<button aria-label="Open menu">
  <svg aria-hidden="true"><!-- menu icon --></svg>
</button>

<!-- ✅ Usando texto visualmente oculto -->
<button>
  <svg aria-hidden="true"><!-- menu icon --></svg>
  <span class="visually-hidden">Open menu</span>
</button>
```

**Clase para ocultar visualmente:**
```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Contraste de color (1.4.3, 1.4.6)

| Tamaño de texto | Mínimo AA | Mejorado AAA |
|-----------------|-----------|--------------|
| Texto normal (< 18px / < 14px bold) | 4.5:1 | 7:1 |
| Texto grande (≥ 18px / ≥ 14px bold) | 3:1 | 4.5:1 |
| Componentes UI y gráficos | 3:1 | 3:1 |

```css
/* ❌ Bajo contraste (2.5:1) */
.low-contrast {
  color: #999;
  background: #fff;
}

/* ✅ Contraste suficiente (7:1) */
.high-contrast {
  color: #333;
  background: #fff;
}

/* ✅ Los estados de foco también necesitan contraste */
:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}
```

**No dependas solo del color:**
```html
<!-- ❌ Solo el color indica error -->
<input class="error-border">
<style>.error-border { border-color: red; }</style>

<!-- ✅ Color + ícono + texto -->
<div class="field-error">
  <input aria-invalid="true" aria-describedby="email-error">
  <span id="email-error" class="error-message">
    <svg aria-hidden="true"><!-- error icon --></svg>
    Please enter a valid email address
  </span>
</div>
```

### Alternativas de medios (1.2)

```html
<!-- Vídeo con subtítulos -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English" default>
  <track kind="descriptions" src="descriptions.vtt" srclang="en" label="Descriptions">
</video>

<!-- Audio con transcripción -->
<audio controls>
  <source src="podcast.mp3" type="audio/mp3">
</audio>
<details>
  <summary>Transcripción</summary>
  <p>Texto completo de la transcripción...</p>
</details>
```

---

## Operable

### Accesible por teclado (2.1)

**Toda la funcionalidad debe ser accesible por teclado:**
```javascript
// ❌ Solo maneja clic
element.addEventListener('click', handleAction);

// ✅ Maneja clic y teclado
element.addEventListener('click', handleAction);
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleAction();
  }
});
```

**Sin trampas de teclado.** Los usuarios deben poder navegar con Tab dentro y fuera de cada componente. Usa el [patrón de foco en modal](references/A11Y-PATTERNS.md#modal-focus-trap) para diálogos — el elemento nativo `<dialog>` maneja esto automáticamente.

### Foco visible (2.4.7)

```css
/* ❌ Nunca elimines los contornos de foco */
*:focus { outline: none; }

/* ✅ Usa :focus-visible para foco solo por teclado */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* ✅ O estilos de foco personalizados */
button:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 95, 204, 0.5);
}
```

### Foco no oscurecido (2.4.11) — nuevo en 2.2

Cuando un elemento recibe el foco del teclado, no debe quedar completamente oculto por otro contenido como headers fijos, footers o paneles superpuestos. En Nivel AAA (2.4.12), ninguna parte del elemento enfocado puede quedar oculta.

```css
/* ✅ Considerar headers fijos al hacer scroll hacia elementos enfocados */
:target {
  scroll-margin-top: 80px;
}

/* ✅ Asegurar que los elementos enfocados no queden detrás de barras fijas */
:focus {
  scroll-margin-top: 80px;
  scroll-margin-bottom: 60px;
}
```

### Enlaces de salto (2.4.1)

Proporciona un enlace de salto para que los usuarios de teclado puedan omitir la navegación repetitiva. Ver el [patrón de enlace de salto](references/A11Y-PATTERNS.md#skip-link) para el marcado y estilos completos.

### Tamaño del objetivo táctil (2.5.8) — nuevo en 2.2

Los objetivos interactivos deben medir al menos **24 × 24 píxeles CSS** (AA). Excepciones: enlaces de texto en línea, elementos donde el navegador controla el tamaño, y objetivos donde un círculo de 24px centrado en el cuadro delimitador no se superpone con otro objetivo.

```css
/* ✅ Tamaño mínimo del objetivo */
button,
[role="button"],
input[type="checkbox"] + label,
input[type="radio"] + label {
  min-width: 24px;
  min-height: 24px;
}

/* ✅ Tamaño cómodo del objetivo (recomendado 44×44) */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### Movimientos de arrastre (2.5.7) — nuevo en 2.2

Cualquier acción que requiera arrastre debe tener una alternativa de puntero simple (ej. botones, inputs). Ver el [patrón de movimientos de arrastre](references/A11Y-PATTERNS.md#dragging-movements) para un ejemplo de lista ordenable.

### Temporización (2.2)

```javascript
// Permitir a los usuarios extender los límites de tiempo
function showSessionWarning() {
  const modal = createModal({
    title: 'Session Expiring',
    content: 'Your session will expire in 2 minutes.',
    actions: [
      { label: 'Extend session', action: extendSession },
      { label: 'Log out', action: logout }
    ],
    timeout: 120000
  });
}
```

### Movimiento (2.3)

```css
/* Respetar la preferencia de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Comprensible

### Idioma de la página (3.1.1)

```html
<!-- ❌ Sin idioma especificado -->
<html>

<!-- ✅ Idioma especificado -->
<html lang="en">

<!-- ✅ Cambios de idioma dentro de la página -->
<p>The French word for hello is <span lang="fr">bonjour</span>.</p>
```

### Navegación consistente (3.2.3)

```html
<!-- La navegación debe ser consistente entre páginas -->
<nav aria-label="Main">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

### Ayuda consistente (3.2.6) — nuevo en 2.2

Si un mecanismo de ayuda (información de contacto, widget de chat, enlace a FAQ, opción de autoayuda) se repite en varias páginas, debe aparecer en el **mismo orden relativo** cada vez. Los usuarios que dependen de una ubicación consistente no deberían tener que buscar la ayuda en cada página.

### Etiquetas de formulario (3.3.2)

Cada input necesita una etiqueta asociada programáticamente. Ver el [patrón de etiquetas de formulario](references/A11Y-PATTERNS.md#form-labels) para ejemplos explícitos, implícitos e instruccionales.

### Manejo de errores (3.3.1, 3.3.3)

Anuncia los errores a los lectores de pantalla con `role="alert"` o `aria-live`, establece `aria-invalid="true"` en campos inválidos, y enfoca el primer error al enviar. Ver el [patrón de manejo de errores](references/A11Y-PATTERNS.md#error-handling) para el marcado y JS completos.

### Entrada redundante (3.3.7) — nuevo en 2.2

No obligues a los usuarios a volver a introducir información que ya proporcionaron en la misma sesión. Auto-completa desde pasos anteriores, o permite seleccionar valores previamente ingresados. Excepciones: re-confirmación de seguridad y contenido que ha expirado.

```html
<!-- ✅ Auto-rellenar dirección de envío desde facturación -->
<fieldset>
  <legend>Shipping address</legend>
  <label>
    <input type="checkbox" id="same-as-billing" checked>
    Same as billing address
  </label>
  <!-- Campos auto-completados cuando está marcado -->
</fieldset>
```

### Autenticación accesible (3.3.8) — nuevo en 2.2

Los flujos de login no deben depender de pruebas de función cognitiva (ej. recordar contraseña, resolver un puzzle) a menos que al menos una de estas opciones esté disponible:
- Un mecanismo de copiar-pegar o autocompletado
- Un método alternativo (ej. passkey, SSO, enlace por email)
- La prueba usa reconocimiento de objetos o contenido personal (solo AA; AAA elimina esta excepción)

```html
<!-- ✅ Permitir pegar en campos de contraseña -->
<input type="password" id="password" autocomplete="current-password">

<!-- ✅ Ofrecer alternativas sin contraseña -->
<button type="button">Sign in with passkey</button>
<button type="button">Email me a login link</button>
```

---

## Robusto

### Uso de ARIA (4.1.2)

**Preferir elementos nativos:**
```html
<!-- ❌ Rol ARIA en div -->
<div role="button" tabindex="0">Click me</div>

<!-- ✅ Botón nativo -->
<button>Click me</button>

<!-- ❌ Checkbox ARIA -->
<div role="checkbox" aria-checked="false">Option</div>

<!-- ✅ Checkbox nativo -->
<label><input type="checkbox"> Option</label>
```

**Cuando ARIA es necesario,** usa los roles y estados correctos. Ver el [patrón de tabs ARIA](references/A11Y-PATTERNS.md#aria-tabs) para un ejemplo completo de tablist.

### Regiones en vivo (4.1.3)

Usa regiones `aria-live` para anunciar cambios de contenido dinámico sin mover el foco. Ver el [patrón de regiones en vivo](references/A11Y-PATTERNS.md#live-regions-and-notifications) para el marcado y un helper `showNotification()`.

---

## Checklist de testing

### Testing automatizado
```bash
# Auditoría de accesibilidad con Lighthouse
npx lighthouse https://example.com --only-categories=accessibility

# axe-core
npm install @axe-core/cli -g
axe https://example.com
```

### Testing manual

- [ ] **Navegación por teclado:** Navegar con Tab por toda la página, usar Enter/Space para activar
- [ ] **Lector de pantalla:** Probar con VoiceOver (Mac), NVDA (Windows), o TalkBack (Android)
- [ ] **Zoom:** Contenido usable al 200% de zoom
- [ ] **Alto contraste:** Probar con el Modo de Alto Contraste de Windows
- [ ] **Movimiento reducido:** Probar con `prefers-reduced-motion: reduce`
- [ ] **Orden de foco:** Lógico y sigue el orden visual
- [ ] **Tamaño del objetivo:** Elementos interactivos cumplen el mínimo de 24×24px

Ver la [referencia de comandos de lector de pantalla](references/A11Y-PATTERNS.md#screen-reader-commands) para atajos de VoiceOver y NVDA.

---

## Problemas comunes por impacto

### Críticos (corregir inmediatamente)
1. Etiquetas de formulario faltantes
2. Texto alternativo de imagen faltante
3. Contraste de color insuficiente
4. Trampas de teclado
5. Sin indicadores de foco

### Serios (corregir antes del lanzamiento)
1. Idioma de página faltante
2. Estructura de encabezados faltante
3. Texto de enlace no descriptivo
4. Medios con reproducción automática
5. Enlaces de salto faltantes

### Moderados (corregir pronto)
1. Etiquetas ARIA faltantes en íconos
2. Navegación inconsistente
3. Identificación de errores faltante
4. Temporización sin controles
5. Regiones landmark faltantes

## Referencias

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Deque axe Rules](https://dequeuniversity.com/rules/axe/)
- [Referencia de criterios WCAG](references/WCAG.md)
- [Patrones de código de accesibilidad](references/A11Y-PATTERNS.md)
