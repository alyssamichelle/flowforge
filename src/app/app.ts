import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_DRAGANDDROP, DragTargetDragEvent, DragTargetDragEndEvent, DragTargetDragStartEvent } from '@progress/kendo-angular-utils';
import { KENDO_ICONS } from '@progress/kendo-angular-icons';
import { SVGIcon, envelopIcon, uploadIcon, commentIcon } from '@progress/kendo-svg-icons';

interface WorkflowStep {
  id: number;
  name: string;
  description: string;
  svgIcon: SVGIcon;
  type: string;
  ariaLabel: string;
}

interface CanvasStep extends WorkflowStep {
  x: number;
  y: number;
}

interface Connection {
  id: string;
  fromStepId: number;
  toStepId: number;
}

@Component({
  selector: 'app-root',
  imports: [KENDO_LAYOUT, KENDO_BUTTONS, KENDO_DRAGANDDROP, KENDO_ICONS],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FlowForge');
  
  protected readonly availableSteps = signal<WorkflowStep[]>([
    {
      id: 1,
      name: 'Send Email',
      description: 'Send email notifications to recipients',
      svgIcon: envelopIcon,
      type: 'action',
      ariaLabel: 'Drag to add Send Email action to workflow'
    },
    {
      id: 2,
      name: 'Upload File',
      description: 'Upload files to cloud storage or servers',
      svgIcon: uploadIcon,
      type: 'action',
      ariaLabel: 'Drag to add Upload File action to workflow'
    },
    {
      id: 3,
      name: 'Post to Slack',
      description: 'Send messages to Slack channels or users',
      svgIcon: commentIcon,
      type: 'action',
      ariaLabel: 'Drag to add Post to Slack action to workflow'
    }
  ]);
  
  protected readonly selectedStep = signal<WorkflowStep | null>(null);
  protected readonly canvasSteps = signal<CanvasStep[]>([
    // Pre-populate with initial workflow steps
    {
      id: 1001,
      name: 'Send Email',
      description: 'Send email notifications to recipients',
      svgIcon: envelopIcon,
      type: 'action',
      ariaLabel: 'Send Email workflow step',
      x: 150,
      y: 100
    },
    {
      id: 1002,
      name: 'Upload File',
      description: 'Upload files to cloud storage or servers',
      svgIcon: uploadIcon,
      type: 'action',
      ariaLabel: 'Upload File workflow step',
      x: 400,
      y: 100
    },
    {
      id: 1003,
      name: 'Post to Slack',
      description: 'Send messages to Slack channels or users',
      svgIcon: commentIcon,
      type: 'action',
      ariaLabel: 'Post to Slack workflow step',
      x: 650,
      y: 100
    }
  ]);
  protected readonly isDraggingOver = signal(false);
  protected readonly draggedStepId = signal<number | null>(null);
  protected readonly dragStartPosition = signal<{ x: number; y: number } | null>(null);
  protected readonly connections = signal<Connection[]>([
    // Initial connections between steps
    { id: 'conn-1', fromStepId: 1001, toStepId: 1002 },
    { id: 'conn-2', fromStepId: 1002, toStepId: 1003 }
  ]);
  protected readonly connectingFrom = signal<CanvasStep | null>(null);
  protected readonly hoveredStep = signal<CanvasStep | null>(null);

  protected getDragData(step: WorkflowStep) {
    return () => {
      console.log('getDragData called for step:', step.name);
      return step;
    };
  }

  protected onDragPress(event: any): void {
    console.log('Drag press event:', event);
  }

  protected onDragRelease(event: any): void {
    console.log('Drag release event:', event);
  }

  protected onDragEnter(): void {
    console.log('✅ Drag entered canvas - drop zone active!');
    this.isDraggingOver.set(true);
  }

  protected onDragLeave(): void {
    console.log('❌ Drag left canvas');
    this.isDraggingOver.set(false);
  }

  protected onDrop(event: any): void {
    console.log('Drop event:', event);
    this.isDraggingOver.set(false);
    
    const step = event.dragData as WorkflowStep;
    console.log('Dropped step:', step);
    
    const dropTargetElement = event.dropTarget.element.nativeElement;
    const rect = dropTargetElement.getBoundingClientRect();
    
    // Calculate position relative to canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    console.log('Drop position:', { x, y });
    
    // Create a new canvas step with position
    const canvasStep: CanvasStep = {
      ...step,
      id: Date.now(), // Generate unique ID for canvas instance
      x,
      y
    };
    
    // Add to canvas
    this.canvasSteps.update(steps => [...steps, canvasStep]);
    console.log('Canvas steps:', this.canvasSteps());
  }

  protected selectCanvasStep(step: CanvasStep): void {
    this.selectedStep.set(step);
  }

  protected removeCanvasStep(step: CanvasStep): void {
    this.canvasSteps.update(steps => steps.filter(s => s.id !== step.id));
    // Remove any connections involving this step
    this.connections.update(conns => 
      conns.filter(c => c.fromStepId !== step.id && c.toStepId !== step.id)
    );
    if (this.selectedStep()?.id === step.id) {
      this.selectedStep.set(null);
    }
  }

  protected startConnection(step: CanvasStep, event: Event): void {
    event.stopPropagation();
    this.connectingFrom.set(step);
    console.log('Starting connection from:', step.name);
  }

  protected completeConnection(toStep: CanvasStep, event: Event): void {
    event.stopPropagation();
    const fromStep = this.connectingFrom();
    
    if (fromStep && fromStep.id !== toStep.id) {
      const connectionId = `conn-${Date.now()}`;
      const newConnection: Connection = {
        id: connectionId,
        fromStepId: fromStep.id,
        toStepId: toStep.id
      };
      
      // Check if connection already exists
      const exists = this.connections().some(
        c => c.fromStepId === fromStep.id && c.toStepId === toStep.id
      );
      
      if (!exists) {
        this.connections.update(conns => [...conns, newConnection]);
        console.log('Connection created:', fromStep.name, '->', toStep.name);
      }
    }
    
    this.connectingFrom.set(null);
  }

  protected cancelConnection(): void {
    this.connectingFrom.set(null);
  }

  protected onStepMouseEnter(step: CanvasStep): void {
    this.hoveredStep.set(step);
  }

  protected onStepMouseLeave(): void {
    this.hoveredStep.set(null);
  }

  protected getConnectionPath(connection: Connection): string {
    const fromStep = this.canvasSteps().find(s => s.id === connection.fromStepId);
    const toStep = this.canvasSteps().find(s => s.id === connection.toStepId);
    
    if (!fromStep || !toStep) return '';
    
    // Calculate center points of steps (accounting for offset)
    const fromX = fromStep.x;
    const fromY = fromStep.y;
    const toX = toStep.x;
    const toY = toStep.y;
    
    // Create a curved path
    const midX = (fromX + toX) / 2;
    const controlOffset = Math.abs(toX - fromX) * 0.3;
    
    return `M ${fromX} ${fromY} Q ${midX} ${fromY - controlOffset}, ${toX} ${toY}`;
  }

  protected deleteConnection(connection: Connection, event: Event): void {
    event.stopPropagation();
    this.connections.update(conns => conns.filter(c => c.id !== connection.id));
  }

  // Canvas step drag handlers for repositioning
  protected onCanvasStepDragStart(event: DragTargetDragStartEvent): void {
    console.log('Canvas step drag start', event);
    // Find which step is being dragged
    const target = (event as any).target || (event as any).element;
    if (!target) return;
    
    const canvasStep = target.closest ? target.closest('.canvas-step') : target;
    if (!canvasStep) return;

    const stepIndex = Array.from(canvasStep.parentElement?.children || [])
      .filter((el: any) => el.classList && el.classList.contains('canvas-step'))
      .indexOf(canvasStep);
    
    if (stepIndex >= 0) {
      const step = this.canvasSteps()[stepIndex];
      if (step) {
        this.draggedStepId.set(step.id);
        this.dragStartPosition.set({ x: step.x, y: step.y });
        console.log('Started dragging step:', step.name);
      }
    }
  }

  protected onCanvasStepDrag(event: DragTargetDragEvent): void {
    // Manual mode - we update positions ourselves
    const stepId = this.draggedStepId();
    if (!stepId) return;

    // Try to get coordinates from various possible event properties
    const clientX = (event as any).clientX || (event as any).pageX || 0;
    const clientY = (event as any).clientY || (event as any).pageY || 0;

    if (!clientX && !clientY) return;

    // Get canvas bounds
    const canvas = document.querySelector('.canvas-content') as HTMLElement;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const newX = clientX - canvasRect.left;
    const newY = clientY - canvasRect.top;

    // Update position in real-time
    this.canvasSteps.update(steps =>
      steps.map(s => s.id === stepId ? { ...s, x: newX, y: newY } : s)
    );
  }

  protected onCanvasStepDragEnd(event: DragTargetDragEndEvent): void {
    console.log('Canvas step drag ended', event);
    this.draggedStepId.set(null);
    this.dragStartPosition.set(null);
  }
}

