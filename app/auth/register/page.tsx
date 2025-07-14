import CardWrapper from "../_components/CardWrapper";
import RegisterForm from "../_components/RegisterForm";

const RegisterPage = () => {
  return (
    <main>
      <CardWrapper
        title="Register"
        linkHref="/auth/login"
        linkLable="Back to login"
      >
        <RegisterForm />
      </CardWrapper>
    </main>
  );
};
export default RegisterPage;
