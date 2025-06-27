import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppStore } from '../store/useAppStore';
import styles from '../styles/Auth.module.css';

function RegisterPage() {
  const router = useRouter();
  const loginAction = useAppStore(state => state.login);
  
  const [formData, setFormData] = useState({
    localPhoneNumber: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData.password !== formData.password2) {
      setError('Пароли не совпадают.');
      return;
    }
    
    setIsSubmitting(true);

    const fullPhoneNumber = `+993${formData.localPhoneNumber}`;

    try {
      // ШАГ 1: РЕГИСТРАЦИЯ нового пользователя
      const registerRes = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: formData.localPhoneNumber,
          password: formData.password,
          password2: formData.password2
        }),
      });

      const registerData = await registerRes.json();
      
      if (!registerRes.ok) {
        // Если регистрация не удалась, показываем ошибку от бэкенда
        const errorMessage = Object.values(registerData).join(' ');
        throw new Error(errorMessage);
      }
      
      // ШАГ 2: АВТОМАТИЧЕСКИЙ ВХОД после успешной регистрации
      const loginRes = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: fullPhoneNumber, password: formData.password }),
      });
      
      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error("Аккаунт создан, но не удалось автоматически войти. Пожалуйста, войдите вручную.");

      loginAction(loginData.access);
      router.push('/profile');
      
    } catch (err) {
      setError(err.message || 'Произошла неизвестная ошибка.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Создание аккаунта</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="localPhoneNumber">Номер телефона</label>
            <div className={styles.phoneInputContainer}>
              <span className={styles.countryCode}>+993</span>
              <input 
                id="localPhoneNumber" 
                name="localPhoneNumber"
                type="tel" 
                placeholder="65123456" 
                value={formData.localPhoneNumber} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input type="password" id="password" name="password" required value={formData.password} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password2">Повторите пароль</label>
            <input type="password" id="password2" name="password2" required value={formData.password2} onChange={handleInputChange} />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? 'Создание...' : 'Зарегистрироваться'}
          </button>
        </form>
        <p className={styles.footerText}>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </p>
      </div>
    </main>
  );
}

export default RegisterPage;