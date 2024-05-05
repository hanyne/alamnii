import { TestBed } from '@angular/core/testing';

import { ProfesseurService } from './professor.service';

describe('ProfesseurService', () => {
  let service: ProfesseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
