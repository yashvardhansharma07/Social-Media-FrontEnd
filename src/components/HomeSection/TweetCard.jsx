import React, { useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyModal from "./ReplyModal";
import { FavoriteOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { createReTweet, likeTweet } from "../../Store/Twit/Action";

const TweetCard = ({item}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openReplyModel,setOpenReplyModal]=useState(false);
  const handleOpenReplyModel = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  const dispatch=useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTweet = () => {
    console.log("delete post");
    handleClose();
  };


  const handleCreateRetweet = () => {
    dispatch(createReTweet(item?.id))
    console.log("handle create repost");
  };

  const handleLiketweet = () => {
    dispatch(likeTweet(item?.id))
    console.log("handle Like Post");
  };

  const isLiked = true;

  return (
    <div className="">
      {/*<div className='flex items-center font-semibold text-gray-700 py-2'>
  <RepeatIcon/>
  <p>You RePost</p>

</div>*/}
      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user.id}`)}
          className="cursor-pointer"
          alt="username"
          src="https://img6.arthub.ai/6497fccf-d831.webp"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <span className="text-gray-600">@{item?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m</span>
              <img
                className="ml-2 w-5 h-5"
                src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg"
                alt=""
              />
            </div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
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
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
              <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
            </Menu>
          </div>

          <div onClick={()=>navigate(`/twit/${item?.id}`)} className="cursor-pointer">
            <p className="mb-2 p-0">{item?.content}</p>
            <img
              className="w-[28rem] border border-gray-400 p-5 rounded-md"
              src={item?.image}
              alt=""
            />
          </div>
          <div className="py-5 flex flex-wrap justify-between items-center text-gray-600">
            <div className="space-x-3 flex items-center text-gray-600">
              <ChatBubbleOutlineIcon
                className="cursor-pointer"
                onClick={handleOpenReplyModel}
              />
              <p>{item?.totalReplies}</p>
            </div>

            <div className={`${item?.retwit ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}
            >
              <RepeatIcon
                onClick={handleCreateRetweet}
                className="cursor-pointer"
              />
              <p>{item?.totalRetweets}</p>
            </div>

            <div className={`${ item?.liked ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}
            >
              {item?.liked ? (
                <FavoriteOutlined
                  onClick={handleLiketweet}
                  className="cursor-pointer"
                />
              ) : (
                <FavoriteIcon
                  onClick={handleLiketweet}
                  className="cursor-pointer"
                />
              )}
              
            </div>

            <div className="space-x-3 flex items-center text-gray-600">
              <BarChartIcon
                className="cursor-pointer"
                onClick={handleOpenReplyModel}
              />
              <p>430</p>
            </div>

            <div className="space-x-3 flex items-center text-gray-600">
              <FileUploadIcon
                className="cursor-pointer"
                onClick={handleOpenReplyModel}
              />
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModal item={item} open={openReplyModel} handleClose={handleCloseReplyModal}/>
      </section>
      <React.Fragment/>
    </div>
  );
};

export default TweetCard;
