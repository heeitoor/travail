import { UserType } from 'src/app/shared/models';

export enum CreateComponentState {
  SHOW_FORM = 1,
  SUCCESS_INVITED = 2,
}

export interface CreateModel {
  email: string;
  name: string;
  type: UserType;
  workTypeId?: number;
}
