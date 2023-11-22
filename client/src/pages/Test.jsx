import { useState } from "react";
import { LOGIN_USER } from '../utils/mutations'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';


export default function Test() {

    const [userFormData, setUserFormData] = useState({ username: '', password: '' });
    const [validated] = useState(false);

    const [loginUser] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await loginUser({
                variables: { ...userFormData }
            });
            const { token, user } = data.login;
            console.log(user);
            Auth.login(token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({ username: '', password: '' });
    }
    return (
        <div>
            <h1 style={{ color: 'black' }}>Resolver and Query Testing Page</h1>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={userFormData.username}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{`Log in`}</button>
            </form>
        </div>
    )
}