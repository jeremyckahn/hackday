
$(function () {
	
	var lolla,
		genrePicker,
		bandList,
		metaData,
		bandTmpl;
		
	function findBandsByGenre (genre) {
		var i,
			j,
			matchingBands,
			normalizedGenre;
			
		function normalize (genre) {
			return genre.toLowerCase().replace(/[^a-z]/gi, '');
		}
		
		matchingBands = [];
		normalizedGenre = normalize(genre);
		
		for (i = 0; i < metaData.length; i++) {
			for (j = 0; j < metaData[i].genres.length; j++) {
				if (normalizedGenre === normalize(metaData[i].genres[j])) {
					matchingBands.push(metaData[i]);
				}
			}
		}
		
		return matchingBands;
	}
	
	function getArtistData (artistId, what, callback) {
		
		var source = {
			image: function () {
				$.ajax({
				  //get artist image
				  url: "http://developer.echonest.com/api/v4/artist/images?api_key=YCPKHEGQZ9BTYBBBE&id=" + artistId + "&format=json&results=1&start=0&license=unknown&callback=?",
				  context: document.body,
				  success: callback
				});
			},
			
			bio: function () {
				$.ajax({
				  //get artist bio
				  url: "http://developer.echonest.com/api/v4/artist/biographies?api_key=YCPKHEGQZ9BTYBBBE&id=" + artistId + "&format=json&results=1&start=0&license=cc-by-sa&callback=?",
				  context: document.body,
				  success: callback
				});
			}
		};
		
		source[what]();
	}
		
	function appStart () {
		
		lolla = window.lolla = {};
		lolla.genrePicker = new genrePicker();
		lolla.bandList = new bandList();
	}
	
	
	genrePicker = Backbone.View.extend({

		el: $('#genre-picker'),

		events: {
			'click ul li': 'selectGenre'
		},

		initialize: function () {

		},

		selectGenre: function (ev) {
			var target,
				requestedGenre,
				matchingBands;

			target = $(ev.target);
			requestedGenre = target.attr('id');
			matchingBands = findBandsByGenre(requestedGenre);
			lolla.bandList.update(matchingBands);
		}
	});
	
	bandList = Backbone.View.extend({
		el: $('#band-list'),
		
		list: $(),
		
		events: {
			
		},
		
		initialize: function () {
			this.list = this.el.find('ul');
		},
		
		dumpList: function () {
			var ul;
			
			ul = this.el.find('ul');
			ul.children().remove();
		},
		
		addBand: function (bandData) {
			var self = this;
			
			function complete () {
				var output;
				
				if (bandData.band_image && bandData.band_bio) {
					output = Mustache.to_html(bandTmpl.text(), bandData)

					$('<li>')
						.html(output)
						.appendTo(self.list);
				}
			}
			
			getArtistData (bandData.id_echoNest, 'image', function (data) {
				var parsedData;
				
				$.parseJSON(data);
				
				if (data.response.images.length) {
					bandData.band_image = data.response.images[0].url;
					complete();
				}
			});
			
			getArtistData (bandData.id_echoNest, 'bio', function (data) {
				var parsedData;
				
				$.parseJSON(data);
				
				if (data.response.biographies.length) {
					bandData.band_bio = data.response.biographies[0].text;
					complete();
				}
			});
		},
		
		update: function (bands) {
			var i;
			
			this.dumpList();
			
			for (i = 0; i < bands.length; i++) {
				this.addBand(bands[i]);
			}
		}
	});
	
	// Begin loading stuff...
	$.ajax('php/band_data.json', {
		success: function (data) {
			metaData = $.parseJSON(data);
			appStart();
		}
	});
	
	// Bind stuff...
	bandTmpl = $('#band-tmpl');
});