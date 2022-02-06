import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewZeetComponent } from './new-zeet.component';

describe('NewZeetComponent', () => {
  let component: NewZeetComponent;
  let fixture: ComponentFixture<NewZeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewZeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewZeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
