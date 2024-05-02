import React from "react";
import ItemAPI from "../utils/itemAPI";
import ItemsTable from "../components/ItemsTable";

export default function AllItemsContainer() {
  const getItemsByPage = async (page) => await ItemAPI.getItemsByPage(page);

  return <ItemsTable getItemsByPage={getItemsByPage} />;
}
