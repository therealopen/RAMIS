import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudentComponent } from './register-warden-admin.component';

describe('RegisterStudentComponent', () => {
  let component: RegisterStudentComponent;
  let fixture: ComponentFixture<RegisterStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterStudentComponent]
    });
    fixture = TestBed.createComponent(RegisterStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
