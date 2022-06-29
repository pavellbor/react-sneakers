import React from 'react';
import Card from './components/Card';
import Drawer from './components/Drawer';
import Header from './components/Header';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
  }

  React.useEffect(() => {
    fetch('https://62bac0607bdbe01d528f0c93.mockapi.io/items').then((res) => {
      return res.json();
    }).then((json) => {
      setItems(json);
    })
  }, [])

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer
        items={cartItems}
        onClose={() => setCartOpened(false)}
      />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex align-center">
            <img width={14} height={14} src="/img/search.svg" alt="Search" />
            <input placeholder='Поиск ...' />
          </div>
        </div>


        <div className="d-flex flex-wrap">
          {items.map(item => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
