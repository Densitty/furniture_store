import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="our work on display" />
        <article>
          <div className="title">
            <h2>Our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Comfy Sloth is the leading place for all kinds of your furniture
            needs. Our products clearly stand out from from all other products,
            as we go for the best out of the wide range of products out there to
            meet your needs. All you need to do is visit our office and talk to
            the us and we figure the rest for you.
            <br /> Operating since 1952, Comfy Sloth has been the leading
            provider of all kinds of furniture for all kinds, at the lowest and
            affordable price not found anywhere.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    // margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
    @media (min-width: 992px) {
      // color: red;
    }
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
