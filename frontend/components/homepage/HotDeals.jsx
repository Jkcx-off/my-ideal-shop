import React from 'react';
import Link from 'next/link';
import styles from './HotDeals.module.css';

function HotDeals() {
  return (
    <section className={styles.section}>
      <Link href="/catalog/sale" className={`${styles.dealCard} ${styles.dealCard1}`}>
        <div className={styles.cardContent}>
          <h3 className={styles.subtitle}>Горячее предложение</h3>
          <h2 className={styles.title}>Скидки до 50%</h2>
          <div className={styles.button}>Купить сейчас</div>
        </div>
      </Link>
      <Link href="/catalog/women" className={`${styles.dealCard} ${styles.dealCard2}`}>
        <div className={styles.cardContent}>
          <h3 className={styles.subtitle}>Новая коллекция</h3>
          <h2 className={styles.title}>Одежда для неё</h2>
          <div className={styles.button}>Смотреть</div>
        </div>
      </Link>
    </section>
  );
}

export default HotDeals;