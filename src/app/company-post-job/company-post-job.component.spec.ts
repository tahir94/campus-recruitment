import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPostJobComponent } from './company-post-job.component';

describe('CompanyPostJobComponent', () => {
  let component: CompanyPostJobComponent;
  let fixture: ComponentFixture<CompanyPostJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPostJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPostJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
