import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: var(--color-grey-50);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BrandPanel = styled.div`
  background: linear-gradient(135deg, #012d1d 0%, #1b4332 50%, #274e3d 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4.8rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }

  /* Decorative organic shapes */
  &::before {
    content: "";
    position: absolute;
    top: -15%;
    right: -15%;
    width: 50rem;
    height: 50rem;
    border-radius: 50%;
    background: rgba(165, 208, 185, 0.08);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -20%;
    left: -10%;
    width: 40rem;
    height: 40rem;
    border-radius: 50%;
    background: rgba(141, 78, 33, 0.06);
  }
`;

const BrandContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 48rem;
`;

const BrandName = styled.h1`
  font-family: "Hanken Grotesk", sans-serif;
  font-size: 4.8rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.2rem;
`;

const BrandSubtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 3.2rem;
`;

const BrandTagline = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.6rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  max-width: 36rem;
  margin: 0 auto;
`;

const LeafIcon = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 3.2rem;
  font-size: 2.8rem;
`;

const FormPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4.8rem;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 44rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const WelcomeText = styled.div`
  text-align: center;

  & h4 {
    font-family: "Hanken Grotesk", sans-serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--color-grey-800);
    margin-bottom: 0.8rem;
  }

  & p {
    font-family: "Inter", sans-serif;
    font-size: 1.4rem;
    color: var(--color-grey-500);
  }
`;

function Login() {
  return (
    <LoginLayout>
      <BrandPanel>
        <BrandContent>
          <LeafIcon>🌿</LeafIcon>
          <BrandName>The Wild Oasis</BrandName>
          <BrandSubtitle>Management Suite</BrandSubtitle>
          <BrandTagline>
            Your premium hotel management platform. 
            Streamline operations, delight guests, and grow your business with ease.
          </BrandTagline>
        </BrandContent>
      </BrandPanel>

      <FormPanel>
        <FormContainer>
          <WelcomeText>
            <h4>Welcome back</h4>
            <p>Sign in to your account to continue</p>
          </WelcomeText>
          <LoginForm />
        </FormContainer>
      </FormPanel>
    </LoginLayout>
  );
}

export default Login;
