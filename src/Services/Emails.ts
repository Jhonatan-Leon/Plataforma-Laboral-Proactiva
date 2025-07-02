// src/services/mail.service.ts
import { EmailClient, EmailMessage } from '@azure/communication-email';

export class MailService {
  private static client = new EmailClient(
    process.env.ACS_EMAIL_CONNECTION_STRING!
  );
  private static sender = process.env.ACS_EMAIL_SENDER!;

  private static async dispatch(message: EmailMessage) {
    const poller = await this.client.beginSend(message);
    const result = await poller.pollUntilDone();
    if (result.status !== 'Succeeded') throw new Error(JSON.stringify(result));
  }

  static async sendWelcomeEmail(to: string, name: string) {
    await this.dispatch({
      senderAddress: this.sender,
      recipients: { to: [{ address: to, displayName: name }] },
      content: {
        subject: '¡Bienvenido(a) a JobConnect!',
        html: `<p>Hola <b>${name}</b>, gracias por registrarte 🎉.</p>`,
      },
    });
  }

  static async sendVacancyApplicationNotification(
    employerEmail: string,
    employerName: string,
    vacancyTitle: string,
    applicantName: string
  ) {
    await this.dispatch({
      senderAddress: this.sender,
      recipients: { to: [{ address: employerEmail, displayName: employerName }] },
      content: {
        subject: `📥 Nueva postulación a “${vacancyTitle}”`,
        html: `<p>${applicantName} acaba de postular a tu vacante <b>${vacancyTitle}</b>.</p>`,
      },
    });
  }

  static async sendPasswordChangeEmail(to: string, name: string, date = new Date()) {
    await this.dispatch({
      senderAddress: this.sender,
      recipients: { to: [{ address: to, displayName: name }] },
      content: {
        subject: 'Tu contraseña ha sido actualizada',
        html: `<p>Hola ${name}, confirmamos que tu contraseña cambió el ${date.toLocaleString(
          'es-CO'
        )}.</p>`,
      },
    });
  }
}
