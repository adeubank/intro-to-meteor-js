// demonstration for client only right now
if (Meteor.isServer) {
	return;
}

// client-only collection
coordsCollection = new Mongo.Collection(null);

Template.reactivity.onRendered(function () {

	// bind an event handler on the mousemove event
	$(document).on('mousemove', function (event) {
		// query our one coordinate document
		var coord = coordsCollection.findOne();

		// update the document as the mouse cursor moves
		coordsCollection.upsert({
			only: 1
		}, {
			$set: {
				x: event.pageX,
				y: event.pageY
			}
		});
	});
});

Template.reactivity.helpers({
	coord: function () {
		// create a dependency on this document
		// and update the template as this document changes.
		return coordsCollection.findOne({
			only: 1
		});
	}
});

