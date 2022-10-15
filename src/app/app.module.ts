import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpService } from './core/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/services/api.service';
import { MessagesService } from './core/services/messages.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [ 
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
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
