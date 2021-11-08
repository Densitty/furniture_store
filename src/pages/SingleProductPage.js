import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  // get the id param from the url
  const data = useParams();
  const { id } = data;

  const { push } = useHistory();
  // console.log(history);
  // fetch single_product data from the product_context
  const {
    product,
    productLoading: loading,
    productError: error,
    fetchSingleProduct,
  } = useProductsContext();

  // when page/component loads, fetch the product
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  // if there is an error, programmatcally push to homepage
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        push("/");
      }, 3000);
    }

    // error must be passed as a dependency for the page to reload if error state changes
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product;

  return (
    <Wrapper>
      <PageHero product={product} />
      <div className="page section section-center">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>

            <Stars stars={stars} reviews={reviews} />

            <h5 className="price">{formatPrice(price)}</h5>
            <p className="description">{description}</p>
            <p className="info">
              <span>Available : {stock > 0 ? "In stock" : "Out of stock"}</span>
            </p>
            <p className="info">
              <span>SKU: {sku}</span>
            </p>
            <p className="info">
              <span>Brand : {company}</span>
            </p>

            <hr />

            {stock > 0 && <AddToCart />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }

  .price {
    color: var(--clr-primary-5);
  }

  .desc {
    line-height: 2;
    max-width: 45em;
  }

  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
