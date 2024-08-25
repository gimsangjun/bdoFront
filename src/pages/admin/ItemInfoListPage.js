import React from "react";
import ItemInfoListContainer from "../../containers/admin/item-info/ItemInfoListContainer";
import HeaderContainer from "../../containers/HeaderContainer";

export default function ItemInfoListPage() {
  return (
    <div className="flex min-w-[1080px] min-h-screen flex-col bg-gray-200">
      <HeaderContainer />
      <ItemInfoListContainer />
    </div>
  );
}
