import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UssanctionComponent } from './ussanction.component';

describe('UssanctionComponent', () => {
  let component: UssanctionComponent;
  let fixture: ComponentFixture<UssanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UssanctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UssanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
