import { makeAutoObservable } from "mobx";
import { getToken, http, setToken, removeToken } from "@/utils/index";

class LoginStore {
  token = getToken() || ""; //在整个页面初始化的时候先从本地取token，如果不存在的话就默认为空串
  constructor() {
    makeAutoObservable(this);
  }
  login = async ({ phone, pass }) => {
    const res = await http.get("/pc/user/login", { phone, pass });
    this.token = res.data.token;
    //还需要将token存入localstorage
    setToken(this.token);
  };
  clearToken = () => {
    removeToken();
    this.token = "";
  };
}
export default LoginStore;
