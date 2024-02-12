import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegTallerComponent } from './reg-taller.component';

describe('RegTallerComponent', () => {
  let component: RegTallerComponent;
  let fixture: ComponentFixture<RegTallerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegTallerComponent]
    });
    fixture = TestBed.createComponent(RegTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
