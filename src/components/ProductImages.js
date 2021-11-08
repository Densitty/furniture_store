import React, { useState } from "react";
import styled from "styled-components";

const ProductImages = ({ images = [{ url: "" /*, filename: ""  */ }] }) => {
  // console.log(images);
  // N.B: when component loads, images will be undefined until the product is fetched from api so we set a default value & set any ppty we may logically need to use  as empty string

  const [mainImage, setMainImage] = useState(images[0]);

  const changeMain = (index) => {
    setMainImage(images[index]);
  };

  return (
    <Wrapper>
      <img src={mainImage.url} alt="main" />
      <div className="gallery">
        {images.map((image, index) => {
          return (
            <img
              className={`${image.url === mainImage.url ? "active" : null}`}
              key={index}
              src={image.url}
              /* alt={image.filename.split(".")[0]} */
              alt={image.filename}
              onClick={() => changeMain(index)}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
