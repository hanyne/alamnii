import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceParentComponent } from './espace-parent.component';

describe('EspaceParentComponent', () => {
  let component: EspaceParentComponent;
  let fixture: ComponentFixture<EspaceParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
