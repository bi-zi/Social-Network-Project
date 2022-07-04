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

  if (checkPicture === 1) localStorage.setItem('avatar', avatar.userAvatar);

  if (localStorage.avatar === undefined || avatar.userAvatar[0].length === 0) {
    localStorage.setItem('avatar', 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png');
    dispatch(setUserAvatar(localStorage.avatar));
  }

  localStorage.setItem('slider', avatar.userPhotos);
  if (avatar.userPhotos[0] === undefined) {
    localStorage.removeItem('slider');
    localStorage.setItem('slider', avatar.userAvatar[0]);
  }
  // 0: "blob:http://localhost:3000/cfcbe01f-3813-4298-8928-55123c59861b"
  // 0: "blob:http://localhost:3000/cfcbe01f-3813-4298-8928-55123c59861b"
  console.log('юзер------', avatar.userPhotos, 'lock------', localStorage.slider);

  useEffect(() => {
    if (images.length < 1) return;

    if (checkPicture === 1) {
      dispatch(setUserAvatar(images.map((image) => URL.createObjectURL(image))));
    }
    images.forEach((image) => dispatch(setUserPhotos(URL.createObjectURL(image))));

    setImages([]);
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
