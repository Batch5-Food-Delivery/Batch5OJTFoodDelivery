import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ShopPage from './views/pages/ShopPage';
<<<<<<< HEAD

import MenuCartLayout from './components/layouts/MenuCartLayout';

function App() {
  return (
  <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ShopPage/>} />
        <Route path="/menu" element={<MenuCartLayout/>} />
      </Route>
    </Routes>

=======

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ShopPage/>} />
      </Route>
    </Routes>
>>>>>>> af2241ba7b2a765d6f840a29feb16e5fd6be1cf9
  );
}

export default App;
