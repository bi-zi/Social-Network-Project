import React from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';

import {
  setLives, setFrom, setBorn,
  setProfession, setRelationship, setStudent,
  setInfo
} from '../../store/info';


function UserInfo() {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.info);
  const user = useSelector((state) => state.user)
  const [closeInfo, setCloseInfo] = React.useState(0);
  const [saveStorage, setSaveStorage] = React.useState(0);

  const saveUserInfo = () => {
    setCloseInfo(0)
  dispatch(
    setInfo([
      localStorage.lives,
      localStorage.from,
      localStorage.born,
      localStorage.profession,
      localStorage.relationship,
      localStorage.student
    ]),
  );
}

  if (saveStorage === 1) localStorage.setItem('lives', info.lives);
  if (saveStorage === 2) localStorage.setItem('from', info.from);
  if (saveStorage === 3) localStorage.setItem('born', info.born);
  if (saveStorage === 4) localStorage.setItem('profession', info.profession);
  if (saveStorage === 5) localStorage.setItem('relationship', info.relationship);
  if (saveStorage === 6) localStorage.setItem('student', info.student);

  // console.log(saveStorage);
  // console.log(
  //   'lives',
  //   localStorage.lives,
  //   'from',
  //   localStorage.from,
  //   'born',
  //   localStorage.born,
  //   'profession',
  //   localStorage.profession,
  //   'relationship',
  //   localStorage.relationship,
  //   'student',
  //   localStorage.student,
  // );

  return (
    <>
      <div className="about">
        <div className="about_backGround">
          <div className="full_name">{`${user.checkAuth[0]} ${user.checkAuth[1]}`}</div>
          <div className="line"></div>
          {closeInfo === 0 ? (
            <>
              <div className="about_info" onClick={() => setCloseInfo(1)}>
                Edit Information
              </div>
              <div className="lives">Lives in - {info.userInfo[0]}</div>
              <div className="from">From - {info.userInfo[1]}</div>
              <div className="born">Born on - {info.userInfo[2]}</div>
              <div className="profession">Profession - {info.userInfo[3]}</div>
              <div className="relationship">In a relationship with - {info.userInfo[4]}</div>
              <div className="student">Student at - {info.userInfo[5]}</div>
            </>
          ) : (
            <div className="about_form">
              <input
                className="lives_input"
                placeholder="Lives in"
                onChange={(e) => {
                  dispatch(setLives(e.target.value));
                  setSaveStorage(1);
                }}
              />
              <br />
              <input
                className="lives_from"
                placeholder="From"
                onChange={(e) => {
                  dispatch(setFrom(e.target.value));
                  setSaveStorage(2);
                }}
              />
              <br />
              <input
                className="lives_born"
                placeholder="Born on"
                onChange={(e) => {
                  dispatch(setBorn(e.target.value));
                  setSaveStorage(3);
                }}
              />
              <br />
              <input
                className="lives_profession"
                placeholder="Profession"
                onChange={(e) => {
                  dispatch(setProfession(e.target.value));
                  setSaveStorage(4);
                }}
              />
              <br />
              <input
                className="lives_relationship"
                placeholder="In a relationship with"
                onChange={(e) => {
                  dispatch(setRelationship(e.target.value));
                  setSaveStorage(5);
                }}
              />
              <br />
              <input
                className="lives_student"
                placeholder="Student at"
                onChange={(e) => {
                  dispatch(setStudent(e.target.value));
                  setSaveStorage(6);
                }}
              />
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
