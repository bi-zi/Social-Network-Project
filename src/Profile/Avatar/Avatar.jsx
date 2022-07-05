import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAvatar, setUserPhotos } from '../../store/photo';
import './avatar.css';

function Avatar() {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.photo);

  const [images, setImages] = React.useState([]);
  const [checkPicture, setCheckPicture] = React.useState(1);

  const onAvatarChange = (e) => {
    setImages([...e.target.files]);
    setCheckPicture(1);
  };

  // localStorage.setItem('slider', )
  //localStorage.removeItem("avatar")

    if (localStorage.avatar === undefined || avatar.userAvatar[0]?.length === 0) {
    localStorage.setItem('avatar', 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png');
    dispatch(setUserAvatar(localStorage.avatar));
  }



  useEffect(() => {
    if (images.length < 1) return;

    let file = images[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem('avatar', e.target.result);
      dispatch(setUserAvatar([localStorage.avatar]));
      dispatch(setUserPhotos(e.target.result));
    };
    reader.readAsDataURL(file);

    // if (checkPicture === 1) {
    //   dispatch(setUserAvatar(images.map((image) => URL.createObjectURL(image))));
    // }
    // images.forEach((image) => dispatch(setUserPhotos(URL.createObjectURL(image))));

    // setImages([]);
  }, [images]);

  // сломана кнопка удаления фото неправильная длинна div или link в css
  return (
    <div className="avatar">
      <div className="avatar_backGround">
        {avatar.userAvatar === 0 || localStorage.avatar === undefined ? (
          <img
            src="https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"
            alt=""
            className="avatar_image"
          />
        ) : (
          <img src={avatar.userAvatar} alt="" className="avatar_image" />
        )}

        <div className="avatar_button">
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="avatar_input"
          />
          <div className="avatar_change">Сhange photo</div>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
