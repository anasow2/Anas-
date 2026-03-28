
export interface Category {
  name: string;
  icon: string;
}

export interface Ad {
  id: number;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
  isFavorite: boolean;
  status?: 'Furan' | 'Iibsamay';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: Date;
}
