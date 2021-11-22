import React from "react";
import styled from "styled-components";

import { FeaturedProducts, Hero, Services, Contact } from "../components";
const HomePage = () => {
  return (
    <Wrapper className="fullpage">
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: calc(100vh - 10rem);
`;

export default HomePage;
