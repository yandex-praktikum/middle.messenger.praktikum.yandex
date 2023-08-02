import { NOTIFIER_ID } from '@constants';

enum Notification {
	ERROR = 'error',
	WARN = 'warn',
	SUCCESS = 'success'
}

class NotifierClass {

	readonly lifetime = 2000;

	constructor(public readonly containerId: string) {
	}

	error(text: string) {
		this._add(Notification.ERROR, text);
	}

	warn(text: string) {
		this._add(Notification.WARN, text);
	}

	success(text: string) {
		this._add(Notification.SUCCESS, text);
	}

	private _add(type: Notification, text: string) {
		const container = document.getElementById(this.containerId)!;
		const element = document.createElement('div');

		element.classList.add('notification', `notification_${type}`);
		element.textContent = text;

		container.appendChild(element);

		setTimeout(() => container.removeChild(element), this.lifetime);
	}
}

export const Notifier = new NotifierClass(NOTIFIER_ID);
