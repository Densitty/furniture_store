import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import components
import { Navbar, Sidebar, Footer } from "./components";

/* introduce AuthWrapper to make authentication seamless across all routes */

// import the pages
import {
  AuthWrapper,
  Home,
  About,
  Error,
  Products,
  SingleProduct,
  Cart,
  Checkout,
  PrivateRoute,
} from "./pages/index";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/products">
            <Products />
          </Route>

          <Route exact path="/cart">
            <Cart />
          </Route>

          <Route
            exact
            path="/products/:id"
            /* children={<SingleProduct/>} */ component={SingleProduct}
          />

          <PrivateRoute exact path="/checkout">
            <Checkout />
          </PrivateRoute>

          <Route exact path="*">
            <Error />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
