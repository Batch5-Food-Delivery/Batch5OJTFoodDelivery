import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ShopPage from './views/pages/ShopPage';
import FoodList from './components/foods/FoodsList';
import MenuCartLayout from './components/layouts/MenuCartLayout';

function App() {
  return (
  <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ShopPage/>} />
        <Route path="/menu" element={<MenuCartLayout/>} />
      </Route>
    </Routes>

  );
}

export default App;
