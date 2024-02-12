import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegTalleristaComponent } from './reg-tallerista.component';

describe('RegTalleristaComponent', () => {
  let component: RegTalleristaComponent;
  let fixture: ComponentFixture<RegTalleristaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegTalleristaComponent]
    });
    fixture = TestBed.createComponent(RegTalleristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
