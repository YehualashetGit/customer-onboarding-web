import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerOnboardingService {

  private apiUrl = 'http://localhost:8080/api/registrations/submit'

  constructor(private http: HttpClient) { }

  submitForm(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
