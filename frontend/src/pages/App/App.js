import { Route, Routes } from "react-router-dom";
import SignIn from '../SignInPage/SignIn';
import SignUp from '../SignUpPage/SignUp';
import HomePage from '../HomePage/HomePage';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path='/sign-in' element={<SignIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/home' element={<HomePage/>}/>
            </Routes>
        </div>
    );
}

export default App;