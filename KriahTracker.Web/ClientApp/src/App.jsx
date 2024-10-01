import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/HomePage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Logout from './Pages/Logout';
import CanSignUp from './CanSignUp'
import Upload from './Pages/Upload'
import AddStudentPage from './Pages/AddStudentPage';
import ViewStudentHistory from './Pages/ViewStudentHistory';
import StudentMarking from './Pages/StudentMarking';
import UpdateYear from './Pages/UpdateYear';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={
                        //<PrivateRoute>
                            <Home />
                        //</PrivateRoute>
                        } />
                        <Route path='/logout' element={
                            //<PrivateRoute>
                            <Logout />
                        //</PrivateRoute>
                        } />
                        <Route path='/studentmarking' element={
                            //<PrivateRoute>
                            <StudentMarking />
                        //</PrivateRoute>
                    } />  
                    <Route path='/updateyear' element={
                        //<PrivateRoute>
                        <UpdateYear />
                        //</PrivateRoute>
                    } />  
                    <Route path='/viewstudenthistory' element={
                        //<PrivateRoute>
                            <ViewStudentHistory />
                        //</PrivateRoute>
                    } />   
                    <Route path='/upload' element={
                            //<PrivateRoute>
                            <Upload />
                        //</PrivateRoute>
                    } />   
                    <Route path='/addstudent' element={
                        //<PrivateRoute>
                        <AddStudentPage />
                        //</PrivateRoute>
                    } />
                    
                    <Route path='/signup' element={
                        <CanSignUp>
                            <Signup />
                        </CanSignUp>
                        } />
                    <Route path='/login' element={<Login />} />
                    
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;