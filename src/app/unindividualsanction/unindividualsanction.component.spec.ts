import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnindividualsanctionComponent } from './unindividualsanction.component';

describe('UnindividualsanctionComponent', () => {
  let component: UnindividualsanctionComponent;
  let fixture: ComponentFixture<UnindividualsanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnindividualsanctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnindividualsanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
