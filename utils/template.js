function templateCreateAccount(user) {
  return {
    subject: 'Bienvenido a MIR, Primero necesito que confirmes tu cuenta',
    html: `
      <h1>Bienvenid@</h1>
      ${user.firstName}
    `,
  };
}

function templateViewOrder() {}

module.exports = { templateCreateAccount, templateViewOrder };
