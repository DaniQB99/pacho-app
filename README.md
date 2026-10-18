![hero](assets/pacho-banner.jpg)

<h1 align="center">
  Pacho
  <br />
</h1>

<p align="center">
  Your Personal &amp; Shared Finance Companion
  <br />
  <br />
  <a href="https://pacho-app.vercel.app">Website</a>
  ·
  <a href="https://pacho-showcase.vercel.app">Live Demo</a>
</p>

<p align="center">
  <a href="https://supabase.com">
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </a>
  <a href="https://react.dev">
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  </a>
  <a href="https://vitejs.dev">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </a>
  <a href="https://www.typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://feature-sliced.design">
    <img src="https://img.shields.io/badge/Architecture-Feature--Sliced_Design-2ea44f?style=for-the-badge" alt="FSD Architecture" />
  </a>
  <a href="https://web.dev/progressive-web-apps">
    <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA Ready" />
  </a>
</p>

<p align="center">
  <sub>
    Built with clean architecture &amp; real-time cloud synchronization
    <br />
    <em>"Las cuentas claras y el chocolate espeso. Lleva tus finanzas a pachas sin líos."</em>
  </sub>
</p>

---

## About Pacho

**Pacho** is a modern, high-performance Progressive Web Application (PWA) designed to eliminate money friction for couples, housemates, and families. 

Traditional budgeting tools are either rigid spreadsheets or single-user expense trackers. Pacho introduces a **dual-ledger paradigm**: keep your personal accounts 100% private while syncing shared household expenses, rent, groceries, and common savings goals in real-time with your partner.

Engineered with production-grade architectural standards: **React 19**, **Feature-Sliced Design (FSD)**, **Supabase Realtime WebSockets**, strict **Row Level Security (RLS)**, and a **Liquid Glass** aesthetic powered by Framer Motion.

> 🔒 *Note: This is a public showcase & architectural case study repository. Core commercial source code is retained in the private production codebase.*

---

## Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🤝 Dual-Ledger &amp; Couple Linking</h3>
      <p>Instant couple synchronization via a secure 6-character code. Personal accounts remain completely isolated, while shared accounts replicate with sub-100ms latency.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🎯 3D Interactive Goals &amp; Budgets</h3>
      <p>Shared and individual savings targets with circular progress rings, multi-account allocation, deadline projections, and safe-to-spend estimations.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>📊 Visual Analytics &amp; Safe-to-Spend</h3>
      <p>Interactive donut breakdowns, monthly category spending trends, and real-time safe daily allowances to ensure smooth end-of-month finances.</p>
    </td>
    <td width="50%" valign="top">
      <h3>⚡ Ergonomic 3-Second Input</h3>
      <p>Custom numeric keypad, swipe-to-delete gestures, interactive 3D liquid card carousel, pull-to-refresh, and live cloud synchronization via Supabase.</p>
    </td>
  </tr>
</table>

---

## System &amp; Software Architecture

The application is structured around the **Feature-Sliced Design (FSD)** methodology, guaranteeing separation of concerns, high maintainability, and domain scalability.

<p align="center">
  <img src="assets/diagrams/architecture-diagram.svg" alt="Pacho System Architecture" width="100%" />
</p>

### Architectural Highlights

1. **Client Tier (PWA &amp; React 19)**:
   - **Feature-Sliced Design Layers**: Strict inward dependency flow (`app` &rarr; `pages` &rarr; `widgets` &rarr; `features` &rarr; `entities` &rarr; `shared`).
   - **Installable PWA**: Dedicated Web App Manifest for seamless home screen installation on iOS and Android with app-like standalone display.
   - **Modular CSS Tokens**: High-performance CSS custom properties without runtime overhead, strictly cataloged by section identifiers `[SEC-XX]`.
   - **6 Synchronized Locales**: Native multi-language support (ES, EN, DE, FR, IT, PT) verified by strict automated parity test harnesses.

2. **Backend &amp; Security Tier (Supabase BaaS &amp; PostgreSQL 15)**:
   - **Row Level Security (RLS)**: Enforces privacy at the database engine level. Private transactions are cryptographically blocked from non-owners; shared entries are accessible only by verified `partner_id` links.
   - **PostgreSQL Realtime**: Changes to shared accounts, transactions, or goals broadcast via WebSockets directly to the linked partner's device in under 100ms.
   - **JWT Auth &amp; Session Management**: Secure user identity handling, session renewal, and passwordless authentication flows.

3. **CI/CD &amp; Delivery Tier (Vercel)**:
   - Automated preview deployments, edge caching, asset compression (Brotli/Gzip), and global HTTPS termination at [pacho-app.vercel.app](https://pacho-app.vercel.app/).

---

## Architectural Flowchart (Mermaid)

```mermaid
flowchart TB
    classDef client fill:#161b22,stroke:#00DF89,stroke-width:2px,color:#fff
    classDef edge fill:#161b22,stroke:#3aa9d6,stroke-width:1.5px,color:#fff
    classDef backend fill:#161b22,stroke:#3ECF8E,stroke-width:2px,color:#fff
    classDef sublayer fill:#0d1117,stroke:#30363d,stroke-width:1px,color:#c9d1d9

    subgraph Client["📱 Progressive Web App (React 19 + Vite)"]
        direction TB
        AppLayer["App Layer: Providers, Router & index.css [SEC-XX]"]:::sublayer
        PagesLayer["Pages Layer: Dashboard, Transactions, Goals, Analytics"]:::sublayer
        WidgetsLayer["Widgets & Features: BottomNav, Dual Sync Engine, PachoCompanion"]:::sublayer
        EntitiesLayer["Entities & Shared: UI Tokens, Framer Motion Glass, 6 Locales"]:::sublayer
        PWALayer["PWA Engine: Web App Manifest & Service Worker Cache"]:::sublayer

        AppLayer --> PagesLayer
        PagesLayer --> WidgetsLayer
        WidgetsLayer --> EntitiesLayer
        EntitiesLayer -.-> PWALayer
    end

    subgraph Infra["🌐 Edge & Delivery"]
        VercelCDN["Vercel Global Edge Network\nCI/CD, CDN, Brotli & SSL"]:::edge
    end

    subgraph Backend["⚡ Supabase Backend (PostgreSQL 15)"]
        direction TB
        RLS["Row Level Security (RLS)\nPrivate vs Couple Scope Isolation"]:::sublayer
        Realtime["Realtime Engine (WebSockets)\nInstant Partner Balances Sync"]:::sublayer
        RelationalDB["Relational Schema\nProfiles, Accounts, Transactions, Budgets"]:::sublayer
        Auth["Supabase Auth (JWT & Session Token)"]:::sublayer

        Auth --> RLS
        RLS --> RelationalDB
        RelationalDB -.-> Realtime
    end

    Client -- "1. SPA Asset Delivery" --> Infra
    Client -- "2. HTTPS REST / RPC with JWT" --> RLS
    Realtime -- "3. WSS Live State Push (<100ms)" --> Client

    class Client client
    class Infra edge
    class Backend backend
```

---

## Design Philosophy &amp; Visual Identity

Pacho combines modern minimalism with ergonomic readability and expressive micro-interactions:

- **Emerald Green (`#00DF89`)**: Growth, security, and financial vitality.
- **Deep Obsidian (`#121214`)**: Premium dark-mode contrast with ergonomic eye relief.
- **Micro-Interactions**: Floating levitations, spring physics, and glassmorphic overlays.
- **Clarity &amp; Typography**: High-contrast typography paired with accessible financial breakdowns.

---

## Live Links &amp; Showcase

- 🚀 **Official Web Application**: [pacho-app.vercel.app](https://pacho-app.vercel.app/)  
- 📱 **Interactive Showcase &amp; Emulator**: [pacho-showcase.vercel.app](https://pacho-showcase.vercel.app/)

---

<p align="center">
  <sub>Pacho &copy; 2026 — Clean Architecture • High Performance • Shared Finances with Zero Stress.</sub>
</p>
