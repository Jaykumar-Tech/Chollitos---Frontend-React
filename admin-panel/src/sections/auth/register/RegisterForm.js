import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, RadioGroup, Radio, FormControlLabel, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import axios from '../../../axios.instance';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedOption, setSelectedOption] = useState("customer");

  const handleAlert = (_message) => {
    setMessage(_message)
    setOpen(true);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'customer') {
      // Perform actions for public office selected
      console.log('Public Office selected');
    } else if (event.target.value === 'business') {
      // Perform actions for business account selected
      console.log('Business Account selected');
    }
  };

  const handleClickOtpSent = () => {
    handleAlert("Signup request is sent");
    axios.post("/api/user/otpgen",
      {
        email
      })
      .then((response) => {
        handleAlert("Your password is sent to your email")
        setOtpSent(true);
      })
      .catch((err) => {
        handleAlert(err.response.data.message)
        console.log(err)
      })
  }

  const role = selectedOption;

  const handleClick = () => {
    axios.post("/api/user/register",
      {
        email,
        name,
        password,
        role
      })
      .then((response) => {
        console.log(response)

        navigate('/dashboard/user', { replace: true });
      })
      .catch((err) => {

        handleAlert(err.response.data.message)
        console.log(err)
      })
  };

  const handleInputChange = (event) => {
    const inputDom = event.currentTarget;
    if (inputDom.name === "email") {
      setEmail(inputDom.value);
    } else if (inputDom.name === 'password') {
      setPassword(inputDom.value)
    } else if (inputDom.name === 'name') {
      setName(inputDom.value)
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField
          value={email}
          onChange={handleInputChange}
          name="email" label="Email address" />

        {
          !otpSent ? <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClickOtpSent}>
            Send Request
          </LoadingButton> : null
        }

        {
          otpSent ? <TextField
            value={name}
            onChange={handleInputChange}
            name="name" label="Full name" /> : null}


        {
          otpSent ? <TextField
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
          /> : null}

          
        {
          otpSent ?
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
              <FormControlLabel value="customer" control={<Radio />} label="Public Office" />
              <FormControlLabel value="business" control={<Radio />} label="Business Account" />
            </RadioGroup> : null}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      {
        otpSent ? <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Register
        </LoadingButton> : null
      }
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
