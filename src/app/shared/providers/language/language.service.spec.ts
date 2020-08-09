import { TestBed } from '@angular/core/testing';

import { LanguageUpdateService } from './language.service';

describe('LanguageUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguageUpdateService = TestBed.get(LanguageUpdateService);
    expect(service).toBeTruthy();
  });
});
