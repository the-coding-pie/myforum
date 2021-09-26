import AuthLayout from "../components/layouts/AuthLayout";
import { Button } from "../components/shared/Button";
import { InputBox } from "../components/shared/InputBox";

const Login = () => {
  return <AuthLayout title="Log In">
      <form>
          <InputBox type="text" placeholder="Username" />
          <InputBox type="password" placeholder="Password" />

          <Button>
              Log In
          </Button>
      </form>
  </AuthLayout>;
};

export default Login;
