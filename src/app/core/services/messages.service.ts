import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: `root`
})
export class MessagesService {
  private _life: number;
  constructor(private _messageService: MessageService) {
    this._life = 3000;
  }


	private _message(severity: string, summary: string, detail: string, life: number) { // eslint-disable-line
		this._messageService.add({
      detail: detail,
      life: life,
      severity: severity,
      summary: summary
    });
	}

  success(code: number, msg: string) {
    this._message(`success`, `${code}`, msg, this._life);
    // this._translationService.stream(`Success`).subscribe((successLabel) => {
    //   this._translationService.stream(msg).subscribe((text) => {
    //     this._message(`success`, successLabel, text);
    //   }).unsubscribe();
    // }).unsubscribe();
	}

  error(code: number, msg: string) {
    this._message(`error`, `${code}`, msg, this._life);
    // this._translationService.stream(`Error`).subscribe((errorLabel) => {
    //   this._translationService.stream(value).subscribe((text) => {
    //     this._message(`error`, errorLabel, text);
    //   }).unsubscribe();
    // }).unsubscribe();
  }

  // errors(errors: Array<string>) {
  //   errors.forEach((message: string) => {
  //     this.error(message);
  //   });
  // }



}
