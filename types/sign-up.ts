export interface ValidationError {
  unacceptablePassword?: boolean;
  differentPasswords?: boolean;
  wrongPassword?: boolean;
  invalidEmail?: boolean;
};

export interface Credentials {
  confirmPassword?: string;
  acceptTerms?: boolean;
  fullName?: string;
  password?: string;
  email?: string;
};