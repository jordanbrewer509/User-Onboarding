import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form';
import axios from 'axios';
import schema from './schema';
import * as yup from 'yup';

const initialUsers = [];

const initialFormValues = {
  username: "",
  email: "",
  password: "",
  ToS: false
}

const initialFormErrors = {
  username: "",
  email: "",
  password: "",
  ToS: false
}

const initialDisabled = true;

function App() {

  const [user, setUser] = useState([]);
  const [form, setForm] = useState(initialFormValues);
  const [FormErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewUser = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser)
      .then(res => {
        console.log(res.data)
        setUser([res.data], ...user);
      })
      .catch(err => console.error(err))
      .finally(() => setForm(initialFormValues))
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...FormErrors, [name]: "" }))
      .catch(err => setFormErrors ({ ...FormErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setForm({ ...form, [name]: value })
  }

  const resetForm = () => setForm(initialFormValues);

  const formSubmit = () => {
    const newUser = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    }
      postNewUser(newUser);
    }

    useEffect(() => {schema.isValid(form).then(valid => setDisabled(!valid))}, [form])

  return (
    <div className="App">
      <header><h1>User Login</h1></header>
      <Form 
        values={form}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        reset={resetForm}
        errors={FormErrors}
      />
      <div className='users'>
        {user.map(x => {
          return (
          <div className='user details'>
            <h2>{x.username}</h2>
            <p>{x.email}</p>
            <p>{x.password}</p>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
