# Usage

1) Method 1
- Open Terminal
- cd Admin-panel
- npm run build
- Copy all files in admin-panel/build to backend/public 
- Open Terminal
- cd backend
- npm start
2) Method 2
- Open Terminal
- cd backend
- npm start
- Open Terminal
- cd Admin-panel
- npm run start

# Database
- create a database "dac-rapide"
- execute query of db.sql in backend folder

# User Authentication

1) login
   url: http://ServerIP:4000/api/user/login
   {
     email: xxx@outlook.com,
     password: xxxxxxxxxx,
   }
2) register
   (1) send request for password
       url: http://ServerIP:4000/api/user/otpgen
       {
         email: xyz@outlook.com
       }
   (2) register
       url: http://ServerIP:4000/api/user/register
       {
         email: xyz@outlook.com,
         name: name,
         password: xxxxxxxxx ( received in email )
       }
