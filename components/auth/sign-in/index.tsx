import PasswordResetModal from '@/components/auth/modals/password-reset';
import SignInForm from '@/components/auth/forms/sign-in';
import AuthLayout from '@/components/auth/layout';

const SignIn = () => (
  <AuthLayout authAction="signIn">
    <SignInForm />

    <PasswordResetModal />
  </AuthLayout>
);

export default SignIn;