export interface ErrorModel {
  id: string;
  desc: string;
}

export interface ValidateResult {
  hasErrors: boolean;
  errors: string[];
}
