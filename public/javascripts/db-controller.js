var firebase = require('firebase');
var firebaseConfig = require('./firebase-config.js')

// Initialize Firebase
var config = {
  apiKey: firebaseConfig.API_KEY,
  authDomain: firebaseConfig.AUTH_DOMAIN,
  databaseURL: firebaseConfig.DB_URL,
  storageBucket: firebaseConfig.STORAGE_BUCKET,
};
firebase.initializeApp(config);

module.exports = {
  readData: function (id, callback) {
    var array = [];
    firebase.database().ref('/'+id).once('value').then(function(snapshot) {
      var word = snapshot.val().word;
      var url = snapshot.val().url;
      callback(word, url);
    });
  },

  readAllData: function (callback) {
    var array = [];
    firebase.database().ref().once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        array.push(item);
      });
      callback(array);
    });
  },

  writeData: function (word, url, callback) {
    firebase.database().ref().push().set({
      word: word,
      url: url
    });
    callback();
  },

  modifyData: function (id, word, url, callback) {
    firebase.database().ref('/'+id).update({word: word, url: url});
    callback();
  },

  deleteData: function (id, callback) {
    firebase.database().ref().child(id).remove();
    callback();
  }
}
