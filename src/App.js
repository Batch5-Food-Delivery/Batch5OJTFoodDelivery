import { Route, Routes } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import ShopPage from './views/pages/ShopPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ShopPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
