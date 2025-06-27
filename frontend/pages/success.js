import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Success.module.css';

function OrderSuccessPage() {
  return (
    <main className={styles.page}>
      <div className={styles.icon}>✅</div>
      <h1 className={styles.title}>Спасибо!</h1>
      <p className={styles.message}>Ваш заказ успешно оформлен. Наш менеджер скоро свяжется с вами для подтверждения деталей.</p>
      <Link href="/">
        <button className={styles.button}>Вернуться на главную</button>
      </Link>
    </main>
  );
}

export default OrderSuccessPage;