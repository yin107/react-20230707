//封装localStorage存储token
// 封装任何函数的时候，记得写返回值，不要让其默认为undefined
const key = "pc-key";

const setToken = (token) => {
  return window.localStorage.setItem(key, token);
};

const getToken = () => {
  return window.localStorage.getItem(key);
};

const removeToken = () => {
  return window.localStorage.removeItem(key);
};

export {
	setToken,
	getToken,
	removeToken
}