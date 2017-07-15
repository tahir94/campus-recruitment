import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCVComponent } from './student-cv.component';

describe('StudentCVComponent', () => {
  let component: StudentCVComponent;
  let fixture: ComponentFixture<StudentCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
