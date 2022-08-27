import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUser(id) {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to="/add-user" className="button">
          Add User
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <Link to={`/edit/${user.id}`} className="button is-small is-info">
                      edit
                    </Link>
                    <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
// table>(thead>tr>th*5)+(tbody>tr>td*5)
