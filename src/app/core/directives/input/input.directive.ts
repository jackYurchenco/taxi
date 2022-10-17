import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: `[appInput]`
})
export class InputDirective implements OnInit, OnDestroy {
  @Output() changeValue: EventEmitter<any>;
  private _subscriptions: Subscription;
  constructor(private _el: ElementRef) {
    this._subscriptions = new Subscription();
    this.changeValue = new EventEmitter<any>();
  }


  ngOnInit(): void {
    this._subscriptions.add(
			fromEvent(this._el.nativeElement, `keydown`).pipe(
        debounceTime(250),
        distinctUntilChanged()
      ).subscribe((event) => {
        this.changeValue.emit(event);
      })
		);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
