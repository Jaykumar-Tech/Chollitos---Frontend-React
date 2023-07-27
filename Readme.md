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
         password: xxxxxxxxx, // ( received in email )
         role: role
       }

# JWT for common access except login and register
- HEADER of request
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your_token_here'
    }
- TOKEN got after login
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY5MDM1MzA5MCwiZXhwIjoxNjkwMzU2NjkwfQ.kueFTZR1QfzXEuVo97c4xyzfwk-uuLq_cgrHhb34NPA"
    expires_in: 3600
    token_type: "Bearer"

# Github
- url: https://github.com/Techreale/DAC-Rapide---Backend.git
