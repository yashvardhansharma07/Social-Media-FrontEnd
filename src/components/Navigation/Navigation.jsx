import React from 'react'
import { navigationMenu } from './NavigationMenu'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Auth/Action';

const Navigation = () => {
  const { auth } = useSelector((store) => store);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    handleClose();
    dispatch(logout())
  };

  const userFullName = auth?.user?.fullName || '';
  const username = userFullName.split(" ").join("_").toLowerCase();

  return (
    <div className='h-screen sticky top-0'>
      <div>
        <div className='py-5'>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQx1LO9MAXXnMCEg8XVmrJblctz-OmQ0THpw&s"
            width="30"
            height="30"
            alt="Logo"
          />
        </div>
        <div className='space-y-6'>
          {navigationMenu.map((item) => (
            <div
              key={item.title}
              className='cursor-pointer flex space-x-3 items-center'
              onClick={() => item.title === "Profile" ? navigate(`/profile/${auth.user?.id}`) : navigate(item.path)}
            >
              {item.icon}
              <p className='text-xl'>{item.title}</p>
            </div>
          ))}
        </div>
        <div className='py-10'>
          <Button
            sx={{ width: "100%", borderRadius: "29px", py: "15px", bgcolor: '#1e88e5' }}
            variant='contained'
          >
            POST
          </Button>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <Avatar
            alt="username"
            src='https://img6.arthub.ai/6497fccf-d831.webp'
          />
          <div>
            {auth?.user ? (
              <>
                <p>{userFullName}</p>
                <span className='opacity-70'>@{username}</span>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
