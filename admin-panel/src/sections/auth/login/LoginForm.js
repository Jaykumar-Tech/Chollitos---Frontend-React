import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import axios from '../../../axios.instance';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleAlert = (_message) => {
    setMessage(_message)
    setOpen(true);
  };

  const handleClick = () => {
    axios.post("/api/user/login",
      {
        email,
        password
      })
      .then((response) => {
        console.log(response)

        navigate('/dashboard', { replace: true });
      })
      .catch((err) => {
        console.log(err.response.data.message)
        setMessage(err.response.data.message)
        handleAlert();
      })
  };

  const handleInputChange = (event) => {
    const inputDom = event.currentTarget;
    if (inputDom.name === "email") {
      setEmail(inputDom.value);
    } else if (inputDom.name === 'password') {
      setPassword(inputDom.value)
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField
          value={email}
          onChange={handleInputChange}
          name="email" label="Email address" />

        <TextField
          name="password"
          label="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={message}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      />
    </>
  );
}
