import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styles from '../styles/Profile.module.css';
import { useAppStore } from '../store/useAppStore';

// Вспомогательная функция для определения CSS-класса для каждого шага статуса
const getStepStatus = (stepIndex, orderStatusIndex) => {
  if (stepIndex < orderStatusIndex) return styles.completed; // Пройденный этап
  if (stepIndex === orderStatusIndex) return styles.active;  // Текущий этап
  return ''; // Будущий этап
};

function ProfilePage({ initialProfile, initialOrders }) {
  const [profile, setProfile] = useState(initialProfile);
  const router = useRouter();
  const logoutAction = useAppStore(state => state.logout);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const token = Cookies.get('access_token');
    if (!token) {
      alert("Ваша сессия истекла. Пожалуйста, войдите снова.");
      router.push('/login');
      return;
    }
    try {
      const res = await fetch('http://localhost:8000/api/users/profile/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          username: profile.username,
          first_name: profile.first_name,
          last_name: profile.last_name
        })
      });
      if (res.ok) {
        alert("Профиль успешно обновлен!");
      } else {
        alert("Ошибка при обновлении профиля.");
      }
    } catch (error) {
      console.error("Ошибка при сохранении профиля:", error);
      alert("Не удалось связаться с сервером.");
    }
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logoutAction();
    router.push('/');
  };

  const statusSteps = ['PENDING', 'PROCESSING', 'PACKED', 'SHIPPED', 'COMPLETED'];
  const statusLabels = {
    PENDING: 'Заказ в обработке',
    PROCESSING: 'Собирается на складе',
    PACKED: 'Упакован',
    SHIPPED: 'В пути',
    COMPLETED: 'Доставлен',
    CANCELED: 'Отменен',
  };

  if (!profile) {
    return <p>Загрузка...</p>;
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Личный кабинет</h1>
      <p className={styles.greeting}>Здравствуйте, {profile.first_name || profile.username || 'Пользователь'}!</p>
      
      <div className={styles.content}>
        <section className={styles.formContainer}>
          <h4>Ваши данные</h4>
          <form onSubmit={handleSaveProfile}>
            <div className={styles.formGroup}>
              <label>ID Пользователя</label>
              <input type="text" value={profile.id || ''} readOnly disabled />
            </div>
            <div className={styles.formGroup}>
              <label>Номер телефона</label>
              <input type="text" value={profile.phone_number || ''} readOnly disabled />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username (псевдоним)</label>
              <input id="username" name="username" type="text" value={profile.username || ''} onChange={handleInputChange} />
            </div>
             <div className={styles.formGroup}>
              <label htmlFor="first_name">Имя</label>
              <input id="first_name" name="first_name" type="text" value={profile.first_name || ''} onChange={handleInputChange} />
            </div>
            <button type="submit" className={styles.saveButton}>Сохранить изменения</button>
          </form>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Выйти из аккаунта
          </button>
        </section>
        
        <section className={styles.ordersContainer}>
          <h4>История заказов</h4>
          {initialOrders && initialOrders.length > 0 ? (
            initialOrders.map(order => {
              const currentStatusIndex = statusSteps.indexOf(order.status);
              return (
                <div key={order.id} className={styles.orderItem}>
                  <div className={styles.orderHeader}>
                    <span className={styles.orderId}>Заказ №{order.id} от {new Date(order.created_at).toLocaleDateString('ru-RU')}</span>
                    <span className={styles.orderTotal}>{order.total_price} ₽</span>
                  </div>
                  <ul className={styles.statusTracker}>
                    {order.status === 'CANCELED' ? (
                      <li className={`${styles.statusStep} ${styles.completed}`}><p style={{color: '#d93025'}}>Заказ отменен</p></li>
                    ) : (
                      statusSteps.map((status, index) => (
                        <li key={status} className={`${styles.statusStep} ${getStepStatus(index, currentStatusIndex)}`}>
                          <p>{statusLabels[status]}</p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )
            })
          ) : ( <p>У вас пока нет заказов.</p> )}
        </section>
      </div>
    </main>
  );
}

// Эта функция-охранник загружает данные перед отрисовкой страницы
export async function getServerSideProps(context) {
  const token = context.req.cookies.access_token || null;
  if (!token) { return { redirect: { destination: '/login', permanent: false } }; }
  try {
    const [profileRes, ordersRes] = await Promise.all([
      fetch(`http://backend:8000/api/users/profile/`, { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch(`http://backend:8000/api/my-orders/`, { headers: { 'Authorization': `Bearer ${token}` } })
    ]);
    if (!profileRes.ok || !ordersRes.ok) {
      return { redirect: { destination: '/login', permanent: false } };
    }
    const initialProfile = await profileRes.json();
    const initialOrders = await ordersRes.json();
    return { props: { initialProfile, initialOrders } };
  } catch (error) {
    console.error("API error in profile page:", error);
    return { redirect: { destination: '/login', permanent: false } };
  }
}

export default ProfilePage;