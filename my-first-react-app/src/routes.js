import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Login from './login.jsx';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, EditView);
        } else {
          callback(null, ProfileView);
        }
      }
    },

    {
      path: '/login',
      component: Login
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }

  ]
};

export default routes;