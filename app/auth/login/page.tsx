import CardWrapper from "../_components/CardWrapper";
import LoginForm from "../_components/LoginForm";

const LoginPage = () => {
  return (
    <main>
      <CardWrapper
        title="Login"
        linkHref="/auth/register"
        linkLable="Don`t have an account?"
      >
        <LoginForm />
      </CardWrapper>
    </main>
  );
};
export default LoginPage;
