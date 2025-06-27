import React, { useState } from 'react';
import styles from '../../styles/ProductPage.module.css';
import { useAppStore } from '../../store/useAppStore';

function ProductDetailPage({ product }) {
  const addToCart = useAppStore(state => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);

  // Подстраховка на случай, если что-то пошло не так при загрузке данных
  if (!product) {
    return <main><p>Товар не найден...</p></main>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        
        {/* Левая колонка с фото */}
        <div className={styles.imageContainer}>
          [Фотография товара]
        </div>

        {/* Правая колонка с информацией */}
        <div className={styles.info}>
          <p className={styles.brand}>{product.brand || 'Бренд не указан'}</p>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>{product.price} ₽</p>
          <p className={styles.description}>{product.description}</p>
          
          <button 
            className={styles.cartButton}
            onClick={handleAddToCart}
            disabled={isAdded}
            style={{ backgroundColor: isAdded ? '#28a745' : 'var(--primary-color)' }}
          >
            {isAdded ? 'Добавлено ✓' : 'Добавить в корзину'}
          </button>
        </div>

      </div>
    </main>
  );
}

// Эта функция загружает данные для ОДНОГО товара на сервере
export async function getServerSideProps(context) {
  const { product_id } = context.params;
  let product = null;

  try {
    const res = await fetch(`http://backend:8000/api/products/${product_id}/`);
    
    // Если товар с таким ID не найден, показываем страницу 404
    if (!res.ok) { 
      return { notFound: true }; 
    }
    
    product = await res.json();

  } catch (error) {
    console.error(`Fetch error for product ${product_id}:`, error);
    return { notFound: true }; // Если бэкенд недоступен, тоже 404
  }
  
  return { props: { product } };
}

export default ProductDetailPage;