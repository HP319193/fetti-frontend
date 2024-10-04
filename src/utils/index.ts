import moment from 'moment';
// import '@formatjs/intl-pluralrules/polyfill';
// import '@formatjs/intl-pluralrules/dist/locale-data/en';

export const isLogin = () => {
  return localStorage.getItem('accessToken');
};

export const validateEmail = (email: string) => {
  const regex = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/
  );
  return regex.test(email);
};

export const formatDate = (date: string, format: any) => {
  return date && moment(date).format(format);
};

export const formatToNumber = (value: any) => {
  return value ? Number(value.replace(/[^0-9.]+/g, '')) : 0;
};

export const isObjectEmpty = (obj: any) => {
  if (obj && typeof obj === 'object') {
    return !Object.keys(obj).length;
  }
  return true;
};
