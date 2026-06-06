'use client';
import { useState, useEffect } from 'react';
import { dishes as defaultDishes, categories } from '../lib/dishes';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import MenuGrid from '../components/MenuGrid';

export default function MenuPage() {
  const [activeFilter, setActiveFilter] = useState('All / ყველა');
  const [search, setSearch] = useState('');
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('dishes');
    if (saved) {
      setDishes(JSON.parse(saved));
    } else {
      setDishes(defaultDishes);
    }
  }, []);

  const availableDishes = dishes.filter(d => d.available);

  const filtered = availableDishes.filter((dish) => {
    const matchCat = activeFilter === 'All / ყველა' || dish.category === activeFilter;
    const matchSearch =
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.nameGeo.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', background: '#F7F7F5' }}>

      {/* Header */}
      <div style={{ background: '#1A3A2A', padding: '32px 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 400, color: '#fff', letterSpacing: '-0.5px', margin: 0 }}>
              Our Menu
            </h1>
            <p style={{ color: '#9FE1CB', fontSize: '13px', marginTop: '4px' }}>
              ჩვენი მენიუ
            </p>
          </div>
          <div style={{ background: '#2D6A4F', color: '#9FE1CB', fontSize: '12px', padding: '6px 12px', borderRadius: '20px' }}>
            Open now
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>{availableDishes.length}</span>
            <span style={{ color: '#9FE1CB', fontSize: '12px' }}>dishes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>{categories.length - 1}</span>
            <span style={{ color: '#9FE1CB', fontSize: '12px' }}>categories</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Filters */}
      <FilterBar
        categories={categories}
        active={activeFilter}
        onSelect={setActiveFilter}
        dishes={availableDishes}
      />

      {/* Section label */}
      <p style={{ fontSize: '11px', fontWeight: 500, color: '#9B9B97', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '16px 16px 8px' }}>
        {activeFilter === 'All / ყველა' ? 'All dishes' : activeFilter}
      </p>

      {/* Dishes */}
      <MenuGrid dishes={filtered} />

    </main>
  );
}