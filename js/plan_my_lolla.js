
$(function () {
	
	var lolla,
		genrePicker,
		metaData;
		
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
		
		console.log(matchingBands);
		
		return matchingBands;
	}
		
	function appStart () {
		//console.log(metaData)
		
		lolla = window.lolla = {};

		genrePicker = Backbone.View.extend({

			el: $('#genre-picker'),

			events: {
				'click ul li': 'selectGenre'
			},

			initialize: function () {

			},

			selectGenre: function (ev) {
				var target,
					requestedGenre;

				target = $(ev.target);
				requestedGenre = target.attr('id');
				findBandsByGenre(requestedGenre);
			}

		});

		lolla.genrePicker = new genrePicker();
	}
	
	$.ajax('php/band_data.json', {
		success: function (data) {
			metaData = $.parseJSON(data);
			appStart();
		}
	});
	
});