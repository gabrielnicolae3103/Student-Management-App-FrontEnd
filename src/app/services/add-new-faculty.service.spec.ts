import { TestBed } from '@angular/core/testing';

import { AddNewFacultyService } from './add-new-faculty.service';

describe('AddNewFacultyService', () => {
  let service: AddNewFacultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewFacultyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
