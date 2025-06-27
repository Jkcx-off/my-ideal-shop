import '../styles/globals.css';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAppStore } from '../store/useAppStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  // Получаем из нашего store действие для проверки статуса входа
  const checkAuth = useAppStore(state => state.checkAuth);
  const router = useRouter();

  // Этот эффект запускается один раз при загрузке приложения 
  // и затем при каждой смене страницы.
  // Он проверяет, есть ли у пользователя токен в cookie, чтобы правильно
  // отобразить "Войти" или "Личный кабинет" в хедере.
  useEffect(() => {
    checkAuth();
  }, [checkAuth, router.asPath]); // Зависимость от смены пути, чтобы хедер обновлялся

  return (
    // Этот div отвечает за то, чтобы футер всегда был прижат к низу страницы
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;