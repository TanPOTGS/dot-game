module.exports = {
  login,
  create
};

function login(req, res) {
  res.render('players/login');
}

function create(req, res) {
  res.render('players/register');
}