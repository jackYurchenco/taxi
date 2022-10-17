import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: `[appButton]`

})
export class ButtonDirective implements OnInit, OnDestroy {
  @Output() clickBtn: EventEmitter<any>;
  private _subscriptions: Subscription;

  constructor(private _el: ElementRef) {
    this._subscriptions = new Subscription();
    this.clickBtn = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this._subscriptions.add(
			fromEvent(this._el.nativeElement, `click`).pipe(
				throttleTime(500)
			).subscribe((event) => {
				this.clickBtn.emit(event);
			}
		));
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
