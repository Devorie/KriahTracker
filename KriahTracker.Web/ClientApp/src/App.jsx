import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/NewLayout';
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
import TaskTable from './Pages/TaskTable';
import EditClass from './Pages/EditClass';
import ManageTutorsPage from './Pages/ManageTutorsPage';
import StudentsByTutor from './Pages/StudentsByTutor';

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
                    <Route path='/managetutors' element={
                        //<PrivateRoute>
                        <ManageTutorsPage />
                        //</PrivateRoute>
                    } /> 
                    <Route path='/tasktable' element={
                        //<PrivateRoute>
                        <TaskTable />
                        //</PrivateRoute>
                    } />
                    <Route path='/updateyear' element={
                        //<PrivateRoute>
                        <UpdateYear />
                        //</PrivateRoute>
                    } /> 
                    <Route path='/editclass' element={
                        //<PrivateRoute>
                        <EditClass />
                        //</PrivateRoute>
                    } /> 
                    <Route path='/viewstudenthistory' element={
                        //<PrivateRoute>
                            <ViewStudentHistory />
                        //</PrivateRoute>
                    } />   
                    <Route path='/studentsbytutor' element={
                        //<PrivateRoute>
                        <StudentsByTutor />
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