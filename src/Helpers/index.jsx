const getTimeDiff = (date) => {
  const givenDate = new Date(date);
  const today = new Date(new Date().toUTCString());
  const timeDiff = today.getTime() - givenDate.getTime();

  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  const yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 * 12));

  if (yearsDiff >= 1) {
    if (yearsDiff > 1)
      return yearsDiff + ' years';
    return yearsDiff + ' year';
  };

  if (monthsDiff >= 1) {
    if (monthsDiff > 1)
      return monthsDiff + ' months';
    return monthsDiff + ' month';
  };

  if (daysDiff >= 1) {
    if (daysDiff > 1)
      return daysDiff + ' days';
    return daysDiff + ' day';
  };

  if (hoursDiff >= 1) {
    if (hoursDiff > 1)
      return hoursDiff + ' hours';
    return hoursDiff + ' hour';
  };

  if (minutesDiff > 1)
    return minutesDiff + ' minutes';
  return minutesDiff + ' minute';
}

const isMoreThanAMonth = (date) => {
  const givenDate = new Date(date);
  const today = new Date();
  const timeDiff = today.getTime() - givenDate.getTime();

  const monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));

  if (monthsDiff >= 1) {
    return true;
  };

  return false;
}                              

export { 
  getTimeDiff, 
  isMoreThanAMonth,
};