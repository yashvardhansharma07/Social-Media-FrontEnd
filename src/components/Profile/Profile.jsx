import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Button, Tab } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, followUserAction } from "../../Store/Auth/Action";
import { getUsersTweet } from "../../Store/Twit/Action";

const Profile = () => {
  const [tabValue,setTabValue]=useState("1")
  const navigate = useNavigate();
  const [openProfileModel,setOpenProfileModal]=useState(false);
  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const {auth , twit}=useSelector(store=>store)
  const dispatch=useDispatch()
  const {id}=useParams()

  const handleBack = () => navigate(-1);

  const handleFollowUser = () => {
    dispatch(followUserAction(id))
    console.log("follow user ");
  };

  const handleTabChange=(event,newValue)=>{
    setTabValue(newValue)

    if(newValue===4){
      console.log("likes post")
    }
    else if(newValue===1){
      console.log("users posts")
    }
  }

  useEffect(()=>{
    dispatch(findUserById(id))
    dispatch(getUsersTweet(id))
  },[id])

  return (
    <div>
      <section className={"z-50 flex items sticky top-0 bg-opacity-95"}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />

        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {auth.findUser?.fullName}
        </h1>
      </section>

      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src="https://images.pexels.com/photos/18999918/pexels-photo-18999918.jpeg?cs=srgb&dl=pexels-andrej375-18999918.jpg&fm=jpg"
          alt=""
        />
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="code with yash"
            src="https://img6.arthub.ai/6497fccf-d831.webp"
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
           {console.log("Find User:", auth.findUser)}

          { auth.findUser?.req_user ? (
            <Button
              onClick={handleOpenProfileModel}
              className="rounded-full"
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              className="rounded-full"
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {auth.findUser?.followed ? "unfollow" : "follow"}
            </Button>
          )}
        </div>

        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
            {true && (
              <img
                className="ml-2 w-5 h-5"
                src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg"
                alt=""
              />
            )}
          </div>
          <h1 className="text-gray-500">@{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}</h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>{auth.findUser?.bio}</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>

            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">{auth.findUser?.location}</p>
            </div>

            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">Joined Jun 2024</p>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex items-center spaxe-x-1 font-semibold">
              <span>{auth.findUser?.followings?.length}</span>
              <span className="text-gray-500">Following</span>
            </div>

            <div className="flex items-center spaxe-x-1 font-semibold">
              <span>{auth.findUser?.followers?.length}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5"> 
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="Replies" value="2" />
            <Tab label="Media" value="3" />
            <Tab label="Likes" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {twit.twits.map((item)=><TweetCard item = {item}/>)}
        </TabPanel>
        <TabPanel value="2">users replies</TabPanel>
        <TabPanel value="3">Media</TabPanel>
        <TabPanel value="4">Likes</TabPanel>

      </TabContext>
    </Box>
      </section>

      <section>
        <ProfileModal handleClose={handleClose} open={openProfileModel}/>
      </section>
    </div>
  );
};

export default Profile;
