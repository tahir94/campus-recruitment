import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStudentsComponent } from './all-students.component';

describe('AllStudentsComponent', () => {
  let component: AllStudentsComponent;
  let fixture: ComponentFixture<AllStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
