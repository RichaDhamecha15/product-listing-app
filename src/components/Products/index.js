import { useState } from 'react';
import { Button, ButtonGroup, Row, Stack} from 'react-bootstrap';

import ProductGrid from './components/ProductGrid';
import ProductTable from './components/ProductTable';

const productsJson = require('../../data/products.json');

const Products = () => {
    const initialProducts = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : productsJson;
    const initialDisplayTable = localStorage.getItem('tableLayout') ? JSON.parse(localStorage.getItem('tableLayout')) : false; 
    const [displayTable, setDisplayTable] = useState(initialDisplayTable);
    const [products, setProducts] = useState(initialProducts);
    const toggleDisplay = (tableDisplay = false) => {
        setDisplayTable(tableDisplay);
        localStorage.setItem('tableLayout', tableDisplay)
    }
    const onAddToCart = (product) => {
        let productList = [...products]    
        let matchingProduct = productList.find((pr) => pr.product_id === product.product_id);
        if(matchingProduct.quantity < matchingProduct.limit) matchingProduct.quantity -= 1;
        else matchingProduct.limit -= 1;
        // create object to add to localstorage
        let cartProducts = {
            [product.product_id] : {
                count: 1, 
                // countKey to maintain if product's quantity was decremented or limit
                countKey: matchingProduct.quantity < matchingProduct.limit ? 'quantity' : 'limit'
            }
        };
        let cartItem = localStorage.getItem('userCart') ? JSON.parse(localStorage.getItem('userCart')) : null;
        if(cartItem){
            if(cartItem.products?.hasOwnProperty(product.product_id)){
                cartItem.products[product.product_id].count += 1;
            }
            else{
                cartItem.products[product.product_id] = {count: 1};
            }
            cartItem.products[product.product_id].countKey = matchingProduct.quantity < matchingProduct.limit ? 'quantity' : 'limit';
            localStorage.setItem('userCart', JSON.stringify({user: "test", products: cartItem.products}))
        }
        else{
            localStorage.setItem('userCart', JSON.stringify({user: "test", products: cartProducts}))
        }    
        localStorage.setItem('products', JSON.stringify(productList))
        setProducts(productList);
    }
    return (
        <Stack gap={3} style={{marginTop: '20px', marginBottom: '40px'}}>
            <Row className="justify-content-md-center" xs lg="2">
                <ButtonGroup aria-label="Basic example">
                    <Button variant={displayTable ? 'primary' : 'secondary'} 
                        onClick={() => toggleDisplay(true)}>Table</Button>
                    <Button variant={!displayTable ? 'primary' : 'secondary'} 
                        onClick={() => toggleDisplay(false)}>Grid</Button>
                </ButtonGroup>
            </Row>
            {displayTable 
                ? <ProductTable products={products} addToCart={onAddToCart} /> 
                : <ProductGrid products={products} addToCart={onAddToCart} /> }
        </Stack>
    )
}

export default Products;