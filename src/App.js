import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const localBooks = localStorage.getItem('gk_books');
    if (localBooks) {
      setBooks(JSON.parse(localBooks));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    axios.get('/data/books.json', { signal: controller.signal })
        .then(res => {
          setBooks(res.data);
          setLoading(false);
        })
        .catch(err => {
          if (!axios.isCancel(err)) {
            setError(true);
            setLoading(false);
          }
        });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && books.length > 0) {
      localStorage.setItem('gk_books', JSON.stringify(books));
    }
  }, [books, loading]);

  const addBook = (newBook) => {
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    setBooks([...books, { ...newBook, id: newId, available: true }]);
  };

  const deleteBook = (id) => setBooks(books.filter(b => b.id !== id));
  const toggleStatus = (id) => setBooks(books.map(b => b.id === id ? { ...b, available: !b.available } : b));

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Không tải được dữ liệu.</div>;

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home books={books} />} />
          <Route path="books" element={<BookList books={books} onDelete={deleteBook} onToggle={toggleStatus} />} />
          <Route path="books/new" element={<AddBook onAdd={addBook} />} />
          <Route path="books/:id" element={<BookDetail books={books} />} />
        </Route>
      </Routes>
  );
};
export default App;