var path = require('path'),
	express = require('express'),
	webpack = require('webpack'),
	config = require('./webpack.config.dev'),
	env = require('./env/env'),

	app = express(),
	compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  stats: { colors: true},
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/admin/build', express.static('admin/build'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(env.PORT, env.HOST, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://' + env.HOST + ':' + env.PORT);
});
