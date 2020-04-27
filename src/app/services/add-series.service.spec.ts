import { TestBed } from '@angular/core/testing';

import { AddSeriesService } from './add-series.service';

describe('AddSeriesService', () => {
  let service: AddSeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
