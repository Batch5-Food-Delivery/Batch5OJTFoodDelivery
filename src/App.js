import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./page/LoginPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
       <Route path='login' element={<LoginPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
