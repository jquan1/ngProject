import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedgifsComponent } from './savedgifs.component';

describe('SavedgifsComponent', () => {
  let component: SavedgifsComponent;
  let fixture: ComponentFixture<SavedgifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedgifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedgifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
