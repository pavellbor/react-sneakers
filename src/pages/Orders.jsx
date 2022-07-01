import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';
import axios from 'axios'

function Orders({ }) {
	const [orders, setOrders] = React.useState([]);
	const {onAddToCart, onAddToFavorite} = React.useContext(AppContext)

	React.useEffect(() => {
		(async () => {
			const { data } = await axios.get('https://62bac0607bdbe01d528f0c93.mockapi.io/orders');
			setOrders(data.map((obj) => obj.items).flat())
		})()
	}, [])
	
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>Мои покупки</h1>
			</div>


			<div className="d-flex flex-wrap">
				{orders.map((item, index) => (
					<Card
						key={index}
						{...item}
					/>
				))}
			</div>
		</div>
	)
}

export default Orders;