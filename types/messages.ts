export interface MessageUser {
  id: number;
  name: string;
  mobile: string | null;
  phone: string | null;
  email: string;
  photo: string | null;
  isActive?: boolean;
  isOnline?: boolean;
  isAvailable?: boolean;
  statusID?: number | null;
  statusType?: number | null;
}

export interface MessageChatCustomer {
  id: number;
  name: string;
  mobile: string | null;
  phone: string | null;
  email: string;
  photo: string | null;
}

export interface MessageChat {
  id: number;
  channel: string;
  entrypoint: string | null;
  situation: string;
  department: boolean | null;
  customer: MessageChatCustomer;
  workflowID: number | null;
  workflowStepID: number | null;
}

export interface Message {
  id: number;
  text: string;
  type: string;
  isInternal: boolean;
  isEmail: boolean;
  sender: MessageUser;
  senderType: string;
  receiver: MessageUser | null;
  receiverType: string;
  file: string | null;
  chat: MessageChat;
  customer: MessageChatCustomer;
  channel: string;
  sendAt: string;
  readAt: string | null;
  status?: 'sending' | 'sent' | 'error';
}