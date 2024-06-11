export const formatCost = (cost) => {
  const formatNumber = (number) => {
    const formattedNumber = Math.abs(number).toFixed(2);
    if (formattedNumber.endsWith(".00")) {
      return formattedNumber.slice(0, -3);
    } else if (formattedNumber.endsWith("0")) {
      return formattedNumber.slice(0, -1);
    }
    return formattedNumber;
  };

  const sign = cost < 0 ? "-" : "";

  if (Math.abs(cost) >= 1e8) {
    return `${sign}${formatNumber(cost / 1e8)}억`;
  } else if (Math.abs(cost) >= 1e4) {
    return `${sign}${formatNumber(cost / 1e4)}만원`;
  } else {
    return `${sign}${Math.abs(cost)}원`;
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
