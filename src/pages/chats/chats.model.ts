export interface User {
  id: string;
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

export interface Chat { //TODO
  id: string;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: { user: User; time: string; content: string };
}

export interface Message {
  userId: string
  time: string;
  read: boolean;
  content: string;
}
