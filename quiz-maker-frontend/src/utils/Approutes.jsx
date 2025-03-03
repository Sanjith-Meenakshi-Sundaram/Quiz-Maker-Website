import SignIn from '../pages/Signin';
import { Navigate } from 'react-router-dom';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateMCQ from '../pages/Createmcq';
import CreateTrueFalse from '../pages/Createtruefalse';
import CreateFillInTheBlank from '../pages/Createfill';
import AvailableQuizzes from '../pages/Availablequiz';
import EditMCQ from '../pages/Editmcq';
import EditTrueFalse from '../pages/Edittruefalse';
import EditFillInTheBlank from '../pages/Editfill';
import Takequiz from '../pages/Takequiz'

// Define all routes in an array
export default [
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/create-mcq',
    element: <CreateMCQ />,
  },
  {
    path: '/create-truefalse',
    element: <CreateTrueFalse />,
  },
  {
    path: '/create-fillintheblank',
    element: <CreateFillInTheBlank />,
  },
  {
    path: '/available-quizzes',
    element: <AvailableQuizzes />,
  },
  // Edit routes
  {
    path: '/edit-mcq/:id',
    element: <EditMCQ />,
  },
  {
    path: '/edit-truefalse/:id',
    element: <EditTrueFalse />,
  },
  {
    path: '/edit-fillintheblank/:id',
    element: <EditFillInTheBlank />,
  },
  {
    path: '/take-quiz/:id',
    element: <Takequiz />,
  },
  {
    path: '*',
    element: <Navigate to="/signin" />,
  },
];
