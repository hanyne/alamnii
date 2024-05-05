import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeParentComponent } from './liste-parent.component';

describe('ListeParentComponent', () => {
  let component: ListeParentComponent;
  let fixture: ComponentFixture<ListeParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
