import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  constructor(private _httpClient:HttpClient) { }
  getProtocols():Observable<any>{
    return this._httpClient.get<any>("http://34.100.227.119:5001/api/cro_protocols")
  }
}