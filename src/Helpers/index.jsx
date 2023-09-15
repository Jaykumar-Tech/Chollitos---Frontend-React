import { useTranslation } from "react-i18next";
import { _t } from "../Utils/_t";

const GetTimeDiff = (date) => {
  const {t} = useTranslation()
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
      return yearsDiff + ' ' + t(_t('years')) ;
    return yearsDiff + ' ' + t(_t('year'));
  };

  if (monthsDiff >= 1) {
    if (monthsDiff > 1)
      return monthsDiff + ' ' + t(_t('months')) ;
    return monthsDiff + ' ' + t(_t('month'))
  };

  if (daysDiff >= 1) {
    if (daysDiff > 1)
      return daysDiff + ' ' + t(_t('days'))
    return daysDiff + ' ' + t(_t('day')) 
  };

  if (hoursDiff >= 1) {
    if (hoursDiff > 1)
      return hoursDiff + ' ' + t(_t('hours')) 
    return hoursDiff + ' ' + t(_t('hour')) 
  };

  if (minutesDiff > 1)
    return minutesDiff + ' ' + t(_t('minutes')) 
  return minutesDiff + ' ' + t(_t('minute')) 
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
  GetTimeDiff, 
  isMoreThanAMonth,
};