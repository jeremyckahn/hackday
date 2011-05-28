function getArtistData (artistId) 
{
	$.ajax({

	  //get artist image
	  url: "http://developer.echonest.com/api/v4/artist/images?api_key=YCPKHEGQZ9BTYBBBE&id=" + artistId + "&format=json&results=1&start=0&license=unknown",
	  context: document.body,
	  success: function(image)
	  {
		console.log(image);
	  }

	});
	
	$.ajax({

	  //get artist bio
	  url: "http://developer.echonest.com/api/v4/artist/biographies?api_key=YCPKHEGQZ9BTYBBBE&id=" + artistId + "&format=json&results=1&start=0&license=cc-by-sa",
	  context: document.body,
	  success: function(bio)
	  {
		console.log(bio);
	  }

	});
}



var id = "ARH6W4X1187B99274F";
getArtistData(id);