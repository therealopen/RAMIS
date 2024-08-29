import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL = `http://localhost:8089/`

  constructor(private http: HttpClient) { }

  getAllData(id: string): Observable<any> {
    return this.http.get('http://localhost:8089/api/student/'+ id);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}student/create`, data);
  }

  updateData(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseURL}student/update/${id}`, data);
  }

  updatePass(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseURL}users/update/${id}`, data);
  }


  singleStudent(id: any){
    return this.http.get('http://localhost:8089/api/student/'+id);
  }
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}api/student/${id}`);
  }
  getAllEmail(id: string): Observable<any> {
    return this.http.get('http://localhost:8089/api/student/'+ id);
  }

  postLoginUser(data: any): Observable<any> {
    return this.http.post('http://localhost:8089/users/login',data);
  }

  postStudentUser(data: any): Observable<any> {
    return this.http.post('http://localhost:8089/student/login',data);
  }


}
