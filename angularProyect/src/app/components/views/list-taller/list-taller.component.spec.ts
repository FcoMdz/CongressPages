import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTallerComponent } from './list-taller.component';

describe('ListTallerComponent', () => {
  let component: ListTallerComponent;
  let fixture: ComponentFixture<ListTallerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTallerComponent]
    });
    fixture = TestBed.createComponent(ListTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
