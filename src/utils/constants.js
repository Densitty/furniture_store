import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Our mission is to provide individuals, households and offices, premium quality furnitures of all kinds of use at non bank-breaking prices that will amaze",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Our vision is to be the leading provider of all furniture products across the globe",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Since 1952, we have been furnishing homes with affordable furnitures and then moved into serving offices. We pride ourselves in testimonies given by our customers all over, taking them as preps to doing more than we have been doing. ",
  },
];

export const products_url = "https://course-api.com/react-store-products";

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;
