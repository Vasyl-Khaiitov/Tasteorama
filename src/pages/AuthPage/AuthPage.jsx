import { useParams } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import LoginForm from "../../components/LoginForm/LoginForm";

const AuthPage = () => {
  const { authType } = useParams();

  if (authType === "register") return <RegistrationForm />;
  if (authType === "login") return <LoginForm />;

  return <Navigate to="/auth/login" replace />;
};

export default AuthPage;
