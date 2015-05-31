// create/access a collection in mongodb/minimongo
MyCollection = new Mongo.Collection('a_mongo_collection');

if (Meteor.isClient) {
  Tracker.autorun(function () {
    // the `find` method is used to query documents from minimongo
    // and the mongodb. The minimongo supports most of the mongodb
    // selectors and modifiers.
    MyCollection.find({}).fetch().forEach(function (doc) {
      console.log("Found " + doc.text);
    });
  });
}

if (Meteor.isServer) {
  // same `find` method
  if (MyCollection.find({}).count()) {
    return;
  }

  _.range(5).forEach(function (i) {
    MyCollection.insert({
      text: "this is doc " + i
    });
  });
}