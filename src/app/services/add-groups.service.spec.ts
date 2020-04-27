import { TestBed } from '@angular/core/testing';

import { AddGroupsService } from './add-groups.service';

describe('AddGroupsService', () => {
  let service: AddGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
