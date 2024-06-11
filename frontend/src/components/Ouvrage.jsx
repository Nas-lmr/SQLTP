/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export default function Ouvrage() {
  const [books, setBooks] = useState();
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/ouvrage", {
          params: {
            limit: 20,
          },
        });
        setBooks(res.data);
      } catch (err) {
        return err;
      }
      return "hi";
    };
    fetchAllBooks();
  }, []);

  return (
    <div className="books">
      <div className="container">
        {books &&
          books.map((book) => (
            <div className="card" key={book.id}>
              <img className="bookimg" src={book.coverbook} alt="imagebook" />
              <h1 className="booktitle">{book.title}</h1>
              <p className="bookprice">Language: {book.language}</p>
              <div className="btn"> </div>
            </div>
          ))}
      </div>{" "}
    </div>
  );
}
