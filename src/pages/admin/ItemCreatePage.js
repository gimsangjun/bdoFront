import React from "react";
import HeaderContainer from "../../containers/HeaderContainer";
import ItemCreateContainer from "../../containers/admin/item/ItemCreateContainer";

export default function ItemCreatePage() {
  return (
    <div className="flex min-w-[1080px] min-h-screen flex-col bg-gray-200">
      <HeaderContainer />
      <ItemCreateContainer />
    </div>
  );
}
