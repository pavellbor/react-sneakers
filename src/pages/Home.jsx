import React from 'react';
import Card from '../components/Card';

function Home({ searchValue,
	onChangeSearchInput,
	setSearchValue,
	items,
	onAddToFavorite,
	onAddToCart,
	cartItems,
	isLoading }) {


	const renderItems = () => {
		const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
		return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
			<Card
				key={index}
				onFavorite={(obj) => onAddToFavorite(obj)}
				onPlus={(obj) => onAddToCart(obj)}
				loading={isLoading}
				{...item}
			/>
		))
	}
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
				<div className="search-block d-flex align-center">
					<img width={14} height={14} src="/img/search.svg" alt="Search" />
					<input onChange={onChangeSearchInput} placeholder='Поиск ...' value={searchValue} />
					{searchValue && <img className="clear cu-p" src="/img/btn-remove.svg" alt="Remove" onClick={() => setSearchValue('')} />}
				</div>
			</div>


			<div className="d-flex flex-wrap">
				{renderItems()}
			</div>
		</div>
	)
}

export default Home;