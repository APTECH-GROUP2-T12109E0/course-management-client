import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MESSAGE_UPLOAD_IMAGE_FAILED } from "../../constants/config";
import { IMG_BB_URL } from "../../constants/endpoint";
import { showMessageError } from "../../utils/helper";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorCom from "../common/ErrorCom";

// Crop image before uploading
const ImageCropUploadAntCom = ({
  onSetValue = () => {},
  name,
  errorMsg = "",
  children,
  editImage,
  ...rest
}) => {
  // const [fileList, setFileList] = useState([
  //   {
  //     uid: "-1",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   },
  // ]);
  const [fileList, setFileList] = useState([]);
  // show Image when Edit
  useEffect(() => {
    if (editImage) setFileList(editImage);
  }, [editImage]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const customUploadRequest = async (options) => {
    const { onSuccess, onError, file } = options;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(IMG_BB_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imgUrl = res.data.data.url;
      if (!imgUrl) {
        onError(MESSAGE_UPLOAD_IMAGE_FAILED);
        return;
      } else {
        // CallBack
        onSetValue(name, imgUrl);
        onSuccess(res.data);
      }
    } catch (error) {
      onError(error);
    }
  };

  const onRemove = () => {
    setFileList([]);
    onSetValue(name, "");
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          customRequest={customUploadRequest}
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onRemove={onRemove}
          onPreview={onPreview}
          className="custom-upload block w-full"
        >
          {fileList.length < 1 && "Drag & Drop or click to upload"}
        </Upload>
      </ImgCrop>
      {errorMsg && errorMsg.length > 0 && (
        <span className="text-tw-danger text-sm">{errorMsg}</span>
      )}
    </>
  );
};

ImageCropUploadAntCom.propTypes = {
  editImage: PropTypes.array, // editImage = []
  onSetValue: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  errorMsg: PropTypes.string,
  children: PropTypes.node,
};
export default withErrorBoundary(ImageCropUploadAntCom, {
  FallbackComponent: ErrorCom,
});
