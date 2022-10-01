import { Messages, MessagesSliceState, } from '../../store/messages/types';
import { useAppDispatch, useAppSelector } from '../../store/store';

export function useSort(data: Messages[]) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state.messages);

  const evryChatLastMessage = () => {
    const chats = sortedChats()

    // console.log(data?.[0]?.correspondence.filter(x => x?.withWho ));

    const lastMessage = data?.[0]?.correspondence
      .map((x) => x?.messages[x.messages.length - 1])
      .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

    return lastMessage;
  };

  const sortedChats = () => {
    let chats = [];

    const chatsUsers = state.user?.usersAll.filter((user) =>
      data?.[0]?.correspondence.map((chat) => chat?.withWho)?.includes(user._id),
    );

    const userId = data?.[0]?.correspondence
      ?.map((chat) => chat?.messages[chat.messages.length - 1])
      .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
      .map((chat) => chat.withWho);

    for (let i = 0; i < userId!?.length; i++) {
      for (let j = 0; j < chatsUsers?.length; j++)
        if (userId![i] === chatsUsers[j]?._id) {
          chats.push(chatsUsers[j]);
        }
    }
    console.log(
      data?.[0]?.correspondence
        ?.map((chat) => chat?.messages[chat.messages.length - 1])
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))),
    );

    if (messages?.findChat?.length > 0) {
      chats = chats.filter(
        (user) =>
          user.fullName[0].toLowerCase().includes(messages?.findChat[0]?.toLowerCase()) &&
          user.fullName.toLowerCase().includes(messages?.findChat?.toLowerCase()),
      );
    }

    if (chats.length === 0) chats = chatsUsers;

    return chats;
  };

  const chatIndexWithoutSort = () => {
    const chatIndex = data?.[0]?.correspondence.findIndex(
      (chat) => chat?.withWho === messages?.selectedUser,
    );

    if (messages?.selectedUser !== '') localStorage.setItem('chatIndexWithoutSort', chatIndex + '');

    return chatIndex;
  };

  const chatIndexWithSort = () => {
    const chats = sortedChats();

    const chatIndex = chats.findIndex((userId) => userId._id === messages?.selectedUser);

    if (messages?.selectedUser !== '') {
      localStorage.setItem('chatIndexWithSort', chatIndex + '');
    }

    return chatIndex;
  };

  const selectedChat = () => {
    const chat = data?.[0]?.correspondence[localStorage.chatIndexWithoutSort]?.messages
      ?.slice()
      ?.reverse()
      .filter((chat, messageIndex) => messageIndex < messages?.addMessages)
      .reverse();

    return chat;
  };

  return { evryChatLastMessage, sortedChats, chatIndexWithoutSort, chatIndexWithSort, selectedChat };
}
