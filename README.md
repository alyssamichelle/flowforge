# Flowforge ⚙️

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.


**Flowforge** is a visual workflow composer built with Angular and Kendo UI.  
It lets you drag, connect, and configure actions—like “Send Email” or “Post to Slack”—to design end-to-end automation flows with accessibility and style baked in.

---

## 🚀 Overview

Flowforge turns process logic into something you can see and shape.

- 🎨 **Visual Layout** — Sidebar of draggable nodes, central canvas for connections, and a properties panel for configuration.  
- 🧠 **Smart UI Generation** — Built using the Telerik & Kendo UI MCP Tools (AI UI Generator).  
- ♿ **Accessible by Default** — Semantic structure, visible focus indicators, and WCAG-compliant contrast.  
- 🌗 **Theme-Aware** — Light and dark mode support out of the box.  
- 🔗 **Pluggable Nodes** — Easily extend the library of workflow steps with your own actions or integrations.

---
## 🧠 Built with the Agentic UI Generator

Flowforge’s foundation was created using the  
**[Telerik & Kendo UI Agentic UI Generator](https://www.telerik.com/kendo-angular-ui-develop/components/ai-tools/agentic-ui-generator/)** —  
an AI-powered tool that scaffolds Angular components, layouts, and bindings directly from natural language prompts.

Instead of manually writing imports, templates, or bindings, we described our layout in plain English:

> “Create a responsive Workflow Composer layout with a sidebar, a main canvas for connecting nodes, and a right-hand panel for properties.”

The generator produced the initial structure, component setup, and accessibility markup — all editable, human-readable Angular code.

We then extended it with:
- Custom drag-and-drop logic for workflow nodes  
- SVG-based connection rendering  
- A properties service for contextual node settings  

This hybrid approach shows how developers can **stay in control** while letting AI accelerate repetitive UI setup.

---

## 🧱 Architecture

src/
├─ app/
│ ├─ sidebar/ # draggable workflow steps
│ ├─ canvas/ # main canvas area for building flows
│ ├─ properties-panel/ # configure selected node
│ ├─ toolbar/ # undo / redo / save controls
│ └─ core/ # shared services, models, utils
├─ assets/
└─ styles/


## Built with:
- Angular v20+  
- Kendo UI for Angular Components  
- TypeScript, RxJS, and HTML Canvas /SVG for node connections  

---

## 🧑‍💻 Getting Started

### 1. Install dependencies
npm install

### 2. Run the app
ng serve

### 3. Open in browser
http://localhost:4200

### 💡 Example Workflow
- Drag Send Email from the sidebar onto the canvas.
- Connect it to Upload File and Post to Slack nodes.
- Adjust properties in the right panel (recipient, file path, message).
- Click Save Flow to persist your automation.

## 🧭 Roadmap
- Node grouping and zooming
- Import/export of flows (JSON format)
- Additional built-in actions (HTTP Request, Delay, Condition)
- Keyboard navigation for canvas
- Execution engine prototype

## 🧩 Contributing
- Fork the repo
- Create a feature branch: git checkout -b feat/new-node
- Commit your changes: git commit -m "Add new workflow node type"
- Push and open a Pull Request

## 🪄 About
Flowforge was created as part of the Telerik & Kendo UI MCP Tools showcase.
It demonstrates how AI-assisted UI generation can accelerate front-end development—turning ideas into working interfaces in seconds.

### License
- MIT © 2025 Progress Software – Demo Application