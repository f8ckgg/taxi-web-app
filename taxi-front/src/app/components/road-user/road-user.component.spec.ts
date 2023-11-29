import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadUserComponent } from './road-user.component';

describe('RoadUserComponent', () => {
  let component: RoadUserComponent;
  let fixture: ComponentFixture<RoadUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
