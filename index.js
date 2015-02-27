module.exports = function (options) {
  console.log(0);
  if (!options) options = {};
  if (!options.key) options.key = 'local.locales';
  if (!options.path) options.path = '$locale';
  if (!options.name) options.name = 'user';
  console.log(1);
  console.log(options);

  return function (req, res, next) {
    console.log(2);
    var model = req.getModel();
    console.log(model);
    console.log(3);
    if (!req.isAuthenticated()) return next();
    console.log(4);
    console.log(req.user.id);
    var $user = model.at('users.' + req.user.id);
    console.log(5);
    console.log($user.path());
    $user.fetch(function (err) {
      console.log(6);
      console.log(err);
      if (err) return next(err);
      console.log(7);
      var path = options.path + '.strategies.' + options.name;
      console.log(path);
      var strategy = {};
      console.log(8);
      strategy.locales = $user.setNull(options.key, []);
      strategy.order = options.order;
      console.log(strategy);
      model.set(path, strategy);
      console.log(9);
      next();
    });
  };
};
