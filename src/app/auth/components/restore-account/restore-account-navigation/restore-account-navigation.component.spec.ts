import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreAccountNavigationComponent } from './restore-account-navigation.component';

describe('RestoreAccountNavigationComponent', () => {
  let component: RestoreAccountNavigationComponent;
  let fixture: ComponentFixture<RestoreAccountNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoreAccountNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreAccountNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
