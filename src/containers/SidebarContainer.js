import React from "react";
import Sidebar from "../components/item/Sidebar";

export default function SidebarContainer() {
  // TODO: 아직 예시용 데이터
  const items = [
    {
      id: 1,
      name: "모든 아이템",
      link: "#",
    },
    {
      id: 2,
      name: "가공",
      link: "#",
      children: [],
    },
    {
      id: 3,
      name: "요리",
      link: "#",
      children: [],
    },
    {
      id: 4,
      name: "연금",
      link: "#",
      children: [
        {
          id: 5,
          name: "모든 아이템",
          link: "#",
          children: [],
        },
        {
          id: 6,
          name: "하위 아이템 1",
          link: "#",
          children: [],
        },
        {
          id: 7,
          name: "하위 아이템 2",
          link: "#",
          children: [],
        },
      ],
    },
  ];

  return <Sidebar items={items} />;
}
