import { AuthLayout } from "../../layouts";
import LoginView from "../../views/auth/Login";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginView />
    </AuthLayout>
  );
};

export default LoginPage;
