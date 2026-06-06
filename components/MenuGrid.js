import DishCard from './DishCard';

export default function MenuGrid({ dishes }) {
  if (dishes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 16px', color: '#9B9B97', fontSize: '14px' }}>
        No dishes found / კერძი ვერ მოიძებნა
      </div>
    );
  }

  return (
    <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}