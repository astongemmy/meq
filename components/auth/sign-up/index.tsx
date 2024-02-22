import SignUpForm from '@/components/auth/forms/sign-up';
import AuthLayout from '@/components/auth/layout';

const SignUp = () => (
  <AuthLayout authAction="signUp">
    <SignUpForm />
  </AuthLayout>
);

export default SignUp;