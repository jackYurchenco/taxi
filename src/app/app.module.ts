import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpService } from './core/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/services/api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (appService: ApiService) => () => appService.load(),
      deps: [ApiService],
      multi: true
    },
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
