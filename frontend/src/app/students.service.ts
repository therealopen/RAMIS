import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}

  updateStudent(id: any) {
    return this.http.put('http://localhost:8089/student/update/',id);
  }

  listStudent() {
    return this.http.get('http://localhost:8089/api/student');
  }

  singleStudent(id: any) {
    return this.http.get('http://localhost:8089/api/student/'+id);
  }

  deleteStudent(id: any) {
    return this.http.delete('http://localhost:8089/student/delete/'+id);
  }

  addStudent(student:any) {
    return this.http.post('http://localhost:8089/student/create/',student);
  }
}
