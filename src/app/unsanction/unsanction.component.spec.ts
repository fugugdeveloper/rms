import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsanctionComponent } from './unsanction.component';

describe('UnsanctionComponent', () => {
  let component: UnsanctionComponent;
  let fixture: ComponentFixture<UnsanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsanctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
