import { TestBed, inject } from '@angular/core/testing';

import { UserInfoDialogService } from './user-info-dialog.service';

describe('UserInfoDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoDialogService]
    });
  });

  it('should be created', inject([UserInfoDialogService], (service: UserInfoDialogService) => {
    expect(service).toBeTruthy();
  }));
});
