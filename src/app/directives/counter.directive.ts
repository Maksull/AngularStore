import { Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: "[counterOf]"
})
export class CounterDirective {
  public constructor(private container: ViewContainerRef, private template: TemplateRef<Object>) { }

  @Input("counterOf")
  public counter: number = 0;

  public ngOnChanges(changes: SimpleChanges) {
    this.container.clear();
    for (let i = 0; i < this.counter; i++) {
      this.container.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1));
    }
  }
}

class CounterDirectiveContext {
  public constructor(public $implicit: any) { }
}