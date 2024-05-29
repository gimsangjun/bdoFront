import React, { useState } from "react";

const SidebarItem = ({ item, onCategoryClick }) => {
  const [expanded, setExpanded] = useState(false); // 하위 항목이 펼쳐진 상태인지 여부를 나타내는 상태

  const hasChildren = item.children && item.children.length > 0;

  // 화살표를 클릭할 때 하위 항목의 펼침 상태를 토글
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    if (!hasChildren) {
      onCategoryClick(item.mainCategory, item.subCategory);
    }
    toggleExpand();
  };

  return (
    <li>
      <div
        onClick={handleClick}
        className="block text-white hover:bg-gray-700 rounded px-2 py-1"
      >
        {hasChildren && <span>{expanded ? "▼" : "▶"}</span>}
        <span key={item.id} className="ml-2">
          {item.name}
        </span>
      </div>
      {expanded && hasChildren && (
        <ul className="ml-4">
          {item.children.map((child, index) => (
            <SidebarItem
              key={index}
              item={child}
              onCategoryClick={onCategoryClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar = ({ items, onCategoryClick }) => {
  return (
    // top 속성을 넣을 때, header의 크기를 직접 계산해서 넣어야 하나? 직접 계산해야할듯.
    // sticky 속성은 특정 스크롤 이하일때는 relative로 적용되고, 이상일 때는 fixed로 적용되기 때문에 top속성을 넣으면 내가 원하는대로 동작하게 할수 있음.
    // top 속성은 viewport(화면 상에 보이는)를 기준으로 작동.
    <aside className="w-60 flex sticky top-48">
      <div className="w-full bg-gray-800">
        <nav className="p-4">
          <ul className="space-y-2">
            {items.map((item, index) => (
              <SidebarItem
                key={index}
                item={item}
                onCategoryClick={onCategoryClick}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
