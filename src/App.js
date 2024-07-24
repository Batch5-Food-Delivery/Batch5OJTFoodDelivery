import { Route,Routes } from "react-router-dom";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Layout from "./component/Layout";



function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
     <Route path='order' element={<PlaceOrder />}/>
    </Route>
  </Routes>
   
  );
}

export default App;
