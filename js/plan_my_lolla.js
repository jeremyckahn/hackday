
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
		
		//console.log(matchingBands);
		
		return matchingBands;
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
			$('<li>')
				.html(Mustache.to_html(bandTmpl.text(), bandData))
				.appendTo(this.list);
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