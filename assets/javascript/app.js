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

	var baseURL = 'http://api.giphy.com/v1/gifs/search?q=';
	var key = '&api_key=dc6zaTOxFJmzC';
	var limitURL = '&limit=10';

	for (var i = 0; i < topics.length; i++) {
		$('.button-list').append(
			$('<button>', {
			'class': 'btn btn-primary button-topic'
		}).text(topics[i]));
	}

	$('.button-topic').on('click', function() {
		console.log(baseURL + encodeURIComponent($(this).text()) + key + limitURL);
		$.ajax({
			url: (baseURL + encodeURIComponent($(this).text()) + key + limitURL),
			method: 'GET'
		}).done(function(response) {
			console.log(response);
			$('.gif-list').empty();
			for (var i = 0; i < response.data.length; i++) {
				$('.gif-list').append(
					$('<div>', {
						'class': 'gif-wrapper'
					}).html(
						'<p class="gif-rating">Rating: ' + response.data[i].rating + '</p>' +
						'<br>' +
						'<img class="gif" src="' + response.data[i].images.fixed_width_still.url + '">'
					)
				);
			}
		});
	});
});