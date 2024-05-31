import React, {useState} from 'react';

const userContext = React.createContext({
    userName: null,
    email: null,
    role: null,
    setUserName:(name) => {},
    setEmail:(email) => {},
    setRole:(role) => {}
});

export const UserContextProvider = (props) => {
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);

    return (
        <userContext.Provider value={{userName, email, role, setUserName, setEmail, setRole}}>
            {props.children}
        </userContext.Provider>
    );
};

export default userContext;