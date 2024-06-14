import React, {useState} from 'react';

const userContext = React.createContext({
    userName: null,
    email: null,
    role: null,
    currentGroup: null,
    setUserName:(name) => {},
    setEmail:(email) => {},
    setRole:(role) => {},
    setCurrentGruop: (active) => {},
});

export const UserContextProvider = (props) => {
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [currentGroup, setCurrentGroup] = useState(null);

    return (
        <userContext.Provider value={{userName, email, role, currentGroup, setUserName, setEmail, setRole, setCurrentGroup}}>
            {props.children}
        </userContext.Provider>
    );
};

export default userContext;