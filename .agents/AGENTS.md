# AGENTS.md — Pacho Showcase & Web Guidelines

Este documento define los estándares arquitectónicos y operativos para agentes de IA que trabajan en el repositorio **`pacho-app`** (Web oficial, Landing interactiva y Showcase).

## 🎯 Objetivo de la Web

`pacho-app` es la cara pública, didáctica y comercial de **Pacho**.
- **Audiencia objetivo**: Jóvenes y adultos (16-40 años), mobile-first. No solo parejas: amigos, compañeros de piso, hermanos, padres con hijos.
- **Tono**: Cercano, claro, visual y didáctico ("Las cuentas claras y el chocolate espeso").
- **Interactividad**: Incluye un **Emulador Espejo** que reproduce fielmente la experiencia visual de la app real utilizando un motor en memoria con datos ficticios (`mock-data.json`), sin persistencia de base de datos y reseteable al recargar.
- **Portal Técnico (Devs & Reclutadores)**: Sección secundaria y colapsable/dedicada que explica la arquitectura (FSD, React 19, Supabase, Flutter, Clean Architecture) sin abrumar al visitante común.
- **Preparación Comercial**: Modelo de datos preparado para planes de suscripción (Free vs Pro/Premium), pero sin proyectar botones ni pasarelas de pago en la UI hasta la fase comercial definitiva.

---

## 🏗️ Stack Tecnológico

- **Framework**: React 19 + TypeScript + Vite
- **Estilos**: Tailwind CSS + CSS Variables para Dark/Light mode
- **Iconografía**: Lucide React
- **Animaciones**: Framer Motion
- **Memoria persistente**: Engram (`.engram/config.json`)
- **Internacionalización**: i18n estricto (`src/locales/es.json` y `src/locales/en.json`). **Cero hardcodeo**.

---

## 📐 Estructura de Carpetas (`src/`)

```
src/
├── assets/          # Imágenes, logos, avatares e íconos de Pacho
├── components/
│   ├── layout/      # Header (Nav, theme toggle, lang toggle), Footer
│   ├── sections/    # Hero, AudienceTabs, EmulatorSection, PachoStories, TechPortal
│   ├── emulator/    # Mini-app espejo interactiva (Pantallas, Zurrón, AddExpense, Balances)
│   └── ui/          # Botones, tarjetas glassmorphism, modales, badges
├── context/         # ThemeContext (light/dark), I18nContext, EmulatorStateContext
├── data/            # mock-data.json (datos ficticios del emulador)
├── locales/         # es.json, en.json (100% del copy de la web)
├── types/           # emulator.ts, i18n.ts, pricing.ts, dev-showcase.ts
└── App.tsx
```

---

## 🔒 Reglas Invariables

1. **CERO Hardcoding**: Ningún texto en pantalla puede estar incrustado directamente en código TSX. Todo pasa por el hook de traducción `t('clave')` respaldado por `es.json` y `en.json`.
2. **Paridad de Idiomas**: Cada clave añadida en `es.json` DEBE existir con su traducción en `en.json`. Ejecutar `npm run i18n:check` para verificar.
3. **Modo Claro / Oscuro**: Todos los componentes deben respetar la clase `.dark` y los tokens semánticos de color.
4. **Emulador In-Memory**: Las operaciones del usuario en el emulador (crear gasto, cambiar de vista, simular saldo) modifican un estado React local alimentado por `mock-data.json`. No se envía nada al backend.
5. **Memoria Engram**: Registrar decisiones clave con `engram save` y consultar contexto con `engram context pacho-app`.
6. **Compuerta de Git y Commits**: Queda estrictamente prohibido ejecutar `git commit` o `git push` automáticamente. Siempre se debe redactar la propuesta completa del commit en el chat (título convencional y desglose de cambios) y esperar la aprobación explícita del usuario antes de ejecutar cualquier comando de Git. Autoría humana exclusiva sin `Co-Authored-By` ni menciones a IA.
