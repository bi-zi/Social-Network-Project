import React from 'react';
import ImageUploading from 'react-images-uploading';
import Slider from 'react-slick';
function ImageUpload() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 10;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };


  

    const settings = {
      className: 'center',
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 2,
      swipeToSlide: true,
    };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url">
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI

        <div className="upload__image-wrapper">
          <button
            className="addPhoto"
            style={isDragging ? { color: 'red' } : undefined}
            onClick={onImageUpload}
            {...dragProps}>
            Add photo
          </button>
          &nbsp;
          <Slider {...settings}>
            {imageList.map((image, index) => {
              return (
                <div className="slider_link" key={index}>
                  <div className="image-item" key={index}>
                    <img src={image['data_url']} alt="" className="image_1" width="420px" height="320" />
                    <div className="image-item__btn-wrapper">
                      <button className="updateImage" onClick={() => onImageUpdate(index)}>
                        Update
                      </button>
                      <button className="removeImage" onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </ImageUploading>
  );
}

export default ImageUpload;
