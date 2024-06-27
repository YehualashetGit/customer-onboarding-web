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
  selectedFile: File | null = null;
  maxFileSize = 10 * 1024 * 1024; // 10 MB
  allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];


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
    if (this.onboardingForm.valid && this.selectedFile) {
      const formData = new FormData();
      Object.keys(this.onboardingForm.controls).forEach(key => {
        formData.append(key, this.onboardingForm.get(key)?.value);
      });
      formData.append('file', this.selectedFile);

      this.onboardingService.submitForm(formData).subscribe(
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.size <= this.maxFileSize && this.allowedFileTypes.includes(file.type)) {
      this.selectedFile = file;
      this.onboardingForm.patchValue({ file });
      this.onboardingForm.get('file')?.updateValueAndValidity();
    } else {
      this.selectedFile = null;
      this.onboardingForm.patchValue({ file: null });
      this.onboardingForm.get('file')?.setErrors({ invalidFile: true });
    }
  }

}
