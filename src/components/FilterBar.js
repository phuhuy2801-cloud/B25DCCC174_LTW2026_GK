import { CATEGORIES } from '../data';

const FilterBar = ({ keyword, setKeyword, category, setCategory }) => (
    <div style={{ marginBottom: '10px' }}>
        <label htmlFor="search">Tìm kiếm: </label>
        <input id="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <label htmlFor="category" style={{ marginLeft: '10px' }}>Thể loại: </label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Tất cả">Tất cả</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
    </div>
);
export default FilterBar;
