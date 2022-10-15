import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAccountNavigationComponent } from './register-account-navigation.component';

describe('RegisterAccountNavigationComponent', () => {
  let component: RegisterAccountNavigationComponent;
  let fixture: ComponentFixture<RegisterAccountNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAccountNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAccountNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
