import React from "react";

import HeaderContainer from "../../containers/HeaderContainer";
import ItemListContainer from "../../containers/admin/item/ItemListContainer";

export default function ItemListPage() {
  return (
    <div className="flex min-w-[1080px] min-h-screen flex-col bg-gray-200">
      <HeaderContainer />
      <ItemListContainer />
    </div>
  );
}
