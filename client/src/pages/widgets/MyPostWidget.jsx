import {
    //EditOutlined,
    DeleteOutlined,
    ImageOutlined,
  } from "@mui/icons-material";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "../../state";
  import UserImage from "../../components/UserImage";
  import "./MyPostWidget.css";
  
  // eslint-disable-next-line react/prop-types
  const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
  
    const handlePost = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
  
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    };
  
    return (
      <div className="widget-wrapper">
        <div className="input-section">
          <UserImage image={picturePath} />
          <input
            type="text"
            placeholder="What's on your mind..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="post-input"
          />
        </div>
  
        {isImage && (
          <div className="image-upload">
            <label className="upload-label">
              {!image ? "Add Image Here" : image.name}
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                className="file-input"
              />
            </label>
            {image && (
              <button onClick={() => setImage(null)} className="delete-button">
                <DeleteOutlined />
              </button>
            )}
          </div>
        )}
  
        <hr className="divider" />
  
        <div className="actions">
          <div className="action-item" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined />
            <span>Image</span>
          </div>
          <button
            onClick={handlePost}
            disabled={!post}
            className="post-button"
          >
            POST
          </button>
        </div>
      </div>
    );
  };
  
  export default MyPostWidget;
  