import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadDriverComponent } from './road-driver.component';

describe('RoadDriverComponent', () => {
  let component: RoadDriverComponent;
  let fixture: ComponentFixture<RoadDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
