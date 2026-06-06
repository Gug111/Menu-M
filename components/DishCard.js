const tagConfig = {
  'Hot / ცხელი':                { label: 'Hot / ცხელი',     style: { background: '#FEF0E6', color: '#C05A1F' } },
  'Cold / ცივი':                { label: 'Cold / ცივი',     style: { background: '#EAF3FB', color: '#185FA5' } },
  'Desserts / დესერტი':         { label: 'Sweet / დესერტი', style: { background: '#FEF0F5', color: '#993556' } },
  'Drinks / სასმელი':           { label: 'Drink / სასმელი', style: { background: '#EAF7FB', color: '#0E7490' } },
  'Vegetarian / ვეგეტარიანული': { label: 'Veg / ვეგ',       style: { background: '#EAF4EE', color: '#2D6A4F' } },
};

export default function DishCard({ dish }) {
  if (!dish.available) return null;

  const tag = tagConfig[dish.category];

  return (
    <div style={{
      background: '#fff', border: '0.5px solid #EFEFED',
      borderRadius: '16px', display: 'flex',
      gap: '12px', padding: '12px', alignItems: 'center'
    }}>
     {dish.image && (
  <div style={{
    width: '72px', height: '72px', borderRadius: '12px',
    flexShrink: 0, overflow: 'hidden', background: '#F7F7F5',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  }}>
    <img
      src={dish.image}
      alt={dish.name}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
)}
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 500, fontSize: '14px', color: '#1A1A1A', margin: 0 }}>
          {dish.name}
        </p>
        <p style={{ fontSize: '12px', color: '#9B9B97', margin: '2px 0 4px' }}>
          {dish.nameGeo}
        </p>
        <p style={{ fontSize: '12px', color: '#6B6B6B', marginBottom: '8px', lineHeight: 1.4 }}>
          {dish.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontWeight: 500, fontSize: '15px', color: '#C05A1F', margin: 0 }}>
            ₾{dish.price.toFixed(2)}
          </p>
          {tag && (
            <span style={{ ...tag.style, fontSize: '11px', padding: '3px 8px', borderRadius: '8px', fontWeight: 500 }}>
              {tag.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}