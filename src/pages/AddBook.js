import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddBook = ({ onAdd }) => {
    const [form, setForm] = useState({ title: '', author: '', year: '', category: 'Văn học' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.author || !form.year) return setError('Vui lòng nhập đầy đủ thông tin phía dưới form');
        const yearNum = Number(form.year);
        if (!Number.isInteger(yearNum) || yearNum < 1900 || yearNum > 2026) return setError('Năm xuất bản phải từ 1900 đến 2026');

        onAdd({ ...form, year: yearNum });
        navigate('/books', { replace: true });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <label>Tên sách: <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></label><br/>
            <label>Tác giả: <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} /></label><br/>
            <label>Năm xuất bản: <input type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} /></label><br/>
            <label>Thể loại:
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </label><br/>
            <button type="submit">Thêm</button>
        </form>
    );
};
export default AddBook;