import React from "react";

import styles from "./UploadedImages.module.scss";

const UploadedImages = ({ img, i, onClickRemoveFile }) => {
  console.log(img);
  return (
    <div className={styles.uploadedImageItem}>
      <img src={`${img}`} alt="uploaded" />
      <button
        type="button"
        onClick={onClickRemoveFile}
        className={styles.deleteBtn}
        id={i}
      >
        Delete
      </button>
    </div>
  );
};

export default UploadedImages;
