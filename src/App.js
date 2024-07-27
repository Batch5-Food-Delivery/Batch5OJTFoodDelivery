import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import LoginPage from "./page/LoginPage";
import ShopPage from "./page/ShopPage";
import MenuCartLayout from "./components/layouts/MenuCartLayout";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<ShopPage/>} />
       <Route path='login' element={<LoginPage />}/>
       <Route path="/menu" element={<MenuCartLayout/>} />
      </Route>
    </Routes>
  );
}

export default App;
