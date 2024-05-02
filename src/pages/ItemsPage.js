import React from "react";
import { MainHeader, SubHeader } from "../components/Header";
import AllItemsContainer from "../containers/AllItemsContainer";

export default function ItemsPage() {
  return (
    <>
      <MainHeader />
      <SubHeader />
      <AllItemsContainer />
    </>
  );
}
