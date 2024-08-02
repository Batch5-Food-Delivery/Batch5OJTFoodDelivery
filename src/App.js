import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ShopPage from './views/pages/ShopPage';

import MenuCartLayout from './components/layouts/MenuCartLayout';
import AddFoods from './components/foods/AddFoods';
import FoodDetail from './components/foods/FoodDetail';

function App() {
  return (
  <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ShopPage/>} />
        <Route path="/menu" element={<MenuCartLayout/>} />
        <Route path="/menu/create" element={<AddFoods/>} />
        <Route path="/menu-detail" element={<FoodDetail/>} />
      </Route>
    </Routes>

  );
}

export default App;
