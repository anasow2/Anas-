import { Injectable, signal } from '@angular/core';
import { AppNotification } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifications = signal<AppNotification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  readonly unreadCount = signal<number>(0);

  constructor() {
    // Initial mock data
    this.addNotification({
      title: 'Welcome to Sahal Marketplace!',
      message: 'Start exploring and finding great deals today.',
      link: '/home'
    });
  }

  addNotification(notification: Omit<AppNotification, 'id' | 'isRead' | 'createdAt'>) {
    const newNotification: AppNotification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      isRead: false,
      createdAt: new Date()
    };
    
    this._notifications.update(n => [newNotification, ...n]);
    this.updateUnreadCount();
  }

  markAsRead(id: string) {
    this._notifications.update(notifications => 
      notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    this.updateUnreadCount();
  }

  markAllAsRead() {
    this._notifications.update(notifications => 
      notifications.map(n => ({ ...n, isRead: true }))
    );
    this.updateUnreadCount();
  }

  private updateUnreadCount() {
    this.unreadCount.set(this._notifications().filter(n => !n.isRead).length);
  }
}
