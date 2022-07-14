import React from 'react';
import './style.css';

function Friends() {
  let arr = [
    [
      'https://abrakadabra.fun/uploads/posts/2022-03/1647337144_2-abrakadabra-fun-p-avatarka-dlya-estetiki-6.png',
      'Kate',
    ],
    [
      'https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png',
      'Alex',
    ],
    ['https://vjoy.cc/wp-content/uploads/2020/10/b56c2b2bfb88a629c6693204a1b4bb3b.jpg', 'Evgen'],
    [
      'https://avatars.mds.yandex.net/get-zen_doc/1861837/pub_5caacbea643d2800af1323a2_5caacc72643d2800af1323a6/scale_1200',
      'Maks',
    ],
    [
      'https://proprikol.ru/wp-content/uploads/2020/02/kartinki-na-avatarku-dlya-parnej-i-muzhchin-1-1.jpg',
      'Dima',
    ],
    ['https://i.pinimg.com/736x/14/b9/36/14b936c28ed5bb31f64b8352ba562578.jpg', 'Misha'],
    [
      'https://avatars.mds.yandex.net/i?id=e708784c502029fd3580605e76109216_l-5761336-images-thumbs&n=27&h=480&w=480',
      'Alisa',
    ],
    ['https://wonder-day.com/wp-content/uploads/2020/03/Wonder-Day-Ava-8.jpg', 'Dasha'],
  ];
  return (
    <div className="friends">
      <div className="friends_title">Friends</div>
      <div className="friends_container">
        {arr.map((x, i) => (
          <div key={i}>
            <div className='friend' >
              <img src={x[0]} alt="" className="friend_avatar" />
              <div className="friend_name">{x[1]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friends;
