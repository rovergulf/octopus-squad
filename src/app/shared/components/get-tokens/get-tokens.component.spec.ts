import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTokensComponent } from './get-tokens.component';

describe('GetTokensComponent', () => {
  let component: GetTokensComponent;
  let fixture: ComponentFixture<GetTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTokensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
