import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout/layout";

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
      </Routes>
    </>
  );
}

export default App;
