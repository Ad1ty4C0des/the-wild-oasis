import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const NavWrapper = styled.nav`
  position: relative;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
`;

/* Sliding active indicator (accent bar + background) */
const ActiveIndicator = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 0;
  transition: top 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    opacity 0.2s ease;
  top: ${(props) => props.$top}px;
  height: ${(props) => props.$height}px;
  opacity: ${(props) => (props.$visible ? 1 : 0)};

  /* Active background fill */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  /* Green accent bar */
  &::before {
    content: "";
    position: absolute;
    left: -2rem;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: var(--color-brand-600);
    border-radius: 0 2px 2px 0;
    z-index: 1;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    font-weight: 500;
    padding: 1.2rem 2rem;
    border-radius: var(--border-radius-sm);
    transition: all 0.25s ease;
    position: relative;
    z-index: 1;
  }

  /* Active text styling (no background—indicator handles that) */
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    font-weight: 600;
  }

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
  }

  /* Remove hover bg when active (indicator provides it) */
  &.active:hover {
    background-color: transparent;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: all 0.25s ease;
  }

  &:hover svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const NAV_ITEMS = [
  { to: "/dashboard", icon: HiOutlineHome, label: "Dashboard" },
  { to: "/bookings", icon: HiOutlineCalendarDays, label: "Bookings" },
  { to: "/cabins", icon: HiOutlineHomeModern, label: "Cabins" },
  { to: "/users", icon: HiOutlineUsers, label: "Users" },
  { to: "/settings", icon: HiOutlineCog6Tooth, label: "Settings" },
];

function MainNav({ closeSidebar }) {
  const location = useLocation();
  const listRef = useRef(null);
  const [indicator, setIndicator] = useState({
    top: 0,
    height: 0,
    visible: false,
  });

  // Calculate the sliding indicator position based on which link is active
  useEffect(() => {
    if (!listRef.current) return;

    const activeLink = listRef.current.querySelector("a.active");
    if (activeLink) {
      const listRect = listRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        top: linkRect.top - listRect.top,
        height: linkRect.height,
        visible: true,
      });
    } else {
      setIndicator((prev) => ({ ...prev, visible: false }));
    }
  }, [location.pathname]);

  return (
    <NavWrapper>
      <NavList ref={listRef}>
        <ActiveIndicator
          $top={indicator.top}
          $height={indicator.height}
          $visible={indicator.visible}
        />

        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <StyledNavLink to={to} onClick={closeSidebar}>
              <Icon />
              <span>{label}</span>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </NavWrapper>
  );
}

export default MainNav;
