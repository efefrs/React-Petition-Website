import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function UserForm({ setCourses, setMsg }) {
    const [alerts, setAlerts] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    function Alert({ message, type, onClose }) {
      return (
        <div className={`alert alert-${type} alert-dismissible`} role="alert">
          <div>{message}</div>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>
      );
    }

    const appendAlert = (message, type) => {
      setAlerts(prevAlerts => [...prevAlerts, { message, type }]);
    };
  
    const removeAlert = index => {
      setAlerts(prevAlerts => prevAlerts.filter((_, i) => i !== index));
    };

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

function validateEmail(email) {
    const atCheck = email.includes("@");
    const nameCheck = email.substr(0, email.indexOf('.'));
    const comCheck = email.endsWith(".com");
    if (!email) {
        appendAlert("Must include an email!", "danger");
        return false;
    } else if (!atCheck) {
        appendAlert("Invalid email! Missing @ symbol", "danger")
        return false;
    } else if (nameCheck < 5 || nameCheck > 20) {

        appendAlert("Invalid email! Name must be 5-20 characters followed by a period", "danger")
        return false;
    } else if (!comCheck) {
        appendAlert("Invalid email! Missing .com", "danger")
        return false;
    }
    else {
        return true;
    }
}

function validateCredentials(new_user) {
    const firstname = new_user.firstname;
    const lastname = new_user.lastname;
    const email = new_user.email;
    const firstnameCheck = firstname.length;
    const lastnameCheck = lastname.length;
    if (!firstname) {
        appendAlert("Must include a first name!", "danger");
        return false;
    } else if (firstnameCheck < 5 || firstnameCheck > 20) {
        appendAlert("Invalid first name! Name must be 5-20 characters", "danger")
        return false;
    } else if (!lastname) {
        appendAlert("Must include a last name!", "danger");
        return false;
    } else if (lastnameCheck < 5 || lastnameCheck > 20) {
        appendAlert("Invalid last name! Name must be 5-20 characters", "danger")
        return false;
    } else if (!validateEmail(email)){
        return false;
    } 
    return true;
}



  function handleSubmit(event) {
    event.preventDefault();
    const new_user = {
        firstname,
        lastname,
        email,
    };

    if (validateCredentials(new_user) == true) {
      console.log("email: ", email);
      postData("http://localhost:4000/api/users", new_user).then((data) => {
        setMsg(data.msg);
      if (data.msg == `id already exists`) {
        appendAlert("Email already used!", "danger");
      } else {
        setFirstname('');
        setLastname('');
        setEmail('');
      }
      });

    }
    
  }

  return (
    <div className="container-lg">

      
                    <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Sign Petition</legend>
                        <div id="liveAlertPlaceholder"></div>
                        {alerts.map((alert, index) => (
                        <Alert
                          key={index}
                          message={alert.message}
                          type={alert.type}
                          onClose={() => removeAlert(index)}
                        />
                      ))}
                        <div>
                            <label htmlFor="firstname">First Name: </label>
                            <input type="text" id="firstname" name="firstname" placeholder="first name" value={firstname}
                            onChange={(e) => {
                              setFirstname(e.target.value);
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname">Last Name: </label>
                            <input type="text" id="lastname" name="lastname" placeholder="last name" value={lastname}
                            onChange={(e) => {
                              setLastname(e.target.value);
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor="Email">Email: </label> 
                            <input type="text" id="email" name="email" placeholder="email@email.com" value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            />
                        </div>
                        <button>Sign</button>
                    </fieldset>
                    </form>
    </div>



  );
}

export default UserForm;