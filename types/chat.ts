export interface Chat {
  id: number;
  agentId: number;
  secondAgentId: number | null;
  contactId: number;
  departmentId: number | null;
  tabulationId: number | null;
  chatTabulation: unknown;
  lastMessage: ChatLastMessage | null;
  chatDepartment: unknown;
  unread: number;
  chatCustomer: ChatCustomer;
  workflowID: number | null;
  workflowStepID: number | null;
  queueNumber: number | null;
  situation: string;
  createdAt: string;
  updatedAt: string;
  attendedAt: string | null;
  closedAt: string | null;
  enabledSession: boolean;
  channel: string;
  channels: ChatChannel[];
  agents: ChatAgent[];
}

export interface ChatLastMessage {
  text: string;
  file: string | null;
  sendAt: string;
  senderType: string;
  type: string;
  sender: ChatAgent;
}

export interface ChatCustomer {
  id: number;
  name: string;
  mobile: string | null;
  phone: string | null;
  email: string | null;
  photo: string | null;
  custom_fields: unknown[];
  organizations: unknown[];
  groups: unknown[];
}

export interface ChatAgent {
  id: number;
  name: string;
  mobile: string | null;
  phone: string | null;
  email: string | null;
  photo: string | null;
  isActive?: boolean;
  isOnline?: boolean;
  isAvailable?: boolean;
  statusID?: number | null;
  statusType?: number;
  photo_url?: string;
  smallPhotoUrl?: string;
}

export interface ChatChannel {
  uuid: string;
  id: number;
  name: string;
  type: string;
}