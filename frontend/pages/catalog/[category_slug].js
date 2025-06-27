import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../../components/products/ProductCard';
import FilterSidebar from '../../components/filters/FilterSidebar';
import { useDebounce } from '../../hooks/useDebounce';
import styles from '../../styles/Catalog.module.css';

function CategoryPage({ initialProducts, categoryName }) {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({ price_min: '', price_max: '', brand: '' });
  const debouncedFilters = useDebounce(filters, 500);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Пропускаем самый первый запуск, так как данные уже есть с сервера
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Собираем только активные (непустые) фильтры
    const activeFilters = { ...debouncedFilters };
    for (const key in activeFilters) {
      if (!activeFilters[key]) {
        delete activeFilters[key];
      }
    }
    
    const query = new URLSearchParams(activeFilters).toString();
    
    // Используем 'localhost' для запроса из браузера
    const apiUrl = `http://localhost:8000/api/products/?category=${categoryName}&${query}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const newProducts = Array.isArray(data) ? data : (data.results || []);
        setProducts(newProducts);
      })
      .catch(error => console.error("Ошибка при фильтрации товаров:", error));

  }, [debouncedFilters, categoryName]);

  return (
    <main>
      <h1 className={styles.pageTitle}>Категория: {categoryName}</h1>
      <div className={styles.mainContent}>
        <aside>
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </aside>
        <section className={styles.productGrid}>
          {products && products.length > 0 ? (
            products.map(product => ( <ProductCard key={product.id} product={product} /> ))
          ) : (
            <p>Товаров, соответствующих вашему запросу, не найдено.</p>
          )}
        </section>
      </div>
    </main>
  );
}

// Эта функция загружает данные на сервере при первом открытии страницы
export async function getServerSideProps(context) {
  const { category_slug } = context.params;
  const props = {
    initialProducts: [],
    categoryName: category_slug,
  };

  try {
    // Используем 'backend', так как этот запрос идет с сервера на сервер внутри Docker
    const res = await fetch(`http://backend:8000/api/products/?category=${category_slug}`);
    if (res.ok) {
      const data = await res.json();
      props.initialProducts = Array.isArray(data) ? data : (data.results || []);
    }
  } catch (error) { 
    console.error("getServerSideProps не смог связаться с бэкендом:", error.message);
  }
  
  return { props };
}

export default CategoryPage;