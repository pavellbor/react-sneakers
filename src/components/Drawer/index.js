import React from 'react';
import axios from 'axios';

import AppContext from '../../context';
import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss'

function Drawer({ items = [], onRemove, opened }) {
	const { setCartOpened } = React.useContext(AppContext)
	const [isOrderComplete, setIsOrderComplete] = React.useState(false)
	const [orderId, setOrderId] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)
	const { cartItems, setCartItems, totalPrice } = useCart()


	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post('https://62bac0607bdbe01d528f0c93.mockapi.io/orders', { items: cartItems })
			setIsOrderComplete(true)
			setOrderId(data.id)
			setCartItems([])

			cartItems.forEach(item => axios.delete('https://62bac0607bdbe01d528f0c93.mockapi.io/cart/' + item.id))
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : '' }`}>
			<div className={styles.drawer}>
				<h2 className='d-flex justify-between mb-30'>
					Корзина
					<img className="cu-p" src="/img/btn-remove.svg" alt="Remove" onClick={() => setCartOpened(false)} />
				</h2>
				{items.length > 0 ? (
					<>
						<div className='items'>
							{items.map((item) => (
								<div className='cartItem d-flex align-center mb-20' key={item.id}>
									<div style={{ backgroundImage: `url(${item.imageUrl})` }} className="cartItemImg"></div>
									<div className='mr-20'>
										<p className='mb-5'>{item.title}</p>
										<b>{item.price} руб.</b>
									</div>
									<img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" onClick={() => onRemove(item.id)} />
								</div>
							))}
						</div>
						<div className='cartTotalBlock'>
							<ul className='cartTotalBlock'>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>{Math.round(totalPrice / 100 * 5)} руб.</b>
								</li>
							</ul>
							<button disabled={isLoading} className='greenButton' onClick={onClickOrder}>Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
						</div>
					</>
				) : (
					<Info
						title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
						image={isOrderComplete ? '/img/cart-success.png' : "/img/cart-box.png"}
					/>
				)}
			</div>
		</div >
	)
}

export default Drawer;