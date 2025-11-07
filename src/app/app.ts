import { Component, signal } from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { KENDO_DRAGANDDROP } from '@progress/kendo-angular-utils';
import { KENDO_ICONS } from '@progress/kendo-angular-icons';
import { 
  envelopIcon, 
  uploadIcon, 
  commentIcon,
  SVGIcon 
} from '@progress/kendo-svg-icons';

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

@Component({
  selector: 'app-root',
  imports: [ButtonsModule, LayoutModule, KENDO_DRAGANDDROP, KENDO_ICONS],
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
  protected readonly canvasSteps = signal<CanvasStep[]>([]);
  protected readonly isDraggingOver = signal(false);

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
    if (this.selectedStep()?.id === step.id) {
      this.selectedStep.set(null);
    }
  }
}

