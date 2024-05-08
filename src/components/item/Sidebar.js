import React, { useState } from "react";

// TODO: item.id == 1인 모든 아이템의 경우 expaned가
const SidebarItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false); // 하위 항목이 펼쳐진 상태인지 여부를 나타내는 상태

  const hasChildren = item.children && item.children.length > 0;

  // 화살표를 클릭할 때 하위 항목의 펼침 상태를 토글
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <li>
      {/* TODO : href링크는 그 카테고리의 데이터를 요청 하는 링크   */}
      <a
        href={item.link}
        onClick={toggleExpand}
        className="block text-white hover:bg-gray-700 rounded px-2 py-1"
      >
        {hasChildren && <span>{expanded ? "▼" : "▶"}</span>}
        <span className="ml-2">{item.name}</span>
      </a>
      {expanded && hasChildren && (
        <ul className="ml-4">
          {item.children.map((child) => (
            <SidebarItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar = ({ items }) => {
  // TODO: w-full을 자동으로 상속못지키나? 계속 w-full 하는게 귀찮음.
  return (
    <aside className="w-full h-screen flex">
      <div className="w-full bg-gray-800">
        <nav className="p-4">
          <ul className="space-y-2">
            {items.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
