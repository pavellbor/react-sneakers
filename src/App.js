import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find(item => Number(item.parentId) === Number(obj.parentId))) {
        const removedItem = cartItems.find(item => Number(item.parentId) === Number(obj.parentId))
        axios.delete(`https://62bac0607bdbe01d528f0c93.mockapi.io/cart/${removedItem.id}`)
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.parentId)))
      } else {
        setCartItems(prev => [...prev, obj])
        const { data } = await axios.post('https://62bac0607bdbe01d528f0c93.mockapi.io/cart', obj)
        setCartItems(prev => prev.map((item) => {
          if (item.parentId === data.parentId) {
            return {
              ...item, 
              id: data.id
            }
          }
          return item
        }))
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(item => item.id === obj.id)) {
        axios.delete(`https://62bac0607bdbe01d528f0c93.mockapi.io/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => item.id !== obj.id));
      } else {
        const { data } = await axios.post('https://62bac0607bdbe01d528f0c93.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }
  }

  const onRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id != id))
    axios.delete(`https://62bac0607bdbe01d528f0c93.mockapi.io/cart/${id}`)
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  }

  React.useEffect(() => {
    async function fetchData() {

      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://62bac0607bdbe01d528f0c93.mockapi.io/cart'),
          axios.get('https://62bac0607bdbe01d528f0c93.mockapi.io/favorites'),
          axios.get('https://62bac0607bdbe01d528f0c93.mockapi.io/items')
        ])

        setIsLoading(false);
        setItems(itemsResponse.data)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
      } catch (e) {
        alert('Ошибка получения данных')
        console.error(e)
      }
    }

    fetchData()
  }, [])

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems, onAddToFavorite, onAddToCart }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Route path='/' exact>
          <Home searchValue={searchValue} onChangeSearchInput={onChangeSearchInput} setSearchValue={setSearchValue} items={items} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart} cartItems={cartItems} isLoading={isLoading} />
        </Route>
        <Route path='/favorites'>
          <Favorites onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart} />
        </Route>
        <Route path='/orders'>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
