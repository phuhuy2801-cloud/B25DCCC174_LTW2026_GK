import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import BookTable from '../components/BookTable';

const BookList = ({ books, onDelete, onToggle }) => {
    const [keyword, setKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const [category, setCategory] = useState('Tất cả');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedKeyword(keyword), 500);
        return () => clearTimeout(timer);
    }, [keyword]);

    const filteredBooks = books.filter(b => {
        const matchCat = category === 'Tất cả' || b.category === category;
        const matchKey = b.title.toLowerCase().includes(debouncedKeyword.toLowerCase());
        return matchCat && matchKey;
    });

    return (
        <div>
            <FilterBar keyword={keyword} setKeyword={setKeyword} category={category} setCategory={setCategory} />
            {keyword !== debouncedKeyword && <div>Đang tìm...</div>}
            {keyword === debouncedKeyword && <div>Tìm thấy {filteredBooks.length} cuốn sách</div>}
            <BookTable books={filteredBooks} onDelete={onDelete} onToggle={onToggle} />
        </div>
    );
};
export default BookList;