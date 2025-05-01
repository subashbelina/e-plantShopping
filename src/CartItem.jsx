import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import PropTypes from 'prop-types';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount);

    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            amount: item.quantity + 1
        }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                amount: item.quantity - 1
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const calculateTotalCost = (item) => {
        return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
    };

    const handleCheckoutShopping = () => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Price: {item.cost}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleDecrement(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleIncrement(item)}>+</button>
                                    </div>
                                    <p>Subtotal: ${calculateTotalCost(item)}</p>
                                    <button 
                                        className="remove-button"
                                        onClick={() => handleRemove(item)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Total: ${totalAmount.toFixed(2)}</h3>
                        <div className="cart-buttons">
                            <button onClick={onContinueShopping}>Continue Shopping</button>
                            <button onClick={handleCheckoutShopping}>Checkout</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

CartItem.propTypes = {
    onContinueShopping: PropTypes.func.isRequired
};

export default CartItem;


