/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { LOGIN_USER } from '../utils/mutations'
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import { QUERY_ME } from '../utils/queries';


export default function Test() {

    const [userFormData, setUserFormData] = useState({ username: '', password: '' });
    const [validated] = useState(false);

    const [loginUser] = useMutation(LOGIN_USER);

    // Getting logged in user data
    const token = Auth.getToken();
    // Ternary operation checks to see if the user is logged i nto avoid errors later on
    const { loading, error, data } = Auth.loggedIn() ? useQuery(QUERY_ME, {
        context: {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    }) : { loading: false, error: null, data: null}

    // console.log(data)

    if(loading){
        return <h2 style={{color: 'black'}}>loading . . .</h2>
    }
    if(error){
        return <h2 style={{color: 'red'}}>ERROR!</h2>
    }

    const userData = data?.me;
    if(data){
        console.log(userData)
    }

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
            <br />
            <div style={{ color: 'black' }}>
                {Auth.loggedIn() ? (
                    <>
                        <h2>Logged In</h2>
                        <button onClick={Auth.logout}>Logout</button>
                        <br />
                        <h1>{userData.username}</h1>
                        <h1>Goals</h1>
                        {userData.categories.map( (category)  => {
                            return (
                                <div key={category.name}>
                                    <h2>{category.name}</h2>
                                    {category.goals.map( (goal) => {
                                        return (
                                            <ul key={goal.title}>
                                                <li><h4>{goal.title}</h4></li>
                                                <li>{goal.text}</li>
                                                <li>{goal.date}</li>
                                            </ul>
                                        )
                                    } )}
                                </div>
                            )
                        })}
                        <ul><h1>Todos</h1>
                        {userData.todos.map( (todo) => {
                            return(
                                <li key={todo.text}>{todo.text}</li>
                            )
                        } )}
                        </ul>
                        
                    </>
                ) : (
                    <>
                        <h1>Log in to See</h1>
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
                    </>
                )}
            </div>

        </div>
    )
}