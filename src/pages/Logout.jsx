import React from 'react';
import apiHandler from "../api/apiHandler";


const Logout = (props) => {
    const handleLogout = () => {
        apiHandler
            .logout()
            .then(() => {
                console.log(props)
/*                 props.removeUser();
 */                props.history.push('/signin')
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div> {handleLogout()}</div>
    )

}

export default Logout;
