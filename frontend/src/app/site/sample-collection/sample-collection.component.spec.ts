import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCollectionComponent } from './sample-collection.component';

describe('SampleCollectionComponent', () => {
  let component: SampleCollectionComponent;
  let fixture: ComponentFixture<SampleCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
