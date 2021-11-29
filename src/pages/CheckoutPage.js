import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
// import { useCartContext } from "../context/cart_context";
// import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        <StripeCheckout />
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default CheckoutPage;
