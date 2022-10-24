export interface Messages {
  id: string;
  text: string;
  time: string;
  user: string;
}

export interface DataRooms {
  id: string;
  name: string;
  messages: Messages[];
}
