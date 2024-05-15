async function sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
  const mailjetClient = require('node-mailjet').apiConnect(process.env.APIKEY_PUBLIC, process.env.APIKEY_PRIVATE);

  const request = mailjetClient
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: process.env.EMAIL,
            Name: 'Editoria - reset password'
          },
          To: [
            {
              Email: email,
            },
          ],
          Subject: 'Réinitialisation du mot de passe',
          HTMLPart: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="${process.env.URL}?token=${resetToken}">Réinitialiser le mot de passe</a></p>`,
        },
      ],
    });

  try {
    const result = await request;
    console.log(result.body);
    console.log('E-mail envoyé avec succès');
  } catch (error) {
    throw error;
  }
}

export default sendPasswordResetEmail;
