import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConfComponent } from './list-conf.component';

describe('ListConfComponent', () => {
  let component: ListConfComponent;
  let fixture: ComponentFixture<ListConfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListConfComponent]
    });
    fixture = TestBed.createComponent(ListConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
