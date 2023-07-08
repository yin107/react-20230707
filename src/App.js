import "./App.css";
import { Routes, Route } from "react-router-dom";
import history from "./utils/history";

import LayoutView from "@/pages/Layout";
import AuthComponent from "./components/AuthComponent";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
const Login = lazy(() => import("@/pages/Login"));
const Home = lazy(() => import("./pages/Home/index"));
const Article = lazy(() => import("./pages/Article/index"));
const Publish = lazy(() => import("./pages/Publish/index"));

function App() {
  return (
    // <BrowserRouter>
    <HistoryRouter history={history}>
      <Suspense fallback={
		<div style={{textAlign:'center',marginTop:200}}>loading....</div>
	  }>
        <div style={{ margin: "0px" }}>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            {/* <Route path='/' element={<Layout></Layout>}></Route> */}
            {/* element里面不能写死 */}
            <Route
              path="/"
              element={
                <AuthComponent>
                  <LayoutView></LayoutView>
                </AuthComponent>
              }
            >
              <Route index element={<Home />}></Route>
              <Route path="/article" element={<Article />}></Route>
              <Route path="/publish" element={<Publish />}></Route>
            </Route>
          </Routes>
        </div>
      </Suspense>
    </HistoryRouter>

    // </BrowserRouter>
  );
}

export default App;
