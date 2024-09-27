import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { useLocation, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    const path = location.pathname === "/signup" ? "/signin" : "/signup";
    navigate(path);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className='text-center font-bold text-3xl pb-20'>
            {location.pathname === "/signup" ? "Create your account" : "Sign in to your account"}
          </h1>
            {location.pathname === "/signup" ? <SignupForm /> : <SigninForm />}
          <h1 className="text-center py-5 font font-semibold text-lg text-gray-700">
            {location.pathname === "/signup" ? "Already have an account?" : "If you don't have an account"}
          </h1>

          <Button fullWidth variant='outlined' onClick={handleNavigate} sx={{ borderRadius: '29px', py: "15px" }}>
            {location.pathname === "/signup" ? "Sign in" : "Sign up"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
