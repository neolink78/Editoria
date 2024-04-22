import { transporter } from './mailer';

async function sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Réinitialisation du mot de passe',
      html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="http://localhost:3000/reset/password?token=${resetToken}">Réinitialiser le mot de passe</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    throw error;
  }
}

export default sendPasswordResetEmail;
