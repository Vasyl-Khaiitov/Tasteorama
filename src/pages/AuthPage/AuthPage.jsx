import { useParams } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import Container from "../../components/Container/Container";

export default function AuthPage() {
  const { authType } = useParams();

  return (
    <Container>{authType === "register" && <RegistrationForm />}</Container>
  );
}
