import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: #642b73; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #c6426e,
    #642b73
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #c6426e,
    #642b73
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  .imageContainer {
    display: flex;
    align-items: center;
    img {
      border-radius: 20px;
      margin: 20px;
    }
  }
`;

const FormElement = styled.form`
  width: 380px;
  background: #ff6f61;
  border-radius: 6px;
  box-shadow: 0 4px 24px -2px rgba(18, 22, 33, 0.1);
  position: relative;

  fieldset {
    border: none;
  }

  .uploadInput {
    cursor: pointer;
    display: inline-block;
    color: #fff;
    text-transform: uppercase;
    padding: 11px 20px;
    border: none;
  }
`;

const UploadImage = () => {
  const [uploadedImage, setImage] = useState({});
  const [isLoading, setLoading] = useState(false);

  const handleOnChange = async ({ target }) => {
    setLoading(true);
    const { files } = target;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "cloudinary_test");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/duec6t3rs/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const { secure_url, eager } = await res.json();

    setImage({
      image: secure_url,
      largeImage: eager[0].secure_url,
    });

    setLoading(false);
  };

  return (
    <div>
      <FormContainer>
        <FormElement>
          <fieldset>
            <label htmlFor="file">
              <input
                type="file"
                id="file"
                className="uploadInput"
                name="file"
                placeholder="Upload an image"
                onChange={handleOnChange}
              />
            </label>
          </fieldset>
        </FormElement>
        {isLoading && <p>Loading...</p>}
        <div className="imageContainer">
          {uploadedImage.image && (
            <img src={uploadedImage.image} alt="Upload Preview" />
          )}

          {uploadedImage.largeImage && (
            <img src={uploadedImage.largeImage} alt="Upload Preview" />
          )}
        </div>
      </FormContainer>
    </div>
  );
};

export default UploadImage;
