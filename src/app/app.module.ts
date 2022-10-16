import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpService } from './core/services/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/services/api.service';
import { MessagesService } from './core/services/messages.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import * as loading from './core/store/loading/loading.reducer';

@NgModule({
  declarations: [ 
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      loading: loading.reducer,
    }, {}),
    EffectsModule.forRoot([]),
		TranslateModule.forRoot({
			loader: {
        provide: TranslateLoader,
				useFactory: (http: HttpClient) => new TranslateHttpLoader(http, `./assets/i18n/`, `.json`),
        deps: [HttpClient],
			}
		}),
    ToastModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (appService: ApiService) => () => appService.load(),
      deps: [ApiService],
      multi: true
    },
    HttpService,
    MessagesService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
