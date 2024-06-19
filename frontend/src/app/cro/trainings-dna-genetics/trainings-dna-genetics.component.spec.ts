import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsDnaGeneticsComponent } from './trainings-dna-genetics.component';

describe('TrainingsDnaGeneticsComponent', () => {
  let component: TrainingsDnaGeneticsComponent;
  let fixture: ComponentFixture<TrainingsDnaGeneticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsDnaGeneticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingsDnaGeneticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
