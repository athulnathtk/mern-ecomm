
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './screen/homescreen';
import ProductsScreen from './screen/productscreen';
import  Navbar from 'react-bootstrap/Navbar';
import  Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { useContext } from 'react';
import { Store } from './store';
import CartScreen from './screen/cartscreen';
import SigninScreen from './screen/signinscreen';

function App() {
  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <>
    <BrowserRouter>
    <div className='d-flex flex-column site-container'>
      <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>Shoppy.io</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to='/cart' className='nav-link'>
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg='danger'>
                    {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
                  </Badge>
                )
                }
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path="/product/:slug" element={<ProductsScreen />} />
            <Route path="/cart" element={<CartScreen />}/>
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className='text-center'>All rights Reserved</div>
      </footer>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
