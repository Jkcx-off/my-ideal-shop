import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css';
import { useAppStore } from '../../store/useAppStore';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMapPin, FiLogOut } from 'react-icons/fi';

function Header() {
  const router = useRouter();
  const { isLoggedIn, checkAuth, items, logout } = useAppStore();
  const cartItemCount = items.reduce((total, item) => total + (item.quantity || 0), 0);
  
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, router.asPath]);

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setIsSearchActive(false); // Скрываем поиск, если отправили пустую строку
      return;
    }
    router.push(`/search?q=${searchQuery}`);
    setIsSearchActive(false);
    setSearchQuery('');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.mainBar}>
        <div className={styles.logo}>
          <Link href="/">ИДЕАЛЬНЫЙ МАГАЗИН</Link>
        </div>

        <div className={styles.searchWrapper}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <FiSearch className={styles.searchIcon} />
            <input 
              type="text" 
              name="search" 
              placeholder="Поиск..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className={styles.userActions}>
          <Link href="/contact" className={styles.iconLink} title="Адреса магазинов"><FiMapPin /></Link>
          
          {isLoggedIn ? (
            <Link href="/profile" className={styles.profileLink}>Мой Профиль</Link>
          ) : (
            <Link href="/login" className={styles.iconLink}><FiUser /> <span>Войти</span></Link>
          )}

          <Link href="#" className={styles.iconLink} title="Избранное"><FiHeart /></Link>

          <Link href="/cart" className={styles.cart} title="Корзина">
            <FiShoppingCart /> 
            {cartItemCount > 0 && <span className={styles.cartCounter}>{cartItemCount}</span>}
          </Link>

          {isLoggedIn && (
             <button onClick={handleLogout} className={styles.iconLink} title="Выйти"><FiLogOut /></button>
          )}
        </div>
      </div>
      
      <div className={styles.bottomNav}>
        <nav className={styles.categoryNav}>
          <Link href="/catalog/sale" className={styles.saleLink}>SALE</Link>
          <Link href="/catalog/new">New Arrivals</Link>
          <Link href="/catalog/men">Men</Link>
          <Link href="/catalog/women">Women</Link>
          <Link href="/catalog/shoes-accessories">Shoes & Accessories</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;