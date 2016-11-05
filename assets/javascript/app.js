$(document).ready(function() {
	var topics = [
		'dog',
		'cat',
		'rabbit',
		'hamster',
		'skunk',
		'goldfish',
		'bird',
		'ferret',
		'turtle',
		'sugar glider',
		'chinchilla',
		'hedgehog',
		'hermit crab',
		'gerbil',
		'pygmy goat',
		'chicken',
		'capybara',
		'teacup pig',
		'serval',
		'salamander',
		'frog'
	];

	var baseURL = 'http://api.giphy.com/v1/gifs/search?q=',
	 	key = '&api_key=dc6zaTOxFJmzC',
	 	limitURL = '&limit=10';

	for (var i = 0; i < topics.length; i++) {
		$('.button-list').append(
			$('<button>', {
			'class': 'btn btn-primary button-topic'
		}).text(topics[i]));
	}


	$('.button-topic').on('click', function() {
		console.log(baseURL + encodeURIComponent($(this).text()) + key + limitURL);

		source = {};

		$.ajax({
			url: (baseURL + encodeURIComponent($(this).text()) + key + limitURL),
			method: 'GET'
		}).done(function(response) {

			console.log(response);
			
			$('.gif-list').empty();

			var i = 0;
			for (var j = 0; j < 4; j++) {
				$('.gif-list').append(
					$('<div>', {
						'class': 'row'
					})
				)

				do {
					$('.gif-list').children().eq(-1).append(
						$('<div>', {
							'class': 'gif-wrapper'
						}).html(
							'<p class="gif-rating">Rating: ' + response.data[i].rating + '</p>' +
							'<br>' +
							'<img class="gif" src="' + response.data[i].images.fixed_width_still.url + '"' +
							'data-id="' + response.data[i].id + '">'
						)
					)

					source[response.data[i].id] = response.data[i].images.fixed_width.url;
					i += 1;
				} while ( (i % 3) != 0 && i < 10);
			} 

			$('.gif').on('click', function() {
				var temp = $(this).attr('src');
				$(this).attr('src', source[$(this).data('id')]);
				source[$(this).data('id')] = temp;
			});
		});
	});


});