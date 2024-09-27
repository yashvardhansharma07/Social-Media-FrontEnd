import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTweetReply } from '../../Store/Twit/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline:"none",
  borderRadius:4,
};

export default function ReplyModal({handleClose,open,item}) {
  const navigate = useNavigate();
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectImage, setSelectedImage] = React.useState("");
  const dispatch=useDispatch();

  const handleSubmit = (values) => {
    dispatch(createTweetReply(values))
    handleClose()
    console.log("handle submit");
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      twitId:item?.id,
    },
    onSubmit: handleSubmit,
  });

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
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
          <div className="flex space-x-5">
            <Avatar
              onClick={() => navigate("/profile/${6}")}
              className="cursor-pointer"
              alt="username"
              src="https://static.vecteezy.com/system/resources/thumbnails/003/680/537/small/attractive-young-man-in-urban-background-free-photo.jpg"
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">code with Yash</span>
                  <span className="text-green-600">@codewithyash . 2m</span>
                  <img
                    className="ml-2 w-5 h-5"
                    src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg"
                    alt=""
                  />
                </div>
              </div>

              <div className='mt-2'>
                <div onClick={() => navigate(`/twit/${3}`)} className="cursor-pointer">
                  <p className="mb-2 p-0">Jai Shree Ram...:-)</p>
                </div>
              </div>
            </div>
          </div>

          <section className={"py-10"}>
            <div className="flex space-x-5">
              <Avatar
                alt="username"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/957db793-c703-43fa-a3e4-ebebfacf79e4/dga5fpt-44645687-3c71-430a-adc7-439fbadc4327.png/v1/fill/w_800,h_1170,q_80,strp/handsome_boy_by_rasooli1_dga5fpt-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk1N2RiNzkzLWM3MDMtNDNmYS1hM2U0LWViZWJmYWNmNzllNFwvZGdhNWZwdC00NDY0NTY4Ny0zYzcxLTQzMGEtYWRjNy00MzlmYmFkYzQzMjcucG5nIiwiaGVpZ2h0IjoiPD0xMTcwIiwid2lkdGgiOiI8PTgwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC85NTdkYjc5My1jNzAzLTQzZmEtYTNlNC1lYmViZmFjZjc5ZTRcL3Jhc29vbGkxLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.cnCQRWnPSi_omBHla619huh_kUI_-XluNLGf6M9pIMU"
              />
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="content"
                      placeholder="What is Happening"
                      className={"border-none outline-none text-xl bg-transparent"}
                      {...formik.getFieldProps("content")}
                    />
                    {formik.errors.content && formik.touched.content && (
                      <span className="text-red-500">{formik.errors.content}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex space-x-5 items-center">
                      <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                        <ImageIcon className="text-[#1d9bf0]" />
                        <input
                          type="file"
                          name="imageFile"
                          className="hidden"
                          onChange={handleSelectImage}
                        />
                      </label>
                      <FmdGoodIcon className="text-[#1d9bf0]" />
                      <TagFacesIcon className="text-[#1d9bf0]" />
                    </div>
                    <div>
                      <Button
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                          paddingY: "8px",
                          paddingX: "20px",
                          bgcolor: "#1e88e5",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        POST
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
    </div>
  );
}
