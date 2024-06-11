import { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import "./pret.css";

function Pret() {
  const [pret, setPret] = useState();

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/pret", {});
        setPret(res.data);
      } catch (err) {
        return err;
      }
    };
    fetchAllBooks();
  }, []);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-EU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  console.log(pret);
  return (
    <>
      <h1>Pret</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Role</th>
              <th>Output Date</th>
              <th>Input Date</th>
            </tr>
          </thead>
          <tbody>
            {pret &&
              pret.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.role_name}</td>
                  <td>{formatDate(item.output_date)}</td>
                  <td>{formatDate(item.input_date)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Pret;
