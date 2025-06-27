import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Импортируем компоненты Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import ProductCard from '../products/ProductCard'; // Наш уже готовый компонент!
import styles from './BestSellers.module.css';

// Импортируем базовые стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';

function BestSellers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Загружаем товары с нашего API
    fetch('http://localhost:8000/api/products/')
      .then(res => res.json())
      .then(data => {
        const productList = Array.isArray(data) ? data : (data.results || []);
        setProducts(productList);
      })
      .catch(error => console.error("Ошибка при загрузке бестселлеров:", error));
  }, []);

  // Если товаров еще нет, не показываем блок
  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Хиты продаж</h2>
      <Swiper
        modules={[Navigation, Autoplay]} // Подключаем модули навигации и автопрокрутки
        spaceBetween={30} // Расстояние между слайдами
        slidesPerView={4} // Количество видимых слайдов (для широких экранов)
        navigation // Включаем стрелки "вперед/назад"
        loop={true} // Бесконечная прокрутка
        autoplay={{
          delay: 3500, // Задержка 3.5 секунды
          disableOnInteraction: true, // Отключать после взаимодействия пользователя
        }}
        // Настройки для разных размеров экрана
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1200: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className={styles.carousel}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.viewAllContainer}>
        <Link href="/catalog/all" className={styles.viewAllButton}>Смотреть все</Link>
      </div>
    </section>
  );
}

export default BestSellers;