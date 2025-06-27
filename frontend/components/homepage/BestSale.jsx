import React from 'react';
import Link from 'next/link';
import styles from './BestSale.module.css';

function BestSale() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {/* Здесь будет большое фото продукта */}
        </div>
        <div className={styles.contentContainer}>
          <p className={styles.subtitle}>BEST SALE</p>
          <h2 className={styles.title}>Финальная Распродажа Сезона</h2>
          <p className={styles.description}>
            Не упустите шанс приобрести наши лучшие товары с невероятной скидкой. Качество и стиль, которые вы любите, теперь еще доступнее.
          </p>
          <Link href="/catalog/sale" passHref>
            <button className={styles.button}>Перейти к скидкам</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BestSale;