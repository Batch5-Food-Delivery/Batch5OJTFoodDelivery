import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import LoginPage from "./page/LoginPage";
import ShopPage from "./page/ShopPage";
import MenuCartLayout from "./components/layouts/MenuCartLayout";
import AdminLayout from "./components/adminLayouts/AdminLayout";
import RestaurantRecords from "./features/restaurant/RestaurantRecords";
import Create from "./features/restaurant/Create";
import Update from "./features/restaurant/Update";
import RegionRecords from "./features/region/RegionRecords";
import CreateRegion from "./features/region/Create";
import UpdateRegion from "./features/region/UpdateRegion";

import AddFoods from "./features/foods/AddFoods";
import FoodDetail from "./features/foods/FoodDetail";
import UpdateFoods from "./features/foods/UpdateFoods";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ShopPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="menu" element={<MenuCartLayout />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="restaurant">
          <Route index element={<RestaurantRecords />} />
          <Route path="create" element={<Create />} />
          <Route path="update/:restaurantId" element={<Update />} />
        </Route>
        <Route path="region">
          <Route index element={<RegionRecords />} />
          <Route path="create" element={<CreateRegion />} />
          <Route path="update/:regionId" element={<UpdateRegion />} />
        </Route>
        <Route path="/menu/create" element={<AddFoods />} />
        <Route path="/menu-detail/:menuId" element={<FoodDetail />} />
        <Route path="/menu-update" element={<UpdateFoods />} />
      </Route>
    </Routes>
  );
}

export default App;
