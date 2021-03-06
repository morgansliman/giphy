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

	var baseURL = 'https://api.giphy.com/v1/gifs/search?q=',
	 	key = '&api_key=dc6zaTOxFJmzC',
	 	limit = 10,
	 	rating = '';

	for (var i = 0; i < topics.length; i++) {
		$('.button-list').append(
			$('<button>', {
			'class': 'btn btn-primary button-topic'
		}).text(topics[i]));
	}

	$('#addGif').on('click', function() {
		if ($('#gif-input').val().length > 0) {
			$('.button-list').append(
				$('<button>', {
					'class': 'btn btn-primary button-topic'
				}).text($('#gif-input').val())
			);

			source = {};

			$.ajax({
				url: (baseURL + encodeURIComponent($('#gif-input').val()) + key + '&limit=' + limit + rating),
				method: 'GET'
			}).done(function(response) {
				
				$('.gif-list').empty();

				var i = 0;
				for (var j = 0; j < (limit / 3); j++) {
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
					} while ( (i % 3) != 0 && i < limit);
				} 
			});
		}
	});

	$(document).on('click', 'button.button-topic', function() {

		source = {};

		$.ajax({
			url: (baseURL + encodeURIComponent($(this).text()) + key + '&limit=' + limit + rating),
			method: 'GET'
		}).done(function(response) {

			$('.gif-list').empty();

			var i = 0;
			for (var j = 0; j < (limit / 3); j++) {
				$('.gif-list').append(
					$('<div>', {
						'class': 'row'
					})
				);

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
					);

					source[response.data[i].id] = response.data[i].images.fixed_width.url;
					i += 1;
				} while ( (i % 3) != 0 && i < limit);
			} 
		});
	});

	$('#gif-input').keyup(function(event) {
		if (event.keyCode == 13) {
			$('#addGif').click();
		}
	});

	$('.button-limit').on('click', function() {
		if ($(this).hasClass('active') == false) {
			for (var i = 0; i < $('.limit-wrapper').children().length; i++) {
				$('.limit-wrapper').children().eq(i).removeClass('active');
			}

			$(this).addClass('active');
			limit = $(this).text();
		}
	});

	$('.button-rating').on('click', function() {
		if ($(this).hasClass('active') == false) {
			for (var i = 0; i < $('.rating-wrapper').children().length; i++) {
				$('.rating-wrapper').children().eq(i).removeClass('active');
			}

			$(this).addClass('active');
			if ($(this).text() == 'None') {
				rating = '';
			} else {
				rating = '&rating=' + $(this).text();
			}
		}
	});

	$('#button-random').hover(function() {
		$('.random-text').css('display', 'inline');
	}, function() {
		$('.random-text').hide();
	});

	$('#button-random').on('click', function() {
		$('.gif-list').empty();

		var query = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC';

		if ($('#gif-input').val().length > 0) {
			query = query + '&tag=' + encodeURIComponent($('#gif-input').val());
		}

		$.ajax({
			url: query,
			method: 'GET'
		}).done(function(response) {
			console.log(query, '\n', response);

			$('.gif-list').append(
				$('<div>', {
					'class': 'gif-wrapper'
				}).html(
					'<img class="gif" src="' + response.data.image_original_url + '">'
				)
			);
		});
	});

	$(document).on('click', '.gif', function() {
		var temp = $(this).attr('src');
		$(this).attr('src', source[$(this).data('id')]);
		source[$(this).data('id')] = temp;
	});
});