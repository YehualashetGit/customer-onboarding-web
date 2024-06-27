import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Add this line
import { CustomerOnboardingComponent } from './onboarding.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';

@NgModule({
  declarations: [CustomerOnboardingComponent],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CustomerOnboardingComponent],
  providers: [],

})
export class CustomerOnboardingModule { }
