import React from 'react';
import Link from 'next/link';
import { useAppStore } from '../store/useAppStore';
import styles from '../styles/Cart.module.css';

function CartPage() {
  // Получаем все необходимое из нашего хранилища
  const { items, removeFromCart, updateQuantity, clearCart } = useAppStore();

  // Считаем итоговую сумму заказа
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Если корзина пуста, показываем специальное сообщение
  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.emptyCart}>
          <h1 className={styles.title}>Ваша корзина пуста</h1>
          <p>Похоже, вы еще ничего не добавили. Давайте это исправим!</p>
          <Link href="/">
            <button className={styles.checkoutButton}>Перейти в каталог</button>
          </Link>
        </div>
      </main>
    );
  }

  // Если товары есть, показываем основную верстку
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Ваша корзина</h1>
      <div className={styles.cartGrid}>
        {/* Заголовки таблицы */}
        <div className={styles.cartHeader}>
          <div>Товар</div>
          <div>Цена</div>
          <div>Количество</div>
          <div>Сумма</div>
          <div></div>
        </div>
        
        {/* Список товаров */}
        {items.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.productInfo}>
              <div className={styles.productImage}></div>
              <span>{item.name}</span>
            </div>
            <div>{item.price} ₽</div>
            <div>
              <input
                type="number"
                min="1"
                className={styles.quantityInput}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, e.target.value)}
              />
            </div>
            <div><strong>{(item.price * item.quantity).toFixed(2)} ₽</strong></div>
            <div>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className={styles.removeButton}
                title="Удалить товар"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Итоговая сумма и кнопки */}
      <div className={styles.summary}>
        <div className={styles.total}>
          <span>Итого:</span>{total.toFixed(2)} ₽
        </div>
        <button onClick={clearCart} className={styles.clearButton}>Очистить корзину</button>
        <Link href="/checkout">
          <button className={styles.checkoutButton}>Перейти к оформлению</button>
        </Link>
      </div>
    </main>
  );
}

export default CartPage;