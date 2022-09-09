import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchAboutPost, fetchAbout, fetchAboutUpdate } from '../../../../store/about/slice';
import { fetchOneUser } from '../../../../store/user/slice';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface About {
  livesIn: string;
  from: string;
  bornOn: string;
  profession: string;
  relations: string;
  studentAt: string;
}

export type MyParams = {
  id: string;
};

export const SpanMinLength: React.FC = () => {
  return (
    <span style={{ color: 'red', paddingLeft: 20, fontSize: 16 }}>Minimum length 2 characters</span>
  );
};

export const SpanMaxLength: React.FC = () => {
  return <span style={{ color: 'red', paddingLeft: 20, fontSize: 16 }}>Max length 25 characters</span>;
};

export const AboutForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const [closeInfo, setCloseInfo] = React.useState(0);

  const about = Array.isArray(state.about?.data)
    ? state.about.data?.find((x) => x.user === id)
    : ({} as About);

  const onSubmit = async (values: About) => {
    setCloseInfo(0);
    about !== undefined
      ? await dispatch(fetchAboutUpdate({ values, id }))
      : await dispatch(fetchAboutPost({ values }));

    dispatch(fetchAbout());
  };

  const aboutStatus = state.about.status === 'loading';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<About>({
    mode: 'onSubmit',
  });

  React.useEffect(() => {
    dispatch(fetchAbout());
    dispatch(fetchOneUser(id));
  }, [dispatch, id]);

  return (
    <>
      {closeInfo === 0 ? (
        <>
          {state.auth?.data?._id === id ? (
            <div
              className="about_info"
              onClick={() => {
                setCloseInfo(1);
              }}>
              Edit Information
            </div>
          ) : (
            ''
          )}

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
            defaultValue={about?.livesIn !== undefined ? `${about?.livesIn}` : ''}
            placeholder="Lives in"
            {...register('livesIn', { required: true, minLength: 2, maxLength: 25 })}
            pattern="^[a-zA-Z0-9 ]+$"
            title="Only latin characters can be used"
            />

          {errors.livesIn && errors.livesIn.type === 'minLength' ? (
            <SpanMinLength />
          ) : errors.livesIn && errors.livesIn.type === 'maxLength' ? (
            <SpanMaxLength />
          ) : (
            ''
          )}
          <br />


          <input
            className="lives_from"
            defaultValue={about?.from !== undefined ? `${about?.from}` : ''}
            placeholder="From"
            pattern="^[a-zA-Z0-9 ]+$"
            title="Only latin characters can be used"
            {...register('from', { required: true, minLength: 2, maxLength: 25 })}
            />

          {errors.from && errors.from.type === 'minLength' ? (
            <SpanMinLength />
          ) : errors.from && errors.from.type === 'maxLength' ? (
            <SpanMaxLength />
          ) : (
            ''
          )}
          <br />


          <input
            className="lives_born"
            defaultValue={about?.bornOn !== undefined ? `${about?.bornOn}` : ''}
            placeholder="Born on"
            pattern="^[a-zA-Z0-9 ]+$"
            title="Only latin characters can be used"
            {...register('bornOn', { required: true, minLength: 2, maxLength: 25 })}
          />

          {errors.bornOn && errors.bornOn.type === 'minLength' ? (
            <SpanMinLength />
          ) : errors.bornOn && errors.bornOn.type === 'maxLength' ? (
            <SpanMaxLength />
          ) : (
            ''
          )}
          <br />


          <input
            className="lives_profession"
            defaultValue={about?.profession !== undefined ? `${about?.profession}` : ''}
            placeholder="Profession"
            pattern="^[a-zA-Z0-9 ]+$"
            title="Only latin characters can be used"
            {...register('profession', { required: true, minLength: 2, maxLength: 25 })}
            />

          {errors.profession && errors.profession.type === 'minLength' ? (
            <SpanMinLength />
          ) : errors.profession && errors.profession.type === 'maxLength' ? (
            <SpanMaxLength />
          ) : (
            ''
          )}
          <br />


          <input
            className="lives_relationship"
            defaultValue={about?.relations !== undefined ? `${about?.relations}` : ''}
            placeholder="In a relationship with"
            pattern="^[a-zA-Z0-9 ]+$"
            title="Only latin characters can be used"
            {...register('relations', { required: true, minLength: 2, maxLength: 25 })}
            />

          {errors.relations && errors.relations.type === 'minLength' ? (
            <SpanMinLength />
          ) : errors.relations && errors.relations.type === 'maxLength' ? (
            <SpanMaxLength />
          ) : (
            ''
          )}
          <br />


          <input
            className="lives_student"
            defaultValue={about?.studentAt !== undefined ? `${about?.studentAt}` : ''}
            placeholder="Student at"
            pattern="^[a-zA-Z0-9 ]+$"
            title="Only latin characters can be used"
            {...register('studentAt', { required: true, minLength: 2, maxLength: 25 })}
            />

          {errors.studentAt && errors.studentAt.type === 'minLength' ? (
            <SpanMinLength />
          ) : errors.studentAt && errors.studentAt.type === 'maxLength' ? (
            <SpanMaxLength />
          ) : (
            ''
          )}
          <br />


          {!aboutStatus ? (
            <button className="about_buttton" type="submit">
              Submit
            </button>
          ) : (
            <button className="about_buttton">Submit</button>
            )}

        </form>
      )}
    </>
  );
};
