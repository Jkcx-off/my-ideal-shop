import React from 'react';
import styles from './InfoStrip.module.css';
// Импортируем иконки, которые мы ранее установили
import { FiTruck, FiThumbsUp, FiShield, FiPhoneCall } from 'react-icons/fi';

function InfoStrip() {
  // Список наших преимуществ
  const advantages = [
    { icon: <FiTruck />, text: 'Бесплатная доставка при заказе от $50' },
    { icon: <FiThumbsUp />, text: 'Гарантия лучших цен и качества' },
    { icon: <FiPhoneCall />, text: 'Поддержка клиентов 24/7' },
    { icon: <FiShield />, text: 'Безопасные платежи онлайн' },
  ];
  
  return (
    <section className={styles.strip}>
      <div className={styles.container}>
        {advantages.map((adv, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.iconWrapper}>
              {adv.icon}
            </div>
            <p className={styles.text}>{adv.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InfoStrip;