export default function SearchBar({ value, onChange }) {
  return (
    <div style={{
      padding: '12px 16px',
      background: '#fff',
      borderBottom: '0.5px solid #EFEFED'
    }}>
      <input
        type="text"
        placeholder="🔍  Search dishes... / ძებნა"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 16px',
          borderRadius: '12px',
          border: '0.5px solid #E8E8E4',
          background: '#F7F7F5',
          fontSize: '14px',
          color: '#1A1A1A',
          outline: 'none',
          fontFamily: 'inherit'
        }}
      />
    </div>
  );
}