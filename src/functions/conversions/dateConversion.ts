export const convertDate = (date: string) => {
  const dateObject = new Date(date);

  const options = { timeZone: "Asia/Kolkata" };
  // return dateObject.toLocaleString("en-IN", options).toUpperCase();
  return (
    dateObject.toLocaleDateString("en-IN", options) +
    " - " +
    dateObject.toLocaleTimeString("en-IN", options).toUpperCase()
  );
};

export const formattedDate = (date: string) => {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();
  const second = dateObject.getSeconds();
  const millisecond = dateObject.getMilliseconds();

  return [`${year}-${month}-${day}`, `${hour}:${minute}:${second}`];
};
