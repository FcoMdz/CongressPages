import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegConfComponent } from './reg-conf.component';

describe('RegConfComponent', () => {
  let component: RegConfComponent;
  let fixture: ComponentFixture<RegConfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegConfComponent]
    });
    fixture = TestBed.createComponent(RegConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
