"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main'; 
import Registration from './components/Registration';

window.onload = function() {
  React.render(
    <Registration />,
    document.getElementById('registration-form')
  )
}