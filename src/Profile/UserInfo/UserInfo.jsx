import React from 'react'
import './userInfo.css'
// <div className="full_name">{`${user.checkAuth[0]} ${user.checkAuth[1]}`}</div>

function UserInfo() {
  return (
    <div className="about">
      <div className="about_backGround">
        <div className="line"></div>
        <div className="about_info">Edit Information</div>
        <div className="line"></div>
        <div className="lives">Lives in</div>
        <div className="from">From</div>
        <div className="born">Born on</div>
        <div className="profession">Profession</div>
        <div className="relationship">In a relationship with</div>
        <div className="student">Student at</div>
      </div>
    </div>
  );
}

export default UserInfo
