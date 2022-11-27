import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  @Input()
  autoFocus?: boolean;

  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    if (this.autoFocus) {
      this.host.nativeElement.focus();
    }
  }
}
