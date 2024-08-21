import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  inject,
  Injectable,
  RendererFactory2,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private appRef = inject(ApplicationRef);
  private renderer2 = inject(RendererFactory2).createRenderer(null, null);

  showSnackbar(message: string, duration: number = 3000): void {
    // Dynamically create the SnackbarComponent
    const componentRef = createComponent(SnackbarComponent, {
      environmentInjector: this.appRef.injector,
    });
    componentRef.setInput('message', message);
    // Attach the component to the Angular component tree
    this.appRef.attachView(componentRef.hostView);
    // Get the DOM element

    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    // Append the DOM element to the body using Renderer2
    this.renderer2.appendChild(document.body, domElem);
    // Remove the snackbar after the duration
    setTimeout(() => {
      this.destroySnackbar(componentRef);
    }, duration);
  }

  private destroySnackbar(componentRef: ComponentRef<SnackbarComponent>): void {
    // Remove the component from the application
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
