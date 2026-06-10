'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { dishes as defaultDishes, categories } from '../../../lib/dishes';

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [form, setForm] = useState({
    name: '', nameGeo: '', description: '',
    category: 'Hot / ცხელი', price: '', emoji: '', image: null
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split(';').map(c => c.trim());
      const isAuth = cookies.some(c => c === 'adminAuth=true');
      if (!isAuth) {
        window.location.href = '/admin';
        return;
      }
      setAuthorized(true);
      setDishes(defaultDishes);
    }
  }, []);

  function handleImageUpload(e, isEdit = false) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit) {
        setEditForm(prev => ({ ...prev, image: reader.result }));
      } else {
        setForm(prev => ({ ...prev, image: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  }

  function addDish() {
    if (!form.name || !form.price) return;
    const updated = [...dishes, {
      id: Date.now(), ...form,
      price: parseFloat(form.price), available: true
    }];
    setDishes(updated);
    setForm({ name:'', nameGeo:'', description:'', category:'Hot / ცხელი', price:'', emoji:'', image: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function startEdit(dish) {
    setEditingId(dish.id);
    setEditForm({ ...dish, price: dish.price.toString(), emoji: dish.emoji || '' });
  }

  function saveEdit() {
    const updated = dishes.map(d =>
      d.id === editingId ? { ...editForm, price: parseFloat(editForm.price) } : d
    );
    setDishes(updated);
    setEditingId(null);
    setEditForm({});
  }

  function toggleDish(id) {
    const updated = dishes.map(d => d.id === id ? { ...d, available: !d.available } : d);
    setDishes(updated);
  }

  function deleteDish(id) {
    const dish = dishes.find(d => d.id === id);
    const updatedDishes = dishes.filter(d => d.id !== id);
    const updatedDeleted = [...deleted, dish];
    setDishes(updatedDishes);
    setDeleted(updatedDeleted);
  }

  function restoreDish(id) {
    const dish = deleted.find(d => d.id === id);
    const updatedDeleted = deleted.filter(d => d.id !== id);
    const updatedDishes = [...dishes, dish];
    setDishes(updatedDishes);
    setDeleted(updatedDeleted);
  }

  function permanentDelete(id) {
    const updatedDeleted = deleted.filter(d => d.id !== id);
    setDeleted(updatedDeleted);
  }

 function logout() {
    document.cookie = 'adminAuth=; path=/; max-age=0';
    window.location.href = '/admin';
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    borderRadius: '10px', border: '0.5px solid #E8E8E4',
    background: '#F7F7F5', fontSize: '13px',
    color: '#1A1A1A', outline: 'none', fontFamily: 'inherit'
  };

  if (!authorized) {
    return (
      <main style={{ minHeight: '100vh', background: '#F7F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#9B9B97', fontSize: '14px' }}>Checking access...</p>
      </main>
    );
  }

  return (
    <main style={{ background: '#F7F7F5', minHeight: '100vh', maxWidth: '480px', margin: '0 auto' }}>

      <div style={{
        background: '#1A3A2A', padding: '28px 20px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
      }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 500, color: '#fff', margin: 0 }}>
            Admin Panel
          </h1>
          <p style={{ color: '#9FE1CB', fontSize: '12px', margin: 0 }}>
            მენიუს მართვა · {dishes.length} dishes
          </p>
        </div>
        <button onClick={logout} style={{
          background: 'rgba(255,255,255,0.1)', border: '0.5px solid rgba(255,255,255,0.2)',
          color: '#fff', fontSize: '13px', padding: '8px 14px',
          borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit'
        }}>
          Logout
        </button>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        <div style={{
          background: '#fff', border: '0.5px solid #EFEFED',
          borderRadius: '18px', padding: '18px',
          display: 'flex', flexDirection: 'column', gap: '10px'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A', margin: 0 }}>
            + Add New Dish / ახალი კერძის დამატება
          </h2>
          <input placeholder="Name (EN)" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            style={inputStyle} />
          <input placeholder="სახელი (ქართული)" value={form.nameGeo}
            onChange={e => setForm({...form, nameGeo: e.target.value})}
            style={inputStyle} />
          <input placeholder="Description / აღწერა" value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            style={inputStyle} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <select value={form.category}
              onChange={e => setForm({...form, category: e.target.value})}
              style={{ ...inputStyle, flex: 1 }}>
              {categories.filter(c => c !== 'All / ყველა').map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input placeholder="Price ₾" value={form.price}
              onChange={e => setForm({...form, price: e.target.value})}
              style={{ ...inputStyle, width: '90px' }} />
          </div>
          <div>
            <input
              type="file" accept="image/*" ref={fileInputRef}
              onClick={(e) => { e.target.value = null; }}
              onChange={(e) => handleImageUpload(e, false)}
              style={{ display: 'none' }}
            />
            <button onClick={() => fileInputRef.current.click()} style={{
              width: '100%', padding: '10px', borderRadius: '10px',
              border: '0.5px dashed #B8DFC3', background: '#EAF4EE',
              color: '#2D6A4F', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit'
            }}>
              {form.image ? '✅ Photo selected' : '📷 Upload Photo (optional)'}
            </button>
            {form.image && (
              <img src={form.image} alt="preview"
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', marginTop: '8px' }} />
            )}
          </div>
          <button onClick={addDish} style={{
            width: '100%', padding: '12px', background: '#1A3A2A', color: '#fff',
            border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit'
          }}>
            Add Dish / კერძის დამატება
          </button>
        </div>

        <p style={{ fontSize: '11px', color: '#9B9B97', fontWeight: 500,
                    textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 4px' }}>
          {dishes.length} dishes / კერძი
        </p>

        {dishes.map(d => (
          <div key={d.id}>
            {editingId !== d.id ? (
              <div style={{
                background: '#fff', border: '0.5px solid #EFEFED',
                borderRadius: '16px', padding: '14px',
                display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                {d.image && (
                  <div style={{
                    width: '52px', height: '52px', background: '#F7F7F5',
                    borderRadius: '12px', flexShrink: 0, overflow: 'hidden'
                  }}>
                    <img src={d.image} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A', margin: 0 }}>
                    {d.name}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9B9B97', margin: '2px 0 0' }}>
                    {d.nameGeo} · ₾{d.price.toFixed(2)}
                  </p>
                </div>
                <button onClick={() => startEdit(d)} style={{
                  padding: '6px 10px', borderRadius: '8px',
                  border: '0.5px solid #E8E8E4', background: '#F7F7F5',
                  color: '#1A1A1A', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit'
                }}>Edit</button>
                <button onClick={() => toggleDish(d.id)} style={{
                  width: '40px', height: '24px', borderRadius: '12px',
                  border: 'none', cursor: 'pointer',
                  backgroundColor: d.available ? '#1A3A2A' : '#D1D5DB',
                  position: 'relative', flexShrink: 0, transition: 'background-color 0.2s'
                }}>
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '50%',
                    backgroundColor: 'white', position: 'absolute',
                    top: '4px', left: d.available ? '20px' : '4px', transition: 'left 0.2s'
                  }} />
                </button>
                <button onClick={() => deleteDish(d.id)} style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  border: '0.5px solid #FDDCDC', background: '#FEF5F5',
                  color: '#C03030', fontSize: '14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>✕</button>
              </div>
            ) : (
              <div style={{
                background: '#fff', border: '1.5px solid #1A3A2A',
                borderRadius: '16px', padding: '16px',
                display: 'flex', flexDirection: 'column', gap: '10px'
              }}>
                <h3 style={{ fontSize: '13px', fontWeight: 500, color: '#1A3A2A', margin: 0 }}>
                  Editing: {d.name}
                </h3>
                <input value={editForm.name}
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                  placeholder="Name (EN)" style={inputStyle} />
                <input value={editForm.nameGeo}
                  onChange={e => setEditForm({...editForm, nameGeo: e.target.value})}
                  placeholder="სახელი (ქართული)" style={inputStyle} />
                <input value={editForm.description}
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                  placeholder="Description" style={inputStyle} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select value={editForm.category}
                    onChange={e => setEditForm({...editForm, category: e.target.value})}
                    style={{ ...inputStyle, flex: 1 }}>
                    {categories.filter(c => c !== 'All / ყველა').map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <input value={editForm.price}
                    onChange={e => setEditForm({...editForm, price: e.target.value})}
                    placeholder="Price ₾" style={{ ...inputStyle, width: '90px' }} />
                </div>
                <div>
                  <input
                    type="file" accept="image/*"
                    id={`edit-file-${d.id}`}
                    onClick={(e) => { e.target.value = null; }}
                    onChange={(e) => handleImageUpload(e, true)}
                    style={{ display: 'none' }}
                  />
                  <button onClick={() => document.getElementById(`edit-file-${d.id}`).click()} style={{
                    width: '100%', padding: '10px', borderRadius: '10px',
                    border: '0.5px dashed #B8DFC3', background: '#EAF4EE',
                    color: '#2D6A4F', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit'
                  }}>
                    {editForm.image ? '✅ Photo selected — click to change' : '📷 Upload New Photo'}
                  </button>
                  {editForm.image && (
                    <img src={editForm.image} alt="preview"
                      style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', marginTop: '8px' }} />
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={saveEdit} style={{
                    flex: 1, padding: '10px', background: '#1A3A2A', color: '#fff',
                    border: 'none', borderRadius: '10px', fontSize: '13px',
                    fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit'
                  }}>Save Changes</button>
                  <button onClick={() => setEditingId(null)} style={{
                    flex: 1, padding: '10px', background: '#F7F7F5', color: '#1A1A1A',
                    border: '0.5px solid #E8E8E4', borderRadius: '10px',
                    fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit'
                  }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {deleted.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => setShowDeleted(!showDeleted)} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0 4px', fontFamily: 'inherit'
            }}>
              <span style={{ fontSize: '11px', color: '#9B9B97', fontWeight: 500,
                             textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Recently Deleted ({deleted.length})
              </span>
              <span style={{ fontSize: '11px', color: '#9B9B97' }}>
                {showDeleted ? '▲ Hide' : '▼ Show'}
              </span>
            </button>

            {showDeleted && deleted.map(d => (
              <div key={d.id} style={{
                background: '#fff', border: '0.5px solid #FDDCDC',
                borderRadius: '16px', padding: '14px',
                display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.7
              }}>
                {d.image && (
                  <div style={{
                    width: '48px', height: '48px', background: '#F7F7F5',
                    borderRadius: '12px', flexShrink: 0, overflow: 'hidden'
                  }}>
                    <img src={d.image} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A', margin: 0 }}>
                    {d.name}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9B9B97', margin: '2px 0 0' }}>
                    {d.nameGeo} · ₾{d.price.toFixed(2)}
                  </p>
                </div>
                <button onClick={() => restoreDish(d.id)} style={{
                  padding: '6px 12px', borderRadius: '8px',
                  border: '0.5px solid #B8DFC3', background: '#EAF4EE',
                  color: '#2D6A4F', fontSize: '12px', cursor: 'pointer',
                  fontFamily: 'inherit', flexShrink: 0
                }}>Restore</button>
                <button onClick={() => permanentDelete(d.id)} style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  border: '0.5px solid #FDDCDC', background: '#FEF5F5',
                  color: '#C03030', fontSize: '14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>✕</button>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}