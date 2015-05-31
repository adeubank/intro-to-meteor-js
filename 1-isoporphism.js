Meteor.methods({
  'sharedCode': function () {
    if (Meteor.isServer) {
      console.log("it's on the server");
    } else if (Meteor.isClient) {
      console.log("it's on the client");
    } else {
      console.log("where is this?");
    }
  }
});

if (Meteor.isClient) {
  Meteor.call('sharedCode');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.call('sharedCode');
  });
}