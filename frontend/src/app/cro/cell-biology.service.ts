import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class CellBiologyService {
  private apiUrl = 'http://localhost:5001/api/cell_biology_data/';
 
  private dnaGeneticsApiUrl = 'http://localhost:5001/api/dna_genetics_data/';
 
    private questionsApi = 'http://localhost:5001/api/'
 
  constructor(private http: HttpClient) { }
 
  getCellBiologyData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'pages');
  }
 
  getCellBiologyAccessmentData(id:any): Observable<any> {
    return this.http.get<any>(this.questionsApi+'questions/'+id);
  }
 
  getDnaGeneticsData(): Observable<any> {
    return this.http.get<any>(this.dnaGeneticsApiUrl + 'pages');
  }
 
  getDnaGeneticsAccessmentData(id:any): Observable<any> {
    return this.http.get<any>(this.questionsApi+'questions/'+id);
  }
 
}
 