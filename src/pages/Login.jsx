
import React, { useState } from "react";
import "../styles/Login.css";
import { Link } from 'react-router-dom';
//import { db } from '../FirebaseConfig/Firebase11';
import { getDocs, collection, where, query } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState ("");

  const login = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // const dbref = collection(db, "Auth");
    // try {
    //   const emailMatch = query(dbref, where('Email', '==', email));
    //   const passwordMatch = query(dbref, where('Password', '==', password));
    //   const emailSnapshot = await getDocs(emailMatch);
    //   const emailArray = await emailSnapshot.docs.map((doc) => doc.data());
    //   const passwordSnapshot = await getDocs(passwordMatch);
    //   const passwordArray = passwordSnapshot.docs.map((doc) => doc.data());

    //   if (emailArray.length > 0 && passwordArray.length > 0) {
    //     alert('Login successful');
       
    //   } else {
    //     alert('invalid user name  password');
    //   }
    // } catch (error) {
    //   console.error('Login error:', error);
    // }
  }

  return (
    <div class="log-body">
      <center>
          <div class="log-container">
               
                    <div class="log-head">
                          <span>Sign up</span>
                          <p>Create a free account with your email.</p>
                      </div>
                      <div class="log-inputs">
                      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}>
                      </input>
                      </div>
                      <div class="log-inputs">
                      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}>
                      </input>
                      </div>
                    <button className="lg-bt" onClick={login}>SignIn</button>
                   
                  <div class="log-form-footer"> 
                <p>Don't have an account? <Link to='/Settings'>Sign Up</Link> </p>
                
            </div>
          
        </div>
        </center> 

    </div>
  );
};

export default  Login;

    
    // <div className="container">
    //   <div className="form">
    //     <h2>Login</h2>
    //     <div className="box">
    //       <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
    //     </div>
    //     <div className="box">
    //       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
    //     </div>
    //     <p>Don't have an account? <Link to='/registration'>Sign Up</Link> </p>
    //     <button onClick={login}>SignIn</button>
    //   </div>
    // </div>

