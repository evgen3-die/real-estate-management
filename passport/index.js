const bCrypt = require('bcrypt-nodejs');

module.exports = (passport, User) => {
  const LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use('local-register', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, login, password, done) => {
    const generateHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

    User.findOne({
      where: { login }
    }).then(function(user) {
      if (user) {
        return done(null, false, { message: 'Имя пользователя занято' });
      } else {
        const userPassword = generateHash(password);
        const data = {
          login,
          password: userPassword
        };

        User.create(data).then((newUser, created) => {
          if (!newUser) {
            return done(null, false);
          }

          if (newUser) {
            return done(null, newUser);
          }
        });
      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, login, password, done) => {
    const isValidPassword = (userpass, password) => bCrypt.compareSync(password, userpass);

    User.findOne({
      where: { login }
    }).then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Пользователь не найден' });
      }

      if (!isValidPassword(user.password, password)) {
        return done(null, false, { message: 'Неверный пароль' });
      }

      const userinfo = user.get();
      return done(null, userinfo);
    }).catch((err) => {
      console.log("Ошибка:", err);
      return done(null, false, { message: 'Что-то не так с авторизацией' });
    });
  }));
};
