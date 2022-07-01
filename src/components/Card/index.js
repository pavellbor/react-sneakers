import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';

function Card({ id, title, imageUrl, price, onFavorite, onPlus, favorited = false, added = false, loading = false }) {
	const { isItemAdded } = React.useContext(AppContext)
	const [isFavorite, setIsFavorite] = React.useState(favorited);
	const obj = { id, parentId: id, title, imageUrl, price }

	const onClickFavorite = () => {
		setIsFavorite(!isFavorite);
		onFavorite(obj)
	}

	const onClickPlus = () => {
		onPlus(obj)
	}

	return (
		<div className={styles.card}>
			{
				loading ? (
					<ContentLoader
						speed={2}
						width={150}
						height={187}
						viewBox="0 0 150 187"
						backgroundColor="#f3f3f3"
						foregroundColor="#ecebeb"
					>
						<rect x="0" y="0" rx="0" ry="0" width="150" height="90" />
						<rect x="0" y="105" rx="0" ry="0" width="150" height="15" />
						<rect x="0" y="130" rx="0" ry="0" width="90" height="15" />
					</ContentLoader>
				) : (
					<>
						{onFavorite &&
							<div className={styles.favorite} onClick={onClickFavorite}>
								<img src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} width={32} height={32} alt="unliked" />
							</div>
						}
						<img width={133} height={112} src={imageUrl} alt="Sneakers" />
						<h5>{title}</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column ">
								<span>Цена:</span>
								<b>{price} руб.</b>
							</div>
							{onPlus && <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'} alt="Plus" />}
						</div>
					</>
				)
			}
		</div>
	)
}

export default Card;