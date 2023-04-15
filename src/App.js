import React, { useState } from 'react';
import './ImageUploader.css';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setIsUploadVisible(true);
    setIsPreviewVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここで画像のアップロード処理を実装する
  };

  const handleReset = () => {
    setImage(null);
    setIsUploadVisible(false);
    setIsPreviewVisible(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setIsUploadVisible(true);
        setIsPreviewVisible(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader-container" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <form onSubmit={handleSubmit} className="image-uploader-form">
        {!isPreviewVisible && (
          <div className="image-select-container">
            <label htmlFor="file-input" className="image-uploader-label">
              <i className="material-symbols-outlined">add_photo_alternate</i>
              <input type="file" id="file-input" onChange={handleChange} style={{ display: 'none' }} />
            </label>
          </div>
        )}
        {isPreviewVisible && (
          <div className="image-preview-overlay">
            <div className="image-preview-container">
              <img src={image} alt="Selected Image" className="image-preview" />
              <button type="button" onClick={handleReset} className="close-button">
                <i className="material-icons">close</i>
              </button>
            </div>
          </div>
        )}
        {isUploadVisible && (
          <button type="submit" className="upload-button">
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

export default ImageUploader;
