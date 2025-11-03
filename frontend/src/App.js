import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/book`);
        if (!res.ok) throw new Error("Verkkovirhe");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Virhe haettaessa kirjoja:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  if (loading) return <p>Ladataan kirjoja...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Minun Kirjat tietokannassa</h1>
      {books.length === 0 ? (
        <p>Ei kirjoja löytynyt.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
    </div>
  );
}

export default App;
