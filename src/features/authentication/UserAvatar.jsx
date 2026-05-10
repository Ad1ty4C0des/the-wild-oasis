import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  font-family: "Inter", sans-serif;
  color: var(--color-grey-700);
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  outline-offset: 1px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--color-grey-800);
`;

const UserRole = styled.span`
  font-size: 1.1rem;
  color: var(--color-grey-500);
`;

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <UserInfo>
        <UserName>{fullName}</UserName>
        <UserRole>Manager</UserRole>
      </UserInfo>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
