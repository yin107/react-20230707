import "./App.css";
import { Routes, Route } from "react-router-dom";
import history from "./utils/history";
import Login from "@/pages/Login";
import LayoutView from "@/pages/Layout";
import AuthComponent from "./components/AuthComponent";
import Home from "./pages/Home/index";
import Article from "./pages/Article";
import Publish from "./pages/Publish";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

function App() {
  return (
    // <BrowserRouter>
    <HistoryRouter history={history}>
      <div style={{margin:'0px'}}>
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
    </HistoryRouter>

    // </BrowserRouter>
  );
}

export default App;
