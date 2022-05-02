import User from 'models/User';

export interface INotification {
  id: string;
  companyId: string;
  image: string | null;
  message: string;
  metadata: Record<string, any>;
  notificationCode: string;
  notificationObjectId: string;
  orderTimestamp: number;
  read: boolean;
  systemNotification: boolean;
  timestamp: number;
  user: User;
  userId: string;
  notificationId: string;
}
