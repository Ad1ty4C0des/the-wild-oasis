import styled from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";
import { HiOutlineBars3 } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1200px) {
    padding: 1.2rem 3.2rem;
  }

  @media (max-width: 900px) {
    padding: 1.2rem 2rem;
    justify-content: space-between;
  }
`;

const MobileMenuButton = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function Header({ toggleSidebar }) {
  return (
    <StyledHeader>
      <MobileMenuButton>
        <ButtonIcon onClick={toggleSidebar}>
          <HiOutlineBars3 />
        </ButtonIcon>
      </MobileMenuButton>
      <HeaderRight>
        <HeaderMenu />
        <UserAvatar />
      </HeaderRight>
    </StyledHeader>
  );
}

export default Header;
