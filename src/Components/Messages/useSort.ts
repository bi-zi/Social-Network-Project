import { Messages, MessagesSliceState } from '../../store/messages/types';
import { useAppDispatch, useAppSelector } from '../../store/store';

export function useSort(data: Messages) {
  const state = useAppSelector((state) => state);
  const messages = useAppSelector((state) => state.messages);

  // Все чаты пользователя отсортированные по времени последнего сообщения каждого чата чем новее тем выше
  const sortedChatsByLastMessageTime = () => {
    const sortedChats = data?.correspondence
      ?.map((chat) => chat?.messages[chat.messages.length - 1])
      .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

    return sortedChats;
  };

  // На выходе все пользователи с которыми есть чат отсортированные по времени последнего сообщения
  // Так же на выходе при поиске чата находятся все пользователи подходящие под поиск +
  // они так же отсортированы по последнему сообщению
  const sortedUsers = () => {
    let users = []; // Массив для отсортированных пользователей


    // Поиск участников чатов
    const chatsUsers = state.user?.chatUsers.filter((user) =>
      data?.correspondence.map((chat) => chat?.withWho)?.includes(user._id),
    );

    // Массив id отсортированных участников чата
    const usersId = sortedChatsByLastMessageTime()?.map((chat) => chat.withWho);

    // Сортировка участников по времени написания последнего сообщения методом сравнения двух массивов
    for (let i = 0; i < usersId!?.length; i++) {
      for (let j = 0; j < chatsUsers?.length; j++)
        if (usersId![i] === chatsUsers[j]?._id) {
          users.push(chatsUsers[j]);
        }
    }

    // Поиск по поисковому запросу
    if (messages?.findChat?.length > 0) {
      users = users.filter(
        (user) =>
          user.firstName[0].toLowerCase().includes(messages?.findChat[0]?.toLowerCase()) &&
          user.firstName.toLowerCase().includes(messages?.findChat?.toLowerCase()),
      );
    }

    if (users.length === 0) users = chatsUsers;

    return users;
  };

  // Так как сам юзер чата находится в другом месте последнее сообщение нужно тоже
  // найти отсортировать и так же подгонять под поисковой запрос
  const evryChatLastMessage = () => {
    const users = sortedUsers();

    let chats = [];

    let lastMessage = sortedChatsByLastMessageTime(); // последнее сообщение каждого чата

    // Поиск по уже отсортированным пользователям сравнивая id пользователя и id чата
    // с пользователем (withWho это id юзера с которым чат)
    if (messages?.findChat?.length > 0) {
      for (let i = 0; i < users!?.length; i++) {
        for (let j = 0; j < lastMessage?.length; j++)
          if (users![i]._id === lastMessage[j]?.withWho) {
            chats.push(lastMessage[j]);
          }
      }
      lastMessage = chats;
    }

    return lastMessage;
  };

  // Выбранный чат
  const selectedChat = () => {
    const chat = data?.correspondence[localStorage.chatIndexWithoutSort]?.messages
      ?.slice()
      ?.reverse()
      .filter((chat, messageIndex) => messageIndex < messages?.addMessages)
      .reverse();

    // console.log(data?.correspondence);

    return chat;
  };

  return { evryChatLastMessage, sortedUsers, selectedChat };
}
