import React from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAbout, fetchAboutUpdate } from '../../store/slices/about.js';
import { fetchAllUsers } from '../../store/slices/user.js';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function UserInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

  const [closeInfo, setCloseInfo] = React.useState(0);

  const about = Array.isArray(state.about?.data) ? state.about.data?.find((x) => x.user === id) : '';
  const users = state.user.users?.find((x) => x._id === id);

  const onSubmit = async (values, id) => {
    setCloseInfo(0);
    const data = await dispatch(fetchAboutUpdate(values, id));

    dispatch(fetchAbout());
    if (!data.payload) {
      return alert('Не удалось авторизоваться!');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  });

  React.useEffect(() => {
    dispatch(fetchAbout());
    dispatch(fetchAllUsers());
  }, []);

  return (
    <>
      <div className="about">
        <div className="about_backGround">
          <div className="full_name">{`${users?.fullName}`}</div>
          <div className="line"></div>
          {closeInfo === 0 ? (
            <>
              <div
                className="about_info"
                onClick={() => {
                  setCloseInfo(1);
                }}>
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
            <form className="about_form" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="lives_input"
                defaultValue={`${about?.livesIn}`}
                placeholder="Lives in"
                {...register('livesIn', { required: false })}
                helpertext={errors.email?.message}
              />
              <br />
              <input
                className="lives_from"
                defaultValue={`${about?.from}`}
                placeholder="From"
                {...register('from', { required: false })}
              />
              <br />
              <input
                className="lives_born"
                defaultValue={`${about?.bornOn}`}
                placeholder="Born on"
                {...register('bornOn', { required: false })}
              />
              <br />
              <input
                className="lives_profession"
                defaultValue={`${about?.profession}`}
                placeholder="Profession"
                {...register('profession', { required: false })}
              />
              <br />
              <input
                className="lives_relationship"
                defaultValue={`${about?.relations}`}
                placeholder="In a relationship with"
                {...register('relations', { required: false })}
              />
              <br />
              <input
                className="lives_student"
                defaultValue={`${about?.studentAt}`}
                placeholder="Student at"
                {...register('studentAt', { required: false })}
              />
              <br />
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default UserInfo;
