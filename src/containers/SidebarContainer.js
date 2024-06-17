import React from "react";
import Sidebar from "../components/item/Sidebar";

export default function SidebarContainer({ onCategoryClick }) {
  let items = [
    {
      name: "모든 아이템",
      mainCategory: 0,
      subCategory: 0,
    },
    // TODO: 무기 방어구 추가, 방어구 전체 업데이트 잘안됨.
    {
      name: "무기",
      mainCategory: 1,
      subCategory: 0,
    },
    {
      name: "방어구",
      mainCategory: 15,
      subCategory: 0,
    },
    {
      name: "악세사리",
      mainCategory: 20,
      subCategory: 0,
    },

    {
      name: "재료",
      mainCategory: 25,
      subCategory: 0,
      children: [
        {
          name: "모든 아이템",
          mainCategory: 25,
          subCategory: 0,
          children: [],
        },
        {
          name: "광석",
          mainCategory: 25,
          subCategory: 1,
          children: [],
        },
        {
          name: "나무",
          mainCategory: 25,
          subCategory: 2,
          children: [],
        },
        {
          name: "곡물/열매/씨앗",
          mainCategory: 25,
          subCategory: 3,
          children: [],
        },
        {
          name: "가죽",
          mainCategory: 25,
          subCategory: 4,
          children: [],
        },
        {
          name: "피",
          mainCategory: 25,
          subCategory: 5,
          children: [],
        },
        {
          name: "고기",
          mainCategory: 25,
          subCategory: 6,
          children: [],
        },
        {
          name: "물고기",
          mainCategory: 25,
          subCategory: 7,
          children: [],
        },
        {
          name: "연금 재료",
          mainCategory: 25,
          subCategory: 8,
          children: [],
        },
      ],
    },
  ];

  items = addIdsToItems(items);

  return <Sidebar items={items} onCategoryClick={onCategoryClick} />;
}

const addIdsToItems = (items) => {
  let id = 1;

  const addIdToItem = (item) => {
    item.id = id++;
    if (item.children && item.children.length > 0) {
      item.children.forEach(addIdToItem);
    }
  };

  items.forEach(addIdToItem);

  return items;
};
