import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatleComponent } from './batle.component';

describe('BatleComponent', () => {
  let component: BatleComponent;
  let fixture: ComponentFixture<BatleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
