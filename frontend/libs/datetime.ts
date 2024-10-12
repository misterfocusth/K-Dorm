export const getTHFormattedDateTime = (date: string) => {
  const monthsThai = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  const dateObj = new Date(date);

  const day = dateObj.getDate();
  const month = monthsThai[dateObj.getMonth()];
  const year = dateObj.getFullYear() + 543;
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} - ${hours}:${minutes}`;
};
