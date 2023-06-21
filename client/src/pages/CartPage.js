import React from 'react';
import Layout from './../components/Layout/Layout';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {

    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-3 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length
                                ? `You have ${cart.length} items in your cart ${auth?.token ? '' : 'Please login to checkout'}`
                                : 'Your cart is Empty'
                            }
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {
                            cart?.map(p => (
                                <div className="row mb-2 card flex-row">
                                    <div className="col-md-4" style={{ width: "18rem" }}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-image/${p._id}`} className="card-img-top" alt={p.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}...</p>
                                        <p>Price: ${p.price}</p>
                                        <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-4">CheckOut | Payment</div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage;