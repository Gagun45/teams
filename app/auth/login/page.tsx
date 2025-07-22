import { Suspense } from "react";
import CardWrapper from "../_components/CardWrapper";
import LoginForm from "../_components/LoginForm";
import { BarLoader } from "react-spinners";

const LoginPage = () => {
  return (
    <main>
      <CardWrapper
        title="Login"
        linkHref="/auth/register"
        linkLable="Don`t have an account?"
        cardHeading="Auth"
      >
        <Suspense fallback={<BarLoader />}>
          <LoginForm />
        </Suspense>
      </CardWrapper>
    </main>
  );
};
export default LoginPage;
