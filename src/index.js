'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourTeam from './modules/ourTeam';
import calcBlock from './modules/calcBlock';
import sendForm from './modules/sendForm';

// Timer
countTimer('13 january 2021');
// Menu
toggleMenu();
// Popup
togglePopup();
// Tabs
tabs();
// Slider
slider();
// Our Team change img
ourTeam();
// Calculator
calcBlock();
// Send-AJAX-form
sendForm();