import {Button, Card } from 'react-bootstrap'
import { UseShoppingCart } from '../context/shopingCardContext'
import storeItems from '../data/items.json'
import { FormatCurrency } from '../utilities/formatCurrency'

type CartItemsProps = {
    id: number,
    quantity: number
}

export const CartItems = ({id, quantity}: CartItemsProps) =>{
    const {removeFromCart} = UseShoppingCart()
    
    const item = storeItems.find(i => i.id === id)
    if(item == null)return null
    return(
        <Card className={'h-100'}>
            <Card.Img variant={'top'} src={item.imageUrl} height={'200px'} style={{objectFit: 'cover'}}/>
            <Card.Body className={'d-flex flex-column '}>
                <Card.Title className={'d-flex justify-content-between align-items-baseline mb-4'}>
                    <span className={'fs-2'}>{item.name}</span>
                    <span className={'ms-2 text-muted'}>{FormatCurrency(item.price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    <div className={'d-flex align-items-center flex-column'} style={{gap: '.5rem'}}>
                        <Button variant={'danger'} size={'sm'} onClick={() =>{removeFromCart(id)}}>Remove</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}