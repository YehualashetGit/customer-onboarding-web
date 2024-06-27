import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerOnboardingService } from './onboarding.service';

@Component({
  selector: 'app-customer-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],

})
export class CustomerOnboardingComponent {
  onboardingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private onboardingService: CustomerOnboardingService

  ) {
    this.onboardingForm = this.fb.group({
      purpose: ['', Validators.required],
      companyName: ['', Validators.required],
      entityType: ['', Validators.required],
      businessActivity: ['', Validators.required],
      licenseRequirements: [''],
      countryOfIncorporation: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      dateOfIncorporation: ['', Validators.required],
      directorShareholders: ['', Validators.required],
      passportNumber: ['', Validators.required],
      designatedApplicant: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onBusinessActivityChange() {
    const businessActivity = this.onboardingForm.get('businessActivity')?.value;
    if (businessActivity === 'Banking') {
      this.onboardingForm.get('licenseRequirements')?.setValidators([Validators.required]);
    } else {
      this.onboardingForm.get('licenseRequirements')?.clearValidators();
    }
    this.onboardingForm.get('licenseRequirements')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.onboardingForm.valid) {
      this.onboardingService.submitForm(this.onboardingForm.value).subscribe(
        response => {
          console.log('Form submitted successfully', response);
          // Handle success response
        },
        error => {
          console.error('Error submitting form', error);
          // Handle error response
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
