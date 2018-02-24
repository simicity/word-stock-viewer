var express = require('express');
var router = express.Router();

var dbctlr = require('./../public/javascripts/db-controller.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/wordstock');
});

router.get('/wordstock', function(req, res, next) {
  dbctlr.readAllData(function(dbdata) {
    res.render('word_list', {cursors: dbdata});
  });
});

router.get('/wordstock/add', function(req, res, next) {
  res.render('add_word');
});

router.post('/wordstock/add', function(req, res, next) {
  if(req.body.word && req.body.url) {
    dbctlr.writeData(req.body.word, req.body.url, function(dbdata) {
      res.redirect('/wordstock');
    });
  } else {
    res.redirect('/wordstock');
  }
});

router.get('/wordstock/:id/modify', function(req, res, next) {
  dbctlr.readData(req.params.id, function(word, url) {
    res.render('modify_word', { key: req.params.id, word: word, url: url });
  });
});

router.post('/wordstock/:id/modify', function(req, res, next) {
  if(req.body.word && req.body.url) {
    dbctlr.modifyData(req.params.id, req.body.word, req.body.url, function(dbdata) {
      res.redirect('/wordstock');
    });
  } else {
    res.redirect('/wordstock');
  }
});

router.get('/wordstock/:id/delete', function(req, res, next) {
  dbctlr.deleteData(req.params.id, function() {
    res.redirect('/wordstock');
  });
});

module.exports = router;
