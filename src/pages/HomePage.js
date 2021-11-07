import React from "react";
import styled from "styled-components";

import { FeaturedProducts, Hero, Services, Contact } from "../components";
const HomePage = () => {
  return (
    <main className="fullpage">
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

const Wrapper = styled.main`
  min-height: calc(100vh - 10rem);
  background: var(--clr-red-dark);
`;

export default HomePage;
