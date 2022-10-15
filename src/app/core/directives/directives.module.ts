import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonDirective } from "./button/button.directive";
import { InputDirective } from './input/input.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonDirective,
    InputDirective,
  ],
  exports: [
    ButtonDirective,
    InputDirective,
  ]
})

export class DirectivesModule {}
