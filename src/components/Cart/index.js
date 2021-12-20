import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';

const productsJson = require('../../data/products.json');

const Cart = () => {
    const initialCartItems = localStorage.getItem('userCart') ? JSON.parse(localStorage.getItem('userCart')).products : null;
    const [cartItems, setCartItems] = useState(initialCartItems);
    // calculate sum of products price in cart
    const getSum = () => {
        let sum = 0;
        Object.keys(cartItems).forEach((item) => {
            const product = productsJson.find((pr) => pr.product_id === item);
            sum += (product.unit_price * cartItems[item].count)
        });
        return sum;
    }
    const onRemoveFromCart = (product) => {
        const products = localStorage.getItem('products') && JSON.parse(localStorage.getItem('products'));
        let updatedCartItems = {...cartItems};
        let matchingCartProduct = updatedCartItems[product.product_id];
        // remove product from userCart object in localstorage
        delete updatedCartItems[product.product_id];
        // update products latest state in localstorage by updating quantity or limit
        let matchingProduct = products.find((pr) => pr.product_id === product.product_id);
        // find matching countKey and add it to product's quantity or limit
        if(matchingCartProduct.countKey === 'limit') matchingProduct.limit += matchingCartProduct.count;
        else matchingProduct.quantity += matchingCartProduct.count;
        localStorage.setItem('products', JSON.stringify(products))
        localStorage.setItem('userCart', JSON.stringify({user: "test", products: updatedCartItems}))
        setCartItems(updatedCartItems);
    }
    if(!cartItems) return 
    return (
        <Row style={{marginTop: '20px', marginBottom: '40px'}}>
            <Link to="/">Go back to Product List</Link>
            <h2>My Cart({Object.keys(cartItems).length})</h2>
            {Object.keys(cartItems).map((item) => {
                    const product = productsJson.find((pr) => pr.product_id === item);
                    return (
                        <div key={item} style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                            <div>
                                <h6>{product.product_name}({cartItems[item].count})</h6>
                                <Button variant="outline-secondary" 
                                    size="sm"
                                    onClick={() => onRemoveFromCart(product)}>Remove
                                </Button>
                            </div>
                            <h5>${product.unit_price}</h5>
                        </div>
                        
                    );
                }                
            )}
            <hr style={{marginTop: '10px'}}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h6>Total</h6>
                <h5>${getSum()}</h5>
            </div>
        </Row>
    )
}

export default Cart;