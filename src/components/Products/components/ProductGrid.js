import { useHistory } from 'react-router-dom';
import { Button, Col, Stack, Row } from 'react-bootstrap';

import ProductDetail from './ProductDetail';

const ProductGrid = ({products, addToCart}) => {
    let history = useHistory();

    const onGoToCart = () =>  {
        history.push("/cart");
    }
    return (
        <Row>
            {products.map((product) => {
                const cartItem = localStorage.getItem('userCart') ? JSON.parse(localStorage.getItem('userCart')).products : null
                const showGoToCart = cartItem ? cartItem.hasOwnProperty(product.product_id) : false;
                const itemsLeft = product.quantity < product.limit ? product.quantity : product.limit;
                let infoText = '';
                if(product.quantity <= 10) infoText = "Hurry! Only few left in stock."
                if(product.quantity === 0) infoText = "Out of stock."
                if(product.limit === 0) infoText = "You have reached your limit of adding this item to cart."
                return(
                    <Col lg={6} style={{border: '1px solid black', padding: '10px', height: '400px'}} key={product.product_id}>
                        <ProductDetail product={product} />
                        <Stack direction="horizontal" gap={3}>
                            <span style={{color: 'red'}}>{infoText}</span>
                            {showGoToCart && 
                                <Button variant="secondary" className="ms-auto" size="sm" onClick={onGoToCart}>
                                Go to Cart
                                </Button>
                            }
                            <Button variant="primary" 
                                size="sm" 
                                className={!showGoToCart ? "ms-auto" : ""} 
                                style={{float: 'right'}} 
                                onClick={() => addToCart(product)}
                                disabled={!itemsLeft}>Add to Cart ({itemsLeft})
                            </Button>
                        </Stack>
                    </Col>
                )}
            )}
        </Row>
    )
}

export default ProductGrid;