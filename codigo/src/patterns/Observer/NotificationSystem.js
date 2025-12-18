/**
 * PATRÓN OBSERVER
 * Permite notificar a múltiples componentes sobre cambios en el sistema
 * Útil para alertas, notificaciones y actualización de estado
 */

class Subject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class NotificationSystem extends Subject {
  constructor() {
    super();
    if (NotificationSystem.instance) {
      return NotificationSystem.instance;
    }
    this.notifications = [];
    NotificationSystem.instance = this;
  }

  static getInstance() {
    if (!NotificationSystem.instance) {
      NotificationSystem.instance = new NotificationSystem();
    }
    return NotificationSystem.instance;
  }

  addNotification(type, message, details = {}) {
    const notification = {
      id: Date.now(),
      type, // 'success', 'error', 'warning', 'info'
      message,
      details,
      timestamp: new Date(),
      read: false
    };
    this.notifications.unshift(notification);
    this.notify({ action: 'new_notification', notification });
    return notification;
  }

  success(message, details) {
    return this.addNotification('success', message, details);
  }

  error(message, details) {
    return this.addNotification('error', message, details);
  }

  warning(message, details) {
    return this.addNotification('warning', message, details);
  }

  info(message, details) {
    return this.addNotification('info', message, details);
  }

  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.notify({ action: 'notification_read', notification });
    }
  }

  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  getAllNotifications() {
    return this.notifications;
  }

  clearAll() {
    this.notifications = [];
    this.notify({ action: 'notifications_cleared' });
  }
}

export { Subject, NotificationSystem };
