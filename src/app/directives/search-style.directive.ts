import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSearchStyle]'
})
export class SearchStyleDirective  {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '20px');
    this.renderer.setStyle(this.el.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '12px');
    this.renderer.setStyle(this.el.nativeElement, 'width', '15vw');
  }
}
