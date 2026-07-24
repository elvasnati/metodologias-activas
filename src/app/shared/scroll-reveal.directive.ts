import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private removeListeners: Array<() => void> = [];

  private readonly revealSelector = [
    '.section',
    '.section-heading',
    '.hero-copy',
    '.hero-media',
    '.about-heading',
    '.about-summary',
    '.about-content > h3',
    '.about-cards article',
    '.credentials',
    '.service-grid article',
    '.method-grid article',
    'blockquote'
  ].join(', ');

  private readonly interactiveSelector = [
    '.about-cards article',
    '.service-grid article',
    '.method-grid article'
  ].join(', ');

  private readonly titleSelector = [
    '.hero h1',
    '.section-heading h2',
    '.about-content > h3'
  ].join(', ');

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (!('IntersectionObserver' in window)) {
      this.revealElements().forEach((element) => {
        this.renderer.addClass(element, 'is-visible');
      });
      return;
    }

    const elements = this.revealElements();

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'is-visible');
          } else {
            this.renderer.removeClass(entry.target, 'is-visible');
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16
      }
    );

    elements.forEach((element, index) => {
      this.renderer.addClass(element, 'scroll-reveal');
      this.renderer.setStyle(element, '--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
      this.observer?.observe(element);
    });

    this.setupInteractiveMotion();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.removeListeners.forEach((removeListener) => removeListener());
  }

  private revealElements(): HTMLElement[] {
    return Array.from(this.elementRef.nativeElement.querySelectorAll<HTMLElement>(this.revealSelector));
  }

  private setupInteractiveMotion(): void {
    this.interactiveElements().forEach((element) => {
      this.renderer.addClass(element, 'interactive-motion');

      this.removeListeners.push(
        this.renderer.listen(element, 'pointermove', (event: PointerEvent) => {
          this.updateMotion(element, event, 7);
        })
      );

      this.removeListeners.push(
        this.renderer.listen(element, 'pointerleave', () => {
          this.resetMotion(element);
        })
      );
    });

    this.titleElements().forEach((element) => {
      this.renderer.addClass(element, 'interactive-title');

      this.removeListeners.push(
        this.renderer.listen(element, 'pointermove', (event: PointerEvent) => {
          this.updateMotion(element, event, 3);
        })
      );

      this.removeListeners.push(
        this.renderer.listen(element, 'pointerleave', () => {
          this.resetMotion(element);
        })
      );
    });
  }

  private interactiveElements(): HTMLElement[] {
    return Array.from(this.elementRef.nativeElement.querySelectorAll<HTMLElement>(this.interactiveSelector));
  }

  private titleElements(): HTMLElement[] {
    return Array.from(this.elementRef.nativeElement.querySelectorAll<HTMLElement>(this.titleSelector));
  }

  private updateMotion(element: HTMLElement, event: PointerEvent, intensity: number): void {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const tiltX = (x - 0.5) * intensity;
    const tiltY = (0.5 - y) * intensity;

    this.renderer.setStyle(element, '--tilt-x', `${tiltX.toFixed(2)}deg`);
    this.renderer.setStyle(element, '--tilt-y', `${tiltY.toFixed(2)}deg`);
    this.renderer.setStyle(element, '--glow-x', `${(x * 100).toFixed(1)}%`);
    this.renderer.setStyle(element, '--glow-y', `${(y * 100).toFixed(1)}%`);
  }

  private resetMotion(element: HTMLElement): void {
    this.renderer.setStyle(element, '--tilt-x', '0deg');
    this.renderer.setStyle(element, '--tilt-y', '0deg');
    this.renderer.setStyle(element, '--glow-x', '50%');
    this.renderer.setStyle(element, '--glow-y', '50%');
  }
}
