// import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from "../components/product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/loadingbox";
import MessageBox from "../components/messagebox";
// import data from "../data";

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true };
    case 'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen(){
  const [{loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  // const [Products, setProducts] = useState([]);
  useEffect(() =>{
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch(err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);
    return (
        <>
        <Helmet>
          <title>Amazona</title>
        </Helmet>
        <h1>Featured Products</h1>
        <div className="products">
        {
          loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ):(
            <Row>
              {products.map((product) =>(
                <Col sm={5} md={4} lg={3} className='mb-3'>
                  <Product product = {product}></Product>
                </Col>
              ))}
            </Row>
            )
        }
        </div>
        </>
    )
}
export default HomeScreen;