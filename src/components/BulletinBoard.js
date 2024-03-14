import React from "react";

const BulletinBoard = () => {
  const posts = [
    { id: 1, title: "공지사항 1", content: "공지 내용 1입니다." },
    { id: 2, title: "공지사항 2", content: "공지 내용 2입니다." },
    { id: 3, title: "공지사항 3", content: "공지 내용 3입니다." },
    { id: 4, title: "공지사항 4", content: "공지 내용 4입니다." },
  ];

  return (
    <div className="my-4 p-4 bg-white rounded-lg shadow-md w-536">
      <h3 className="text-xl font-semibold mb-2">공지사항</h3>
      <ul>
        {posts.map((notice) => (
          <li key={notice.id} className="border-b last:border-b-0 py-2">
            <h4 className="font-bold">{notice.title}</h4>
            <p>{notice.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BulletinBoard;
