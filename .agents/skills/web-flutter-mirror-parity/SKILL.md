---
name: web-flutter-mirror-parity
description: Metodología y herramientas de auditoría en modo espejo entre la versión Web y Flutter Mobile de Pacho. Usar para validar paridad visual pixel-perfect, flujos de interacción completos, estados sincronizados, modales/sheets a pantalla completa, temas claro/oscuro e internacionalización.
license: MIT
metadata:
  author: wallet-ia-team
  version: "1.0"
---

# Modo Espejo: Auditoría de Paridad Web vs Flutter Mobile

Esta habilidad define el protocolo operativo y de herramientas para garantizar paridad absoluta tanto **visual** como **funcional e interactiva** entre la aplicación Web de Pacho (React 19 + TypeScript + Vite) y la aplicación Mobile (Flutter + Dart).

---

## 1. Principio Fundamental: No Solo Visual, Interacción Real

Una pantalla no está terminada si solo se ve igual en una captura estática. Toda funcionalidad debe ser verificada de punta a punta:

1. **Apertura y Cierre de Sheets/Modales**:
   - En Mobile, las hojas inferiores (`showModalBottomSheet` o `DraggableScrollableSheet`) deben poder expandirse **hasta arriba del todo** (pantalla completa o `maxChildSize: 0.95-1.0`), igual que las clases `.kebo-sheet` de la Web.
   - Jamás deben quedar trabadas a mitad de pantalla impidiendo ver los formularios o listas completas.
   - Deben responder tanto al botón `X` superior izquierdo, al gesto de deslizar hacia abajo (swipe down), y al botón físico/gesto de "Atrás".

2. **Acciones de Estado y Formularios**:
   - Los formularios deben permitir escribir, validar campos, guardar cambios y reflejar el nuevo estado inmediatamente sin recargar.
   - Los borrados críticos deben invocar el diálogo de doble confirmación (`PachoDoubleConfirmDialog` en Flutter, `DoubleConfirmModal` en Web).

3. **Tema Dinámico (Claro/Oscuro)**:
   - Al alternar el tema en Ajustes, **todos** los componentes, tarjetas, textos e iconos deben actualizarse de inmediato.
   - Queda prohibida la mezcla de colores (ej. fondo oscuro con textos grises ilegibles o fondos claros con tarjetas negras desfasadas).

4. **Internacionalización Dinámica**:
   - Al cambiar de idioma en Ajustes o durante el Tour, todos los textos y formatos numéricos/monetarios deben cambiar instantáneamente en los 6 idiomas (`es-ES`, `en-US`, `de-DE`, `fr-FR`, `it-IT`, `pt-PT`).

5. **Carga de Avatares y Recursos**:
   - El avatar del usuario debe cargar la URL real si existe.
   - En caso de error o URL nula, debe mostrar las iniciales con fondo degradado suave, nunca un cuadro roto o vacío.

---

## 2. Herramientas y Automatización

El repositorio cuenta con `scripts/mirror/mirror-runner.mjs` para orquestar la comparación automatizada.

### Arquitectura de Ejecución

- **Web**:
  - Servidor local en `http://localhost:5173`.
  - Conexión vía Chrome DevTools Protocol (CDP) en modo headless emulando viewport móvil (390x844 @2x).
  - Inyección de credenciales desde `exact_auth.json` (clave `wallet-ia-auth`).
- **Flutter Mobile**:
  - Emulador Android (`emulator-5554`) con resolución 1080x1920 (420dpi).
  - Captura y eventos táctiles vía `adb`:
    - Captura: `adb shell screencap -p /sdcard/temp.png && adb pull /sdcard/temp.png ...`
    - Taps: `adb shell input tap <x> <y>`
    - Swipes: `adb shell input swipe <x1> <y1> <x2> <y2> <duration>`

---

## 3. Checklist Obligatorio por Pantalla

Al abordar cualquier pantalla (Dashboard, Transacciones, Metas, Análisis, Ajustes):

- [ ] **Estructura de Cabeceras (Window Header Contract)**:
  - Botón de cierre o volver `X` / `<` arriba a la izquierda.
  - Título centrado horizontalmente.
  - Subtítulo descriptivo centrado debajo del título.
- [ ] **Tarjetas y Glassmorphism**:
  - Verificar que las tarjetas no tengan sombras o perspectivas 3D descalibradas que distorsionen los bordes.
- [ ] **Sheets Secundarios a Pantalla Completa**:
  - `isScrollControlled: true` obligatorio en Flutter.
  - Envolver contenido en `DraggableScrollableSheet` o altura calculada según `MediaQuery.of(context).size.height`.
- [ ] **Pruebas de Interacción**:
  - Tocar cada botón interactivo y verificar retroalimentación visual / háptica.
  - Comprobar que los modales se abren y se cierran limpiamente.
  - Modificar un dato y confirmar que el almacenamiento (Supabase / SecureStorage) y la interfaz se sincronizan.
- [ ] **Captura en Modo Espejo**:
  - Tomar captura Web y Mobile del mismo estado.
  - Documentar las discrepancias en un artefacto comparativo antes y después de aplicar correcciones.

---

## 4. Tabla Maestra de Tokens de Diseño (Web ➔ Flutter Mirror)

| Elemento / Propiedad | Especificación Web (CSS / TS) | Equivalente Flutter (Dart) | Regla Estricta |
| :--- | :--- | :--- | :--- |
| **Color Acento Base** | `#F71E5D` (`--accent-primary`) | `Color(0xFFF71E5D)` (`AppColors.accentPrimary`) | Rojo carmesí/fresa oficial de Pacho. |
| **Fondo Oscuro** | `#0A0B0E` (`--bg-primary`) | `Color(0xFF0A0B0E)` (`AppColors.bgPrimaryDark`) | Fondo de scaffold sin fugas. |
| **Tarjetas Oscuras** | `#14161F` / `#181A24` (`--bg-card`) | `Color(0xFF14161F)` (`AppColors.bgCardDark`) | Superficie base para cards y sheets. |
| **Superficie Elevada** | `#1E2130` / `#25283A` (`--bg-tertiary`) | `Color(0xFF1E2130)` (`AppColors.bgTertiaryDark`) | Inputs, chips y contenedores secundarios. |
| **Bordes Oscuros** | `rgba(255, 255, 255, 0.08 - 0.12)` | `Colors.white.withOpacity(0.08)` | Bordes sutiles de 1px. |
| **Fondo Claro** | `#F8F9FC` | `Color(0xFFF8F9FC)` | Fondo scaffold en tema claro. |
| **Tarjetas Claras** | `#FFFFFF` | `Colors.white` | Tarjetas limpias en tema claro. |
| **Efecto Arcoíris** | Prohibido (`02-DOCS/wiki/css-architecture.md`) | Prohibido | Cero sombras de colores neón; usar pastilla de 3.5px. |
| **Glassmorphism Blur** | `backdrop-filter: blur(20px)` | `ImageFilter.blur(sigmaX: 18, sigmaY: 18)` | Desenfoque en modales, sheets y overlays. |
| **Radio: Botones / Inputs** | `12px` - `14px` | `BorderRadius.circular(12)` o `14` | Consistencia en campos interactivos. |
| **Radio: Tarjetas / Cards** | `20px` - `24px` | `BorderRadius.circular(22)` | Bordes suaves en tarjetas de cuentas y métricas. |
| **Radio: Modales / Sheets** | `24px` - `28px` | `BorderRadius.vertical(top: Radius.circular(26))` | Curvatura superior de hojas y ventanas. |
| **Radio: Badges / Pills** | `9999px` | `BorderRadius.circular(999)` / `StadiumBorder` | Formato cápsula integral. |
| **Animaciones / Tiempos** | `150ms - 200ms` (`easeOutCubic`) | `Duration(milliseconds: 160)` (`Curves.easeOutCubic`) | Prohibidas físicas de rebote/resorte pesadas. |
| **Bloqueo Scroll / Drag** | `dragDirectionLock: true` | `ClampingScrollPhysics` / bloqueo de eje | El scroll vertical bloquea swipes horizontales. |
| **Textos / Localización** | Castellano peninsular (`es-ES.json`) | Mismas claves y textos en castellano de España | Prohibidos modismos latinoamericanos. |

---

## 5. Protocolo de Eficiencia de Tokens y Costes en Auditorías Visuales (OBLIGATORIO)

Las sesiones de comparación espejo con emuladores móviles y capturas de pantalla son propensas a consumir cientos de miles de tokens si no se ejecutan con disciplina técnica:

1. **Aviso Previo y Consentimiento**:
   - ANTES de iniciar cualquier ciclo de capturas, comandos ADB o navegación en emulador, el agente DEBE avisar al usuario sobre el número estimado de pantallas a inspeccionar y el volumen de contexto que generará.
2. **Selección de Modelo Asequible**:
   - Se DEBE requerir el uso de un modelo rápido, visual y de bajo costo (ej. Gemini 3.8 Flash o similar).
   - Queda TERMINANTEMENTE PROHIBIDO correr inspecciones visuales en bucle con modelos ultra-pesados con razonamiento extendido (Claude Opus con Thinking) salvo orden explícita e informada del usuario.
3. **Optimización de Capturas (Downscale & Reducción de Ruido)**:
   - Prohibido pasar capturas PNG nativas de 1080x1920 píxeles por cada tap o scroll intermedio.
   - Si se requiere inspección visual, redimensionar la imagen a un ancho máximo de 540px o convertir a JPEG comprimido.
   - Las verificaciones deben ser **por lote**: ejecutar la secuencia completa de comandos (abrir sheet, escribir, validar) y tomar UNA sola captura de verificación final.
4. **Pausa Obligatoria y Compactación por Pantalla**:
   - Tras completar la paridad de una pantalla o módulo (ej. Ajustes o Tour), el agente debe detenerse, reportar el estado y solicitar al usuario la ejecución de `/compact` antes de iniciar la siguiente pantalla. Jamás dejar crecer una sesión hasta miles de pasos sin compactar.

