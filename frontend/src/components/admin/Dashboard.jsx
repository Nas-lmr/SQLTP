/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../App.css";
import "./Dashboard.css";
import UseAuthContext from "../../components/contex/useContext";

export default function Dashboard() {
  const [books, setBooks] = useState();
  const { authUser } = UseAuthContext();
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
  console.log(books);


  return (
    <>
      <nav className="d-nav">
        <div className="nav-menu">
          <ul>
            <Link to="pret">
              {" "}
              <li className="link"> Pret</li>
            </Link>
            <li className="link">Reserver</li>
            <li className="link">Category</li>
            <li className="link">Format</li>
            <li className="link">logout</li>
          </ul>
        </div>
      </nav>
      <div className="dashboard">
        <div className="container-dashboard">
          {books && (
            <table className="table-d">
              <thead>
                <tr className="row-d">
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Language</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr className="data-row" key={book.id}>
                    <td>
                      <img
                        className="d-img"
                        src={book.coverbook}
                        alt="imagebook"
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.language}</td>
                    <td>
                      {authUser && (
                        <>
                          <button className="dashboard-button" type="button">
                            <Link to={`/updatebook/${book.id}`}>Update</Link>
                          </button>
                          <button
                            type="button"
                            className="dashboard-button"
                            // onClick={() => handleDelete(book.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
