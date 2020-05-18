/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecretaryService } from './secretary.service';

describe('Service: Secretary', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecretaryService]
    });
  });

  it('should ...', inject([SecretaryService], (service: SecretaryService) => {
    expect(service).toBeTruthy();
  }));
});
