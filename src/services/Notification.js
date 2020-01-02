import { Notify } from 'quasar';

class Notification {
  constructor(params) {
    this.message = params.message;
    this.color = params.color;
    this.icon = params.icon;
    this.textColor = params.textColor;
    this.timeout = params.timeout;
  }

  show() {
    Notify.create({
      message: this.message,
      color: this.color,
      icon: this.icon,
      textColor: this.textColor,
      timeout: this.timeout
    });
  }
}

export default Notification;
