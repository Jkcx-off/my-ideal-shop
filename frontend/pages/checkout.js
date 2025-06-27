import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppStore } from '../store/useAppStore';
import styles from '../styles/Checkout.module.css';
import Cookies from 'js-cookie';

function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useAppStore();
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    shipping_address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Этот хук предотвращает ошибки гидратации, связанные с доступом к localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (items.length === 0) {
      alert('Ваша корзина пуста! Пожалуйста, добавьте товары перед оформлением.');
      router.push('/');
      return;
    }
    setIsSubmitting(true);
    setError('');

    const orderData = { ...formData, items: items.map(item => ({ product_id: item.id, quantity: item.quantity })) };
    
    // Получаем токен, чтобы привязать заказ к пользователю, если он вошел
    const token = Cookies.get('access_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/orders/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        router.push('/order/success');
      } else {
        const errorData = await response.json();
        setError(`Произошла ошибка: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      setError('Не удалось связаться с сервером.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Не рендерим ничего на сервере, чтобы избежать ошибок с доступом к корзине
  if (!isClient) {
    return null;
  }
  
  return (
    <main className={styles.page}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Оформление заказа</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="customer_name">Ваше имя</label>
            <input id="customer_name" name="customer_name" type="text" value={formData.customer_name} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="customer_phone">Контактный телефон</label>
            <input id="customer_phone" name="customer_phone" type="tel" value={formData.customer_phone} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="shipping_address">Адрес доставки</label>
            <textarea id="shipping_address" name="shipping_address" value={formData.shipping_address} onChange={handleInputChange} required rows={4} />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={isSubmitting || items.length === 0} className={styles.submitButton}>
            {isSubmitting ? 'Обработка...' : 'Подтвердить заказ'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default CheckoutPage;