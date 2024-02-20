export interface AuthAction {
  [key: string]: {
    description: string;
    title: string;
  };
};

export interface VerificationInterface {
  [key: string]: {
    description: string;
    title: string;
    icon: string;
    alt: string;
  };
};

export interface PasswordResetValidationError {
  emailNotFound: boolean;
};

export interface SignInValidationError {
  wrongPassword: boolean;
  invalidEmail: boolean;
};

export interface SignUpValidationError {
  unacceptablePassword: boolean;
  differentPasswords: boolean;
  invalidEmail: boolean;
};

export interface SignInCredentials {
  password: string;
  email: string;
};

export interface SignUpCredentials {
  confirmPassword: string;
  acceptTerms: boolean;
  fullName: string;
  password: string;
  email: string;
};

export interface EmailVerificationCredentials {
  confirmationCode: Array<string>;
  resendCode: boolean;
  email: string;
};

export interface VerificationErrorPayload {
  unknownError?: boolean;
  invalidCode?: boolean;
  expiredCode?: boolean;
  expiredLink?: boolean;
  OTPError?: boolean;
};

export interface IsVerifyingPayload {
  usingLink?: boolean;
  usingCode?: boolean;
};

export interface ModalState {
  isVerifying: {
    usingLink: boolean;
    usingCode: boolean;
  };
  verificationStatus: string;
  isVerified: boolean;
  verificationError: {
    unknownError: boolean;
    invalidCode: boolean;
    expiredCode: boolean;
    expiredLink: boolean;
    OTPError: boolean;
  }
};