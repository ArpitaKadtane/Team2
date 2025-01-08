import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBar2Component } from './nav-bar2.component';

describe('NavBar2Component', () => {
  let component: NavBar2Component;
  let fixture: ComponentFixture<NavBar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBar2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
