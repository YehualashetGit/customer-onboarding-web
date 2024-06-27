import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerOnboardingService {

  private apiUrl = 'https://your-api-url.com/api/onboarding';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  submitForm(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
