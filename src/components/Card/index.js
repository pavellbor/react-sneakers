import React from 'react';
import styles from './Card.module.scss';

function Card({ title, imageUrl, price, onFavorite, onPlus }) {
	const [isAdded, setIsAdded] = React.useState(false);

	const onClickPlus = () => {
		setIsAdded(!isAdded);
		onPlus({ title, imageUrl, price })
	}

	return (
		<div className={styles.card}>
			<div className={styles.favorite} onClick={onFavorite}>
				<img src='/img/heart-unliked.svg' width={32} height={32} alt="unliked" />
			</div>
			<img width={133} height={112} src={imageUrl} alt="Sneakers" />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column ">
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
				<img className={styles.plus} onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="Plus" />
			</div>
		</div>
	)
}

export default Card;