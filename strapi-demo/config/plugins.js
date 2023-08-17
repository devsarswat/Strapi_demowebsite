module.exports = {
    email: {
      provider: "smtp", // e.g., "smtp"
      providerOptions: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "demo.try.check@gmail.com",
          pass: "iypzcibsxiqoahgm",
        },
      },
      settings: {
        defaultFrom: "demo.try.check@gmail.com",
        defaultReplyTo: "demo.try.check@gmail.com",
      },
    },
  };
  