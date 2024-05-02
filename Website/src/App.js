import logo from './logo.svg';
import './App.css';
import UserForm from "./components/UserForm";
import User from "./components/User";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const MessageContext = React.createContext();
function App() {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");
  const sample = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error);
  }, [msg]);

  return (
    <MessageContext.Provider value={(setMsg, sample)}>
      <div>
      <div className="container"></div>
        <div className="row g-5">
            <div className="col-1 ht100"></div>
            <div className="col-7 ht100">
                <h1>Care2 Petitions</h1>
                <img className="logo" src="images/489Petition.jpg" alt=""/>
                <h3>Moving 489 Lecture to the Evening</h3>
                <p>
                    We, the undersigned members of the CPTS 489 course community, respectfully request the consideration of moving the class schedule from its current 8 AM time slot to the evening hours. As committed students passionate about our academic pursuits, we believe that relocating the course to the evening will facilitate greater attendance and participation among our peers. The early morning timing poses significant challenges for many students, including those with long commutes, work commitments, or other academic obligations, limiting their ability to fully engage with the course material and contribute meaningfully to class discussions.

By moving CPTS 489 to the evening, we aim to foster a more inclusive and accessible learning environment that accommodates the diverse needs and schedules of our student body. This adjustment would not only enhance the overall learning experience but also promote student success and academic excellence within the program. We urge the administration and relevant stakeholders to consider our petition and collaborate with the student body to implement this change, thereby ensuring that every student has the opportunity to thrive and excel in their educational endeavors.

                </p>
                <h2>Supporters</h2>
                {users.map((user) => {
          return (
            <User
              user={user}
              setUser={setUsers}
              setMsg={setMsg}
              key={user.email}
            />
          );
        })}
            </div> 
            <div className="col-4 ht100">
        <UserForm setUsers={setUsers} setMsg={setMsg} />
            </div>
            <div className="col-1 ht100"></div>
      </div>
      </div>
    </MessageContext.Provider>
  );
}

export default App;
