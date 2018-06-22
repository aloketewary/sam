import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditTeacherInfoComponent } from './view-edit-teacher-info.component';

describe('ViewEditTeacherInfoComponent', () => {
  let component: ViewEditTeacherInfoComponent;
  let fixture: ComponentFixture<ViewEditTeacherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditTeacherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditTeacherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
