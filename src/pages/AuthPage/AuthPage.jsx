import { useParams } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default function AuthPage() {
  const { authType } = useParams();

  return <>{authType === "register" && <RegistrationForm />}</>;
}
