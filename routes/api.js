var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my-blog');

var postsSchema = mongoose.Schema({ title: 'string', text: 'string' });
var Post = mongoose.model('Post', postsSchema);

// GET

exports.posts = function (req, res) {
	var posts = [];
	Post.find({}, function(err, posts) {
		if (err) console.log(err);
		res.json({
			posts: posts
		});
	});
};

exports.post = function (req, res) {
	Post.findOne({ _id: req.params.id }, function(err, post) {
		if (err) console.log(err);
		res.json({
			post: post
		});
	});
};

// POST
exports.addPost = function (req, res) {
	var post = new Post(req.body);
	post.save(function(err) {
		if (err) console.log(err);
		res.json({
			post: post
		});
	});
};

// PUT
exports.editPost = function (req, res) {
	Post.findByIdAndUpdate(req.params.id,
		{	$set: { title: req.body.title, text: req.body.text } },
		{ upsert: true },
		function(err, post) {
			if (err) console.log(err);
			res.json({
				post: post
			});
		}
	);
};

// DELETE
exports.deletePost = function (req, res) {
	Post.remove({ _id: req.params.id }, function(err) {
		if (err) console.log(err);
		res.json(true);
	});
};