export function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// 쿠키 문자열에서 세션 ID 추출하는 함수
export const getValueFromCookie = (cookieString, key) => {
  const cookies = cookieString.split(";"); // 쿠키 문자열을 세미콜론(;)을 기준으로 분리하여 배열로 만듦
  for (let cookie of cookies) {
    const [key, value] = cookie.split("="); // 각 쿠키를 '='를 기준으로 key와 value로 분리
    if (key.trim() === key) {
      return value; // 세션 ID에 해당하는 쿠키의 값을 반환
    }
  }
  return null; // 세션 ID가 없으면 null 반환
};
