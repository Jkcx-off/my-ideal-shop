import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppStore } from '../store/useAppStore';
import styles from '../styles/Auth.module.css';

function LoginPage() {
  const router = useRouter();
  const loginAction = useAppStore(state => state.login);
  
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const fullPhoneNumber = `+993${localPhoneNumber}`;

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: fullPhoneNumber, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        loginAction(data.access);
        router.push('/profile');
      } else {
        setError('Неверный номер телефона или пароль.');
      }
    } catch (err) {
      setError('Не удалось войти. Проверьте соединение.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Войти в аккаунт</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber">Номер телефона</label>
            <div className={styles.phoneInputContainer}>
              <span className={styles.countryCode}>+993</span>
              <input 
                id="phoneNumber"
                type="tel" 
                placeholder="65123456"
                value={localPhoneNumber} 
                onChange={e => setLocalPhoneNumber(e.target.value)} 
                required 
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <p className={styles.footerText}>
            Еще нет аккаунта? <Link href="/register">Регистрация</Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;