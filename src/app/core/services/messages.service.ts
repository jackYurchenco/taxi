import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: `root`
})
export class MessagesService {
  private _life: number;
  constructor(
    private _messageService: MessageService,
    private _translateService: TranslateService
  ) {
    this._life = 5000;
  }

	private _message(severity: string, summary: string, detail: string, life: number) { // eslint-disable-line
		this._messageService.add({
      detail: detail,
      life: life,
      severity: severity,
      summary: summary
    });
	}

  success(code: number, msg: string, value?: string) {
    this._translateService.stream(msg, { value }).subscribe((text: string)=>{
      this._message(`success`, `${code}`, text, this._life);
    }).unsubscribe();
	}

  error(code: number, msg: string, value?: string) {
    this._translateService.stream(msg, { value }).subscribe((text: string)=>{
      this._message(`error`, `${code}`, text, this._life);
    }).unsubscribe();
  }
}
