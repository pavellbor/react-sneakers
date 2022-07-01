import React from 'react';
import AppContext from '../context';

const Info = ({title, description, image}) => {
	const {setCartOpened} = React.useContext(AppContext);

	return (
		<div className='plug'>
			<img src={image} alt="box" />
			<h3>{title}</h3>
			<p>{description}</p>
			<button className='greenButton' onClick={() => setCartOpened(false)}><img src="img/arrow.svg" alt="arrow" /> Вернуться назад</button>
		</div>
	)
}

export default Info;