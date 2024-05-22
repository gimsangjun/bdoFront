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
      <div onClick={handleClick} className="block text-white hover:bg-gray-700 rounded px-2 py-1">
        {hasChildren && <span>{expanded ? "▼" : "▶"}</span>}
        <span key={item.id} className="ml-2">
          {item.name}
        </span>
      </div>
      {expanded && hasChildren && (
        <ul className="ml-4">
          {item.children.map((child, index) => (
            <SidebarItem key={index} item={child} onCategoryClick={onCategoryClick} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar = ({ items, onCategoryClick }) => {
  // TODO: w-full을 자동으로 상속못지키나? 계속 w-full 하는게 귀찮음.
  return (
    // TODO : top 속성을 넣을 때, header의 크기를 직접 계산해서 넣어야 하나?
    <aside className="w-56 h-4/5 flex" style={{ position: "sticky", top: 192 }}>
      <div className="w-full bg-gray-800">
        <nav className="p-4">
          <ul className="space-y-2">
            {items.map((item, index) => (
              <SidebarItem key={index} item={item} onCategoryClick={onCategoryClick} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
