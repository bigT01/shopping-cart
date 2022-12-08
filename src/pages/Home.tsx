import { UseShoppingCart } from "../context/shopingCardContext";
import { CartItems as CItem } from '../components/CartItems';
import {Button, Col, Row } from 'react-bootstrap';
import storeItems from '../data/items.json'

const Home = () => {
    const { cartItems, removeFromCart } = UseShoppingCart()

    const handleRemoveAll = () => {
        for (let i=0; i<cartItems.length; i++){
            removeFromCart(cartItems[i].id)
        }
    }

    return(
        <>
            <h1 className={'mb-5'}>
                Your cart
            </h1>
            <Row md={2} xs={1} lg={3} className={'g-3 mb-5'}>
                {cartItems.map(item => (
                    <Col key={item.id}>
                        <CItem {...item}/>
                    </Col>
                ))}
                <Col>

                </Col>
            </Row>
            {cartItems.length ? <div className={'d-flex flex-column g-3 align-items-center'}>
                <h1 className={'text-center'}>Total: {cartItems.reduce((total, cartItem) => {
                    const item = storeItems.find(i => i.id === cartItem.id)
                    return total + (item?.price || 0) * (cartItem?.quantity || 0)
                }, 0)}</h1>
                <Button size={'lg'} onClick={() =>{handleRemoveAll()}}>Pay</Button>
            </div>: null
            }


        </>
    )
}
export default Home