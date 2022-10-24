import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchUserPostsAll, fetchPostDelete } from '../../../../store/post/slice';
import { UserPost } from '../../../../store/post/types';

export function useWall(wall: UserPost) {
  const dispatch = useAppDispatch();
  const userPost = useAppSelector((state) => state.post.userPosts);

  const reverseWallPost = () => {
    let wallPost = wall?.post;
    let buffer = [];

    if (wallPost !== undefined) {
      for (let i = wallPost.length - 1; i !== -1; --i) {
        buffer.push(wallPost[i]);
      }
    }
    return (wallPost = buffer);
  };

  const deletePost = async (e: React.MouseEvent<HTMLSpanElement>, index: string, id: string) => {
    e.preventDefault();
    const postIndex = userPost.post?.[0]?.post.findIndex((post) => post._id === index);

    if (window.confirm('Are you sure you want to delete your post?')) {
      await dispatch(fetchPostDelete({ deleteId: postIndex, user: id }));
      dispatch(fetchUserPostsAll(id));
    }
  };

  return { reverseWallPost, deletePost };
}
