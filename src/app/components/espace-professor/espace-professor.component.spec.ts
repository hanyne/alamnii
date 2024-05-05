import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceProfessorComponent } from './espace-professor.component';

describe('EspaceProfessorComponent', () => {
  let component: EspaceProfessorComponent;
  let fixture: ComponentFixture<EspaceProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceProfessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
