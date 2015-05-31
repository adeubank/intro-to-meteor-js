Score = new Mongo.Collection('score');

if (Meteor.isClient) {

  Template.hello.helpers({
    counter: function () {
      var score = Score.findOne({}) || {};
      return score.num || 0;
    }
  });

  Template.hello.events({
    'click button': function (e) {
      // increment the counter when button is clicked
      $(e.target).hide();

      Meteor.call('inc', function () {
        $(e.target).show();
      });
    }
  });
}

Meteor.methods({
  'inc': function () {
    if (Meteor.isServer) {
      // simulate a slower operation on the server
      // then increment score by 2 on the server
      Meteor._sleepForMs(2000);
      Score.upsert({ only: 1 }, {
        $inc: {
          num: 2
        }
      });
    } else {
      // increment the score by 1 on the client
      Score.upsert({ only: 1 }, {
        $inc: {
          num: 1
        }
      });
    }
  }
});