import { useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";

const StyledLoginForm = styled.form`
  padding: 2.4rem 3.2rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-xl);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-grey-500);
`;

const StyledInput = styled(Input)`
  padding: 1.2rem 1.6rem;
  font-size: 1.5rem;
  border-radius: var(--border-radius-sm);

  &::placeholder {
    color: var(--color-grey-400);
    font-size: 1.4rem;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 1.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 0.8rem;
  border-radius: var(--border-radius-sm);
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="email">Email Address</Label>
        <StyledInput
          type="email"
          id="email"
          placeholder="you@thewildoasis.com"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <StyledInput
          type="password"
          id="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormField>
      <SubmitButton size="large" disabled={isLoading}>
        {!isLoading ? "Sign In →" : <SpinnerMini />}
      </SubmitButton>
    </StyledLoginForm>
  );
}

export default LoginForm;
