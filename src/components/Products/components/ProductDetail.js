import { Image } from 'react-bootstrap';

const ProductDetail = ({product}) => {    
    return (
    <>
        <div style={{height: '50%', width: '50%', margin:'auto'}}>
            <Image src={product.image} thumbnail 
                style={{objectFit: 'contain', width: '100%', height: '100%'}}
            />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
            <h5>{product.product_name}</h5>
            <h3>${product.unit_price}</h3>
        </div>
        <div style={{width: '100%', 
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '15px'}}>
            {product.product_description}
        </div>
    </>)
}

export default ProductDetail;