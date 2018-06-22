import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLightBoxComponent } from './image-light-box.component';

describe('ImageLightBoxComponent', () => {
  let component: ImageLightBoxComponent;
  let fixture: ComponentFixture<ImageLightBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageLightBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLightBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
