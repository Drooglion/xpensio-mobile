import User from 'models/User'
import { INotification } from 'types/Notification'

class Notification {
	readonly id: string;
  readonly companyId: string;
  readonly image: string | null;
  readonly message: string;
  readonly metadata: Record<string, any>;
  readonly notificationCode: string;
  readonly notificationObjectId: string;
  readonly orderTimestamp: number;
  readonly read: boolean;
  readonly systemNotification: boolean; readonly timestamp: number;
  readonly user: User;
  readonly userId: string;
  readonly notificationId: string;

  constructor({
    id,
    companyId,
    image,
    message,
    metadata,
    notificationCode,
    notificationObjectId,
    orderTimestamp,
    read,
    systemNotification,
    timestamp,
    user,
    userId,
    notificationId,
  }: INotification) {
    this.id = id;
    this.companyId = companyId;
    this.image = image;
    this.message = message;
    this.metadata = metadata;
    this.notificationCode = notificationCode;
    this.notificationObjectId = notificationObjectId;
    this.orderTimestamp = orderTimestamp;
    this.read = read;
    this.systemNotification = systemNotification;
    this.timestamp = timestamp;
    this.user = user;
    this.userId = userId;
    this.notificationId = notificationId;
  }
}

export default Notification;
