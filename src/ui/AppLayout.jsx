import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 3.2rem 4.8rem 4.8rem;
  overflow: auto;

  /* Smooth scroll */
  scroll-behavior: smooth;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 100px;
  }

  @media (max-width: 1200px) {
    padding: 2.4rem 3.2rem 4rem;
  }

  @media (max-width: 900px) {
    padding: 2rem 2rem 3.2rem;
  }
`;

const Container = styled.div`
  max-width: 160rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-bento-gap);
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <StyledAppLayout>
      <Header toggleSidebar={() => setIsSidebarOpen((s) => !s)} />
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
