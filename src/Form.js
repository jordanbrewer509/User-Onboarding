import React from "react";

export default function Form(props) {
    const { values, submit, change, disabled, errors } = props

    const onSubmit = evt => {
        evt.preventDefault();
        submit()
    }
    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse)
    }

    return (
        <label>User Login
            <form className="form container" onSubmit={onSubmit}>
                <div className="inputs">
                    <label>
                    Username
                        <input 
                            type="text"
                            onChange={onChange}
                            value={values.username}
                            name="username"
                        />
                    </label>

                    <label>
                    E-Mail
                        <input 
                            type="text"
                            onChange={onChange}
                            value={values.email}
                            name="email"
                            placeholder="ex@example.com..."
                        />
                    </label>

                    <label>
                    Password
                        <input 
                            type="text"
                            onChange={onChange}
                            value={values.password}
                            name="password"
                        />
                    </label>

                    <label>
                    Terms of Service
                        <input 
                            type="checkbox"
                            onChange={onChange}
                            checked={values.tos}
                        />
                    </label>

                    <button disabled={disabled}>Submit</button> 
                    <div className="errors">
                        <div>{errors.username}</div>
                        <div>{errors.email}</div>
                        <div>{errors.password}</div>
                        <div>{errors.tos}</div>
                    </div>
                </div>
            </form>
        </label>
    )
}