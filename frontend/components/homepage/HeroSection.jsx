import React from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.css';

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Стиль, который говорит за вас
        </h1>
        <p className={styles.subtitle}>
          Откройте для себя новые коллекции, созданные для того, чтобы подчеркнуть вашу индивидуальность.
        </p>
        <div className={styles.actions}>
          <Link href="/catalog/new" className={styles.buttonPrimary}>
            К новинкам
          </Link>
          <Link href="/catalog/sale" className={styles.buttonSecondary}>
            Распродажа
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;