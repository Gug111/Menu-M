const categoryConfig = {
  'All / ყველა':                { bg: '#F7F7F5', border: '#E8E8E4', text: '#1A1A1A', sub: '#9B9B97' },
  'Hot / ცხელი':                { bg: '#FEF0E6', border: '#FDDCBE', text: '#C05A1F', sub: '#E8956B' },
  'Cold / ცივი':                { bg: '#EAF3FB', border: '#BDD9F5', text: '#185FA5', sub: '#6AAEE0' },
  'Desserts / დესერტი':         { bg: '#FEF0F5', border: '#F9C8DC', text: '#993556', sub: '#D4537E' },
  'Drinks / სასმელი':           { bg: '#EAF7FB', border: '#B8E8F5', text: '#0E7490', sub: '#38BDF8' },
  'Vegetarian / ვეგეტარიანული': { bg: '#EAF4EE', border: '#B8DFC3', text: '#2D6A4F', sub: '#6BAE88' },
};

export default function FilterBar({ categories, active, onSelect, dishes }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      padding: '12px 16px',
      background: '#fff',
      borderBottom: '0.5px solid #EFEFED'
    }}>
      {categories.map((cat) => {
        const config = categoryConfig[cat] || categoryConfig['All / ყველა'];
        const count = cat === 'All / ყველა'
          ? dishes.length
          : dishes.filter(d => d.category === cat).length;
        const isActive = active === cat;

        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '12px 8px',
              borderRadius: '14px',
              border: `1.5px solid ${isActive ? '#1A3A2A' : config.border}`,
              background: isActive ? '#1A3A2A' : config.bg,
              cursor: 'pointer',
              WebkitAppearance: 'none',
              appearance: 'none',
              WebkitTapHighlightColor: 'rgba(0,0,0,0)',
              touchAction: 'manipulation',
              outline: 'none',
            }}
          >
            <span style={{
              fontSize: '13px',
              fontWeight: 500,
              color: isActive ? '#fff' : config.text,
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              {cat}
            </span>
            <span style={{
              fontSize: '11px',
              color: isActive ? '#9FE1CB' : config.sub,
              pointerEvents: 'none'
            }}>
              {count} dishes
            </span>
          </button>
        );
      })}
    </div>
  );
}