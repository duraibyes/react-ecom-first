import './product-card.styles.scss';
import Button from "../button/button.component";
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}) => {
    const {name,price,imageUrl} = product;
    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);
    return (
        <div className='product-card-container'>
            <img src={imageUrl} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType="inverted" type="button" onClick={addProductToCart}> Add to Cart </Button>
        </div>
    );
}

export default ProductCard