import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { FiInstagram, FiSend, FiYoutube } from 'react-icons/fi'; // Иконки для соцсетей

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.column}>
          <h4 className={styles.title}>Идеальный Магазин</h4>
          <p>Ваш источник качественных и стильных товаров на каждый день.</p>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>Навигация</h4>
          <Link href="/catalog/men">Men</Link>
          <Link href="/catalog/women">Women</Link>
          <Link href="/catalog/sale">Sale</Link>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>Поддержка</h4>
          <Link href="/contact">Контакты</Link>
          <a href="#">FAQ</a>
          <a href="#">Доставка и возврат</a>
        </div>
        <div className={styles.column}>
          <h4 className={styles.title}>Соцсети</h4>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Telegram"><FiSend /></a>
            <a href="#" aria-label="YouTube"><FiYoutube /></a>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>© 2025 by Jk. Powered and secured by WebUpgrade</p>
      </div>
    </footer>
  );
}

export default Footer;