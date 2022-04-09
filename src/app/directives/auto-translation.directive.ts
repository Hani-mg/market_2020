import { Directive, Output, ElementRef, Renderer, EventEmitter, OnInit } from '@angular/core';
@Directive({
  selector: '[appAutoTranslation]'
})
export class AutoTranslationDirective implements OnInit {

  constructor(public element: ElementRef, public renderer: Renderer) { 
    console.log('Hello Overslide Directive');
  }

  ngOnInit(){
    this.element.nativeElement.innerText += ' !!My new Text!!';
  }
}
