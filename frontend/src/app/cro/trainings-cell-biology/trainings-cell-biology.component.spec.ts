import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsCellBiologyComponent } from './trainings-cell-biology.component';

describe('TrainingsCellBiologyComponent', () => {
  let component: TrainingsCellBiologyComponent;
  let fixture: ComponentFixture<TrainingsCellBiologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsCellBiologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingsCellBiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
