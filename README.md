# homepage

[![Vike](https://img.shields.io/badge/vike-646CFF?logo=vike)](https://vike.dev)
[![Vue](https://img.shields.io/badge/vue-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/node-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

A personal homepage built with Vike, Vue 3, and Tailwind CSS. It renders server-side and ships as a single Docker image served by the built-in Vike server.

## What's in the stack

**Vike + Vue 3** — The app is a Vike SSR application with a single page: a hero section and a projects grid rendered as interactive bubbles.

**Tailwind CSS** — Styles are authored directly in CSS with `@theme` tokens and custom properties.

**Docker** — A multi-stage `node:26-alpine` image builds the app and installs only production dependencies. The container runs `node ./dist/server/index.mjs`.

**GitHub Container Registry** — Every push to `main` builds and pushes `ghcr.io/nkvtd/homepage:latest` via GitHub Actions.

## Quick Start

### Run locally

```bash
git clone https://github.com/nkvtd/homepage.git && cd homepage
npm install
npm run dev     # development server
npm run build   # production build
node ./dist/server/index.mjs   # production server
```

### Deploy with Docker Compose

```bash
docker network create edge-proxy
docker compose up -d
```

The service joins the `edge-proxy` network so a Cloudflared tunnel on the same network can route traffic to it. No host ports are exposed.

## License

This project is licensed under the MIT License.
