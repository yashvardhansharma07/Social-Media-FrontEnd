import { Button, Grid } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import AuthModal from './AuthModal';

function Authentication() {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const handleOpenAuthModal = () => setOpenAuthModal(true);
  const handleCloseAuthModal = () => setOpenAuthModal(false);

  return (
    <div>
      <Grid className='overflow-hidden' container>
        <Grid className='hidden lg:block relative' item lg={7}>
          <img className="w-full h-screen" src="https://deadline.com/wp-content/uploads/2023/07/x-twitter-logo.jpg?w=681&h=383&crop=1" alt=""/>
        </Grid>
        <Grid item lg={5} xs={12} className='px-10'>
          <h1 className='mt-10 font-bold text-7xl'>What's Happening Now!</h1>
          <h1 className='font-bold text-3xl py-16'>Join your Social Media Today</h1>
          <div className='w-[60%]'>
            <div className='w-full'>
              <GoogleLogin width={330} />
              <p className='py-5 text-center'>OR</p>
              <Button onClick={handleOpenAuthModal} fullWidth variant="contained" size='large' sx={{ borderRadius: "29px", py: "7px" }}>
                Create Account
              </Button>
              <p className='text-sm mt-2'>
                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
              </p>
            </div>
            <div className='mt-10'>
              <h1 className='font-bold text-xl mb-5'>Already Have Account</h1>
              <Button onClick={handleOpenAuthModal} fullWidth variant="outlined" size='large' sx={{ borderRadius: "29px", py: "7px" }}>
                LOGIN
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
    </div>
  );
}

export default Authentication;
