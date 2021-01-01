import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFreindsComponent } from './search-freinds.component';

describe('SearchFreindsComponent', () => {
  let component: SearchFreindsComponent;
  let fixture: ComponentFixture<SearchFreindsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFreindsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFreindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
