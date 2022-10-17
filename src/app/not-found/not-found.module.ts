/* eslint-disable sort-keys */
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';


@NgModule({
  imports: [
    NotFoundRoutingModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    NotFoundComponent
  ],
  providers: [
	]
})
export class NotFoundModule {}
