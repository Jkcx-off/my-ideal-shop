import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './IconicCategories.module.css';
import { FiSmartphone, FiWatch, FiHeadphones } from 'react-icons/fi'; // Пример иконок

function IconicCategories() {
  const [categories, setCategories] = useState([]);

  // Загружаем список категорий с нашего нового API
  useEffect(() => {
    fetch('http://localhost:8000/api/products/categories/')
      .then(res => res.json())
      .then(data => {
        const categoryList = Array.isArray(data) ? data : (data.results || []);
        setCategories(categoryList);
      })
      .catch(error => console.error("Ошибка при загрузке категорий:", error));
  }, []);

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Выберите категорию</h2>
      <div className={styles.grid}>
        {categories.map(category => (
          <Link key={category.id} href={`/catalog/${category.slug}`} passHref>
            <div className={styles.item}>
              <div className={styles.circle}>
                {/* Здесь будет фото, а пока - иконка */}
                <FiSmartphone />
              </div>
              <p className={styles.name}>{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default IconicCategories;