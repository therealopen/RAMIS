import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'jquery';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit{
  // student: any;
  id: string = '';
  firstname: string = '';
  middlename: string = '';
  lastname: string = '';
  email: string = '';
  gender: string = '';
  block: string = '';
  floor: string = '';
  room: string = '';
  wing: string = '';
  phone: string = '';
  password: string = '';
  sessionName: string=''
  delmsg: string='';
  successfulLoginMessage: string='';

updateRoomForm:FormGroup;
  constructor(private http: HttpClient,
    private router: Router,  
    private userService: UsersService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private url: ActivatedRoute) {
    this.getAllStudent();
    this.updateRoomForm = this.fb.group({
      block: ['', Validators.required],
      floor: ['', Validators.required],
      room: ['', Validators.required],
      wing: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
ngOnInit(): void {
  this.getAllStudent();
  sessionStorage.getItem('email');

  //delete message
  const displayDeleteMessage = sessionStorage.getItem('displayDeleteMessage');
  if (displayDeleteMessage) {
    this.delmsg = 'Student Deleted Successfully';
    sessionStorage.removeItem('displayDeleteMessage');

    // Clear the message after 5 seconds
    setTimeout(() => {
      this.delmsg = '';
    }, 5000);
  }

  //message for success login
const displayLoginMessage = sessionStorage.getItem('displayLoginMessage');
if (displayLoginMessage) {
  this.successfulLoginMessage = 'logged in success!';
 sessionStorage.removeItem('displayLoginMessage');
 console.log(this.successfulLoginMessage);
  // Clear the message after 5 seconds
  setTimeout(() => {
    this.successfulLoginMessage = '';
  }, 5000);
}

}

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  student: any[] = [];
  currentPage = 1;
  itemsPerPage = 2; // Number of items to display per page

  role='';
  
  //getlist of students
  getAllStudent(): void {
    this.http.get('http://localhost:8089/api/student').subscribe(
      (resultData: any) => {
        //console.log('getAllStudent Method:',resultData);
        this.student = resultData.data;
        this.sessionName=sessionStorage.getItem('email') as string;
        
        this.currentPage = 1;
        this.itemsPerPage=5;
        
      },
      (error) => {
        //console.error('Error fetching student data:', error);
      }
    );
  }
//link register
reg(){
  this.router.navigateByUrl('register');
}
 //page
 
  // Get the data for the current page based on pagination
  get currentPageData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.student.slice(startIndex, endIndex);
  }

  // Go to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Go to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Calculate the total number of pages
  get totalPages(): number {
    return Math.ceil(this.student.length / this.itemsPerPage);
  } 

//starting delete  
students:any[]=[{id: '' }];
  deleteStudent(id: string) {
    this.http.delete(`http://localhost:8089/student/delete/${id}`).subscribe(
      (response: any) => {
        // Remove the deleted student from the array
        this.students = this.students.filter(student => student.id !== id);
        //delete session
        sessionStorage.setItem('displayDeleteMessage', 'true');
      
      },
      error => {
        console.error('Error deleting student:', error);
      }
    );
    location.reload()
  }

  //eddit
  editStudent(id: string) {
    this.http.delete(`http://localhost:8089/student/update/${id}`).subscribe(
      (response: any) => {
        // Remove the deleted student from the array
        this.students = this.students.filter(student => student.id !== id);
        //delete session
        sessionStorage.setItem('displayDeleteMessage', 'true');
      
      },
      error => {
        console.error('Error deleting student:', error);
      }
    );
  }

  updateRoomData(){
    console.log('updateRoom');
  }
//session roles
studentRole=sessionStorage.getItem('sessionStudent');
wardenRole=sessionStorage.getItem('sessionWarden');


}  
  