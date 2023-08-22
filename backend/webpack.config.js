 // webpack.config.js
 const path = require('path');

 module.exports = {
   target: 'node', 
   entry: './bin/www', 
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   // Additional configuration goes here
 };