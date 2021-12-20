import { useHistory } from 'react-router-dom';
import { Button, Image, Stack, Table } from 'react-bootstrap';

const ProductTable = ({products, addToCart}) => {
    let history = useHistory();

    const onGoToCart = () =>  {
        history.push("/cart");
    }
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => {
                const cartItem = localStorage.getItem('userCart') ? JSON.parse(localStorage.getItem('userCart')).products : null
                const showGoToCart = cartItem ? cartItem.hasOwnProperty(product.product_id) : false;
                const itemsLeft = product.quantity < product.limit ? product.quantity : product.limit;
                let infoText = '';
                if(product.quantity <= 10) infoText = "Hurry! Only few left in stock."
                if(product.quantity === 0) infoText = "Out of stock."
                if(product.limit === 0) infoText = "You have reached your limit of adding this item to cart."
                return (<tr key={product.product_id}>
                        <td>
                            <Image src={product.image} rounded style={{height: '100px', width: '100px'}}/>
                        </td>
                        <td>{product.product_name}</td>
                        <td style={{width: '40%'}}>{product.product_description}</td>
                        <td>${product.unit_price}</td>
                        <td>
                            <Stack gap={3}>
                            <Button variant="primary" size="sm" onClick={() => addToCart(product)} disabled={!itemsLeft}>Add to Cart ({itemsLeft})</Button>
                            {showGoToCart && <Button variant="secondary" size="sm" onClick={onGoToCart}>Go to Cart</Button>}
                            <span style={{color: 'red'}}>{infoText}</span>
                            </Stack>
                        </td>
                    </tr>)}
                )}
            </tbody>
        </Table>
    )
}

export default ProductTable;