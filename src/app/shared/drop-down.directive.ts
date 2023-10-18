import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: "[appDropDown]"
})
export class DropDownDirective {

  constructor(
    private elRef: ElementRef,
    private rendered: Renderer2
  ) {
  }

  isOpen = false;

  @HostListener("click") clickOnDropDown() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.rendered.addClass(this.elRef.nativeElement, "active");
    } else {
      this.rendered.removeClass(this.elRef.nativeElement, "active");
    }
  }
}
