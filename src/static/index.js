'use strict';
//var $ = jQuery = require( '../../node_modules/jquery/dist/jquery.js' );           // <--- remove if jQuery not needed
//require( '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js' );   // <--- remove if Bootstrap's JS not needed

require('./index.html');
require('./styles/sku.scss');

// Setup Elm bundle
var Elm = require( '../elm/Main.elm' );

Elm.Elm.Main.init({
  node: document.getElementById("main-elm")
});


