import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout/layout";
import Trade from "./pages/trade";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/trade"
          element={
            <Layout>
              <Trade />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
