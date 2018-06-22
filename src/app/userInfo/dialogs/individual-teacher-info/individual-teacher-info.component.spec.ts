import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTeacherInfoComponent } from './individual-teacher-info.component';

describe('IndividualTeacherInfoComponent', () => {
  let component: IndividualTeacherInfoComponent;
  let fixture: ComponentFixture<IndividualTeacherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualTeacherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTeacherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
