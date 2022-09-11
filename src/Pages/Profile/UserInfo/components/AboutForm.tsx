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

  const trys = [
    {
      place: 'Lives in',
      var1: errors.livesIn,
      var2: errors.livesIn?.type,
      var3: 'livesIn',
      default: about?.livesIn,
    },
    { place: 'From', var1: errors.from, var2: errors.from?.type, var3: 'from', default: about?.from },
    {
      place: 'Born on',
      var1: errors.bornOn,
      var2: errors.bornOn?.type,
      var3: 'bornOn',
      default: about?.bornOn,
    },
    {
      place: 'Profession',
      var1: errors.profession,
      var2: errors.profession?.type,
      var3: 'profession',
      default: about?.profession,
    },
    {
      place: 'In a relationship with',
      var1: errors.relations,
      var2: errors.relations?.type,
      var3: 'relations',
      default: about?.relations,
    },
    {
      place: 'Student at',
      var1: errors.studentAt,
      var2: errors.studentAt?.type,
      var3: 'studentAt',
      default: about?.studentAt,
    },
  ];

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

          <div className="about_lives">Lives in - {about?.livesIn}</div>
          <div className="about_from">From - {about?.from}</div>
          <div className="about_born">Born on - {about?.bornOn}</div>
          <div className="about_profession">Profession - {about?.profession}</div>
          <div className="about_relationship">In a relationship with - {about?.relations}</div>
          <div className="about_student">Student at - {about?.studentAt}</div>
        </>
      ) : (
        <form className="about_form" onSubmit={handleSubmit(onSubmit)}>
          {trys.map((aboutInfo, index) => (
            <div key={index}>
              <input
                className="about_input"
                defaultValue={aboutInfo.default !== undefined ? `${aboutInfo.default}` : ''}
                placeholder={aboutInfo.place}
                {...register(
                  aboutInfo.var3 === 'livesIn'
                    ? 'livesIn'
                    : aboutInfo.var3 === 'from'
                    ? 'from'
                    : aboutInfo.var3 === 'bornOn'
                    ? 'bornOn'
                    : aboutInfo.var3 === 'profession'
                    ? 'profession'
                    : aboutInfo.var3 === 'relations'
                    ? 'relations'
                    : 'studentAt',
                  {
                    required: true,
                    minLength: 2,
                    maxLength: 25,
                  },
                )}
                pattern="^[a-zA-Z0-9 ]+$"
                title="Only latin characters can be used"
              />
              {aboutInfo.var1 && aboutInfo.var2 === 'minLength' ? (
                <SpanMinLength />
              ) : aboutInfo.var1 && aboutInfo.var2 === 'maxLength' ? (
                <SpanMaxLength />
              ) : (
                ''
              )}
              <br />
            </div>
          ))}

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
