# FlowForge - Workflow Composer Application

A responsive workflow composer application built with Angular and Kendo UI for Angular components.

## Features

### 📐 Three-Panel Responsive Layout

The application uses the **Kendo UI Splitter component** to create a flexible, resizable three-panel layout:

#### 1. **Left Sidebar** - Available Workflow Steps
- Displays a collection of draggable workflow step cards
- Each card shows:
  - Step icon (emoji)
  - Step name
  - Description of functionality
- Resizable between 200px - 400px (default: 250px)
- Collapsible for more canvas space
- Scrollable content area

**Available Steps:**
- ▶️ **Start** - Initialize the workflow execution
- 🌐 **API Call** - Make HTTP requests to external services
- 🔄 **Data Transform** - Transform and map data between steps
- 🔀 **Condition** - Add conditional logic and branching
- 📧 **Email** - Send email notifications
- 💾 **Database Query** - Query and update database records

#### 2. **Center Canvas** - Workflow Builder
- Main workspace for building connected flows
- Grid background for visual alignment
- Canvas controls toolbar:
  - Zoom in/out buttons
  - Reset view button
- Placeholder with instructions when empty
- Responsive and scalable

#### 3. **Right Panel** - Properties & Configuration
- Displays properties of selected workflow steps
- Shows step details in a Kendo Card:
  - Step name (editable)
  - Description (editable textarea)
  - Type (read-only)
- Action buttons: Apply and Cancel
- Resizable between 250px - 500px (default: 300px)
- Collapsible to maximize canvas space
- Empty state when no step is selected

### 🎨 Kendo UI Components Used

- **Splitter** (`kendo-splitter`) - Main layout with resizable panes
- **SplitterPane** (`kendo-splitter-pane`) - Individual collapsible panels
- **Card** (`kendo-card`) - Step cards and properties display
- **CardHeader** (`kendo-card-header`) - Card titles and headers
- **CardBody** (`kendo-card-body`) - Card content areas
- **CardActions** (`kendo-card-actions`) - Action buttons
- **Button** (`kendoButton`) - Interactive buttons throughout the UI

### 🎯 Key Features

#### Responsive Design
- Adapts to different screen sizes
- Mobile-friendly with responsive header
- Collapsible sidebars for smaller screens
- Touch-friendly interface

#### Consistent Spacing & Theming
- Uses Kendo UI default theme
- Consistent padding and margins
- Professional color scheme
- Smooth transitions and hover effects

#### User Experience
- Visual feedback on interactions
- Hover effects on workflow step cards
- Smooth panel resizing
- Custom scrollbars for consistency
- Grid background for visual alignment

### 🚀 Getting Started

#### Prerequisites
```bash
Node.js 18+ and npm
```

#### Installation
```bash
npm install
```

#### Development Server
```bash
npm start
```

Navigate to `http://localhost:4200/` to view the application.

#### Build
```bash
npm run build
```

### 📁 Project Structure

```
src/app/
├── app.ts          # Main component with workflow step data
├── app.html        # Three-panel layout template
└── app.scss        # Comprehensive component styles
```

### 🛠️ Technologies

- **Angular 20.3** - Modern standalone component architecture
- **Kendo UI for Angular 20.1** - Professional UI component library
- **TypeScript 5.9** - Type-safe development
- **SCSS** - Advanced styling with variables

### 🎨 Styling Architecture

- **Global styles** (`src/styles.scss`) - Kendo theme and base styles
- **Component styles** (`app.scss`) - Scoped component styling
- **CSS Custom Properties** - Kendo theme variables
- **Responsive breakpoints** - Mobile (768px) and tablet (1024px)

### 🔄 State Management

Uses Angular Signals for reactive state:
- `availableSteps` - Collection of workflow step definitions
- `selectedStep` - Currently selected step for property editing
- `title` - Application title

### 📱 Responsive Breakpoints

- **Desktop** (1024px+) - Full three-panel layout
- **Tablet** (768px - 1024px) - Adjustable panels
- **Mobile** (<768px) - Stacked layout with collapsible panels

### 🎯 Next Steps

Future enhancements could include:
- Drag-and-drop functionality for workflow steps
- Canvas zoom and pan controls
- Step connections and flow visualization
- Save/load workflow configurations
- Real-time collaboration
- Workflow validation and testing
- Export/import workflows as JSON

### 📄 License

This project is a demonstration of Kendo UI for Angular components.

---

Built with ❤️ using Angular and Kendo UI for Angular
