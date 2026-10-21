import BookRow from './BookRow';

const BookTable = ({ books, onDelete, onToggle }) => {
    if (books.length === 0) return <div>Không có dữ liệu</div>;
    return (
        <table>
            <thead>
            <tr>
                <th>Tên sách</th><th>Tác giả</th><th>Năm</th><th>Thể loại</th><th>Trạng thái</th><th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {books.map(book => <BookRow key={book.id} book={book} onDelete={onDelete} onToggle={onToggle} />)}
            </tbody>
        </table>
    );
};
export default BookTable;