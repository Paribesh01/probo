import React from "react";
import Nav from "../nav";
import Footer from "../footer";

const Layout = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
