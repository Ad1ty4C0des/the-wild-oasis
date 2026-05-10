import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiOutlineMoon, HiOutlineSun, HiArrowRightOnRectangle, HiOutlineXMark } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";
import { useLogout } from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";
import ButtonIcon from "./ButtonIcon";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow-y: auto;

  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 26rem;
    height: 100vh;
    z-index: 999;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  }
`;

const Overlay = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    backdrop-filter: blur(4px);
    transition: all 0.3s;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (min-width: 901px) {
    justify-content: center;
  }
`;

const CloseButton = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
`;

const BottomActions = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-grey-100);
`;

const SidebarAction = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background: none;
  border: none;
  color: var(--color-grey-600);
  font-size: 1.4rem;
  font-weight: 500;
  padding: 1.2rem 2rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background-color: var(--color-grey-50);
    color: var(--color-grey-800);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-400);
    transition: color 0.2s;
  }

  &:hover svg {
    color: var(--color-brand-600);
  }
`;

const LogoutAction = styled(SidebarAction)`
  color: var(--color-red-700);
  & svg { color: var(--color-red-700); }
  &:hover { 
    background-color: var(--color-red-100); 
    color: var(--color-red-800);
  }
  &:hover svg { color: var(--color-red-800); }
`;

function Sidebar({ isOpen, closeSidebar }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { logout, isLoading } = useLogout();

  return (
    <>
      <Overlay isOpen={isOpen} onClick={closeSidebar} />
      <StyledSidebar isOpen={isOpen}>
        <HeaderRow>
          <Logo />
          <CloseButton>
            <ButtonIcon onClick={closeSidebar}>
              <HiOutlineXMark />
            </ButtonIcon>
          </CloseButton>
        </HeaderRow>
        
        <MainNav closeSidebar={closeSidebar} />

        <BottomActions>
          <SidebarAction onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
            <span>Dark Mode</span>
          </SidebarAction>
          <LogoutAction onClick={logout} disabled={isLoading}>
            {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
            <span>Logout</span>
          </LogoutAction>
        </BottomActions>
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
