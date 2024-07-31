
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './screen/homescreen';
import ProductsScreen from './screen/productscreen';

function App() {
  return (
    <>
    <BrowserRouter>
    <div>
      <header>
        <Link to='/'>Amazona</Link>
      </header>
      <main>
        <Routes>
          <Route path="/product/:slug" element={<ProductsScreen/>} />
          <Route path="/" element={<HomeScreen/>} />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
