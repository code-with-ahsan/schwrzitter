import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchwrzeetComponent } from './schwrzeet.component';

describe('SchwrzeetComponent', () => {
  let component: SchwrzeetComponent;
  let fixture: ComponentFixture<SchwrzeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchwrzeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchwrzeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
