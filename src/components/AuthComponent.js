import { getToken } from "@/utils";
import { Navigate } from "react-router-dom"; //可以帮助我们完成重定向
// 高阶组件:把一个组件当成另外一个组件的参数传入，通过一定的判断 返回新的组件
function AuthComponent({ children }) {
  const isToken = getToken();
  if (isToken) {
    // 有token的话就返回一个正常的子组件渲染
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace></Navigate>;
  }
}

export default AuthComponent;

// 之后再去找到需要鉴权的组件，并用其包裹

// <AuthComponent><Layout></Layout></AuthComponent>
