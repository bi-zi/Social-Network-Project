import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { fetchOneUser } from '../store/slices/user';
import { Link } from 'react-router-dom';
import './style.css';

function Friends() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();
  const [catergory, setCategory] = React.useState('friends');
  const [sortBy, setSortBy] = React.useState();

  const user = state.user?.userOne?.[0];

  let arr = [];
  if (catergory === 'friends') {
    arr = state.user.usersAll?.filter((x) => user.friends.includes(x._id));
  }

  if (catergory === 'people') {
    arr = state.user.usersAll;
  }

  if (catergory === 'subscribers') {
    arr = state.user.usersAll?.filter((x) => user.subscribers.includes(x._id));
  }

  if (sortBy === 'a-z') {
    arr = arr
      ?.filter((x) => x)
      .sort(function (a, b) {
        if (a.fullName > b.fullName) {
          return 1;
        }
        if (a.fullName < b.fullName) {
          return -1;
        }
        return 0;
      });
  }

  if (sortBy === 'z-a') {
    arr = arr
      ?.filter((x) => x)
      .sort(function (a, b) {
        if (a.fullName > b.fullName) {
          return 1;
        }
        if (a.fullName < b.fullName) {
          return -1;
        }
        return 0;
      })
      .reverse();
  }

  if (sortBy === 'friends') {
    arr = arr
      ?.filter((x) => x)
      .sort(function (a, b) {
        if (a.friends < b.friends) {
          return 1;
        }
        if (a.friends > b.friends) {
          return -1;
        }
        return 0;
      });
  }

  if (sortBy === 'subscribers') {
    arr = arr
      ?.filter((x) => x)
      .sort(function (a, b) {
        if (a.subscribers < b.subscribers) {
          return 1;
        }
        if (a.subscribers > b.subscribers) {
          return -1;
        }
        return 0;
      });
  }

  React.useEffect(() => {
    dispatch(fetchOneUser(id));
  }, []);

  return (
    <div className="friends">
      <div className="friends_result">
        <div className="find_friend"></div>
        {arr.length > 0 ? (
          arr.map((x, i) => (
            <div
              className="friend"
              key={i}
              style={x === arr[arr.length - 1] ? { borderBottom: 'none' } : { borderBottom: `` }}>
              <Link to={`/Profile/${x._id}`}>
                <img src={x.imageUrl} alt="" className="friend_avatar" />
              </Link>
              <Link to={`/Profile/${x._id}`} className="friend_name" style={{ textDecoration: 'none' }}>
                {x.fullName}
              </Link>
              <span className="friend_message">Send message</span>
              <div className="friend_menu">
                <div className="friend_content">
                  <div className="friend_delete">Delete friend</div>
                  <div className="friend_blackList">Add to blacklist</div>
                </div>
                <FontAwesomeIcon className="friend_menu_icon" icon="fa-solid fa-ellipsis" />
              </div>
              <span className="number_friends">Friends {x.friends?.length}</span>
              <span className="number_subscribers">Subscribers {x.subscribers?.length}</span>
            </div>
          ))
        ) : catergory === 'friends' ? (
          <div className="zero_friends">You don't have friends :( </div>
        ) : (
          <div className="zero_friends">You don't have subscribers :( </div>
        )}
      </div>

      <div className="control_panel">
        <div
          className="all_people"
          style={catergory === 'people' ? { color: 'black' } : {}}
          onClick={() => setCategory('people')}>
          All people
        </div>
        <div
          className="all_friends"
          style={catergory === 'friends' ? { color: 'black' } : {}}
          onClick={() => setCategory('friends')}>
          Friends
        </div>
        <div
          className="friend_requests"
          style={catergory === 'subscribers' ? { color: 'black' } : {}}
          onClick={() => setCategory('subscribers')}>
          Subscribers
        </div>

        <div className="friend_sort_menu">
          <div className="friend_sort_category">
            <div
              className="A-Z_sort"
              style={sortBy === 'a-z' ? { color: 'black' } : {}}
              onClick={() => setSortBy('a-z')}>
              Sort by A-Z
            </div>
            <div
              className="Z-A_sort"
              style={sortBy === 'z-a' ? { color: 'black' } : {}}
              onClick={() => setSortBy('z-a')}>
              Sort by Z-A
            </div>
            <div
              className="friends_sort"
              style={sortBy === 'friends' ? { color: 'black' } : {}}
              onClick={() => setSortBy('friends')}>
              Sort by friends
            </div>
            <div
              className="subscribers_sort"
              style={sortBy === 'subscribers' ? { color: 'black' } : {}}
              onClick={() => setSortBy('subscribers')}>
              Sort by subscribers
            </div>
          </div>
          <div className="friend_sort">Sort by</div>
        </div>
      </div>
    </div>
  );
}

export default Friends;
