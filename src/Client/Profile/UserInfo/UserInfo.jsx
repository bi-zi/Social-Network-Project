import React from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAbout } from '../../store/slices/about.js';
import { fetchAllUsers } from '../../store/slices/auth.js';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function UserInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();
  const [closeInfo, setCloseInfo] = React.useState(0);
  const [close, setClose] = React.useState(0)
  const about = state.about.data?.find((x) => x.user === id);
  const users = state.auth.users?.find((x) => x._id === id);
  const saveUserInfo = () => {
    setCloseInfo(0);
    dispatch(fetchAbout());
    setClose(1);
  };

  React.useEffect(() => {
    dispatch(fetchAbout());
    dispatch(fetchAllUsers());
  }, []);

  if (close === 1) {
    console.log(1);
    setClose(0);

    return <Navigate to="/Profile/62d187a5756ece7c2d8b9e8e" />;
  }
  //62d187a5756ece7c2d8b9e8e
  //62d187a5756ece7c2d8b9e8e

  return (
    <>
      <div className="about">
        <div className="about_backGround">
          <div className="full_name">{`${users?.fullName}`}</div>
          <div className="line"></div>
          {closeInfo === 0 ? (
            <>
              <div className="about_info" onClick={() => setCloseInfo(1)}>
                Edit Information
              </div>
              <div className="lives">Lives in - {about?.livesIn}</div>
              <div className="from">From - {about?.from}</div>
              <div className="born">Born on - {about?.bornOn}</div>
              <div className="profession">Profession - {about?.profession}</div>
              <div className="relationship">In a relationship with - {about?.relations}</div>
              <div className="student">Student at - {about?.studentAt}</div>
            </>
          ) : (
            <div className="about_form">
              <input className="lives_input" placeholder="Lives in" onChange={(e) => {}} />
              <br />
              <input className="lives_from" placeholder="From" onChange={(e) => {}} />
              <br />
              <input className="lives_born" placeholder="Born on" onChange={(e) => {}} />
              <br />
              <input className="lives_profession" placeholder="Profession" onChange={(e) => {}} />
              <br />
              <input
                className="lives_relationship"
                placeholder="In a relationship with"
                onChange={(e) => {}}
              />
              <br />
              <input className="lives_student" placeholder="Student at" onChange={(e) => {}} />
              <br />
              <button className="about_buttton" onClick={saveUserInfo}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserInfo;
