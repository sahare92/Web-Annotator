module.exports.generateDeepDeleteFunction = function( collectionName, collectionRef, removedInheritingCollections, removeFatherCallback ){
	return function(err, matchingItems) {
		if (err){
			console.log("Error finding objects in the collection: " + collectionName);
		}
		else {
			var totalItemsRemoved = { count: 0 }
			matchingItems.forEach(
				function(item){
					console.log('destroying' + item._id);
					collectionRef.destroy(item._id, 
						function(err){
							if(err)
								console.log('Error: while destroying an object in collection: ' + collectionName + 'with id: ' + item._id);
							else{
								console.log('destroyed an object in collection: ' + collectionName + 'with id: ' + item._id);
								totalItemsRemoved.count++;
								if(totalItemsRemoved.count == matchingItems.length)
									removedInheritingCollections.count ++;
								if(removedInheritingCollections.count == removedInheritingCollections.total)
									removeFatherCallback();
							}
						});
				}
			);
		}
	}
}