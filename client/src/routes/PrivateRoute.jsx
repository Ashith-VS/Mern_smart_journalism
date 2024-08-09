import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet} from 'react-router-dom';
import { currentUserAuth } from '../Redux/Action/AuthenticationAction';
import { isEmpty } from 'lodash';
import { Login, Unauthorized } from '../screens';

const PrivateRoute = ({ roles }) => {
  const dispatch = useDispatch();
  const  {currentUser} = useSelector((state) => state.AuthenticationReducer);
  const token =localStorage.getItem('auth_token');
  const [isAuthorized, setIsAuthorized] = useState(null);


  useEffect(() => {
    if (token && isEmpty(currentUser)) {
        // console.log('token: ', token);
      dispatch(currentUserAuth());
    } 
  }, []);

  useEffect(() => {
      if (isEmpty(currentUser)) {
        setIsAuthorized(false); 
      } else if (!roles.includes(currentUser?.role)) {
        setIsAuthorized(false); 
      } else {
        setIsAuthorized(true); 
      }
  }, [currentUser, roles]);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Optionally, you can show a loading indicator
  }

//   if (isAuthorized === false) {
//     return <Navigate to={isEmpty(token) ? "/login" : "/unauthorized"} state={{ from: location }} replace />;
//   }

if (isAuthorized === false) {
    return isEmpty(currentUser) ? <Login/>: <Unauthorized />
  }

  return <Outlet />;
};

export default PrivateRoute;