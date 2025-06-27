import React from 'react';

// Импортируем все наши "LEGO-кубики" для главной страницы
import HeroSection from '../components/homepage/HeroSection';
import HotDeals from '../components/homepage/HotDeals';
import InfoStrip from '../components/homepage/InfoStrip';
import BestSellers from '../components/homepage/BestSellers';
import IconicCategories from '../components/homepage/IconicCategories';
import BestSale from '../components/homepage/BestSale';
import BrandsStrip from '../components/homepage/BrandsStrip';

function HomePage() {
  return (
    <main>
      {/* Собираем страницу в утвержденном порядке */}
      <HeroSection />
      <HotDeals />
      <InfoStrip />
      <BestSellers />
      <BrandsStrip />
      <IconicCategories />
      <BestSale />
    </main>
  );
}

export default HomePage;