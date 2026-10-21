const Home = ({ books }) => {
    const total = books.length;
    const borrowed = books.filter(b => !b.available).length;
    const latestYear = books.reduce((max, book) => (book.year > max ? book.year : max), 0);

    return (
        <div>
            <h2>Thư viện sách</h2>
            <p><strong>Tổng số sách: {total}</strong></p>
            <p><strong>Số sách đang cho mượn: {borrowed}</strong></p>
            <p><strong>Năm xuất bản mới nhất: {total === 0 ? 0 : latestYear}</strong></p>
        </div>
    );
};
export default Home;