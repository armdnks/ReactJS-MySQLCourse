import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");

  const navigate = useNavigate();
  const params = useParams();

  async function saveUser(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${params.id}`, {
        name,
        email,
        gender,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserByID() {
    const res = await axios.get(`http://localhost:5000/users/${params.id}`);
    setName(res.data.name);
    setEmail(res.data.email);
    setGender(res.data.gender);
  }

  useEffect(() => {
    getUserByID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
          </div>

          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="button is-success">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
