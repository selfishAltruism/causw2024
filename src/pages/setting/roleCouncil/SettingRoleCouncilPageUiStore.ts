import { makeAutoObservable } from 'mobx';

import {
  SearchUserModalUi,
  WithSearchUserModalUi,
} from '@/components/SearchUserModal/SearchUserModalUi';
import { UserRepoImpl as Repo } from '@/stores/repositories/UserRepo';

export class SettingRoleCouncilPageUiStore implements WithSearchUserModalUi {
  submitDisabled = true;
  target?: Model.User;

  searchUserModal = new SearchUserModalUi();

  constructor() {
    makeAutoObservable(
      this,
      {
        searchUserModal: false,
      },
      { autoBind: true },
    );
  }

  reset(): void {
    this.submitDisabled = true;
    this.target = undefined;
  }

  setTarget(target: Model.User): void {
    this.submitDisabled = false;
    this.target = target;
  }

  *update(target: Model.User, role: User.UserDto['role']): Generator {
    try {
      this.submitDisabled = true;
      yield Repo.updateRole(target.id, role);
      return { success: true } as StoreAPI;
    } catch (error) {
      return error;
    } finally {
      this.submitDisabled = false;
    }
  }
}

export const PageUiStoreImpl = new SettingRoleCouncilPageUiStore();
