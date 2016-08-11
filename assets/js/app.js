$(document).ready(function(){

  // VARIABLES ##########

  var animals = [
    "bunny",
    "giraffe",
    "owl",
    "panda",
    "pug"
  ];

  for (var i = 0; i < animals.length; i++) {
    createAnimalButton(animals[i]);
  };

  

  // FUNCTIONS ##########

  function createAnimalButton(animal) {
    var button = $('<button/>', {
      'class': 'btn animal-btn',
      'value': animal, 
      'text': animal, 
      'data-tag': animal
    });

    $('.tags').append(button);
  }

  $('.tags').on('click', 'button', function() {
    var buttonTag = $(this).data('tag');
    var limit = 5;
    var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + buttonTag;
    
    for (var i = 0; i < limit; i++) {
      $.ajax({url: queryURL, method: 'GET'}).done(function(data) {
        var still = data.data.fixed_height_small_still_url;
        var animate = data.data.fixed_height_small_url;
        var resultImg = $("<img>");
            resultImg.attr('src',still);
            resultImg.attr('alt',buttonTag);
            resultImg.attr('data-still',still);
            resultImg.attr('data-animate',animate);
            resultImg.attr('data-state','still');
        $('.giphy').prepend(resultImg);
      });
    };
  });

  $('.giphy').on('click', 'img', function() {
    var state = $(this).attr('data-state');
    if (state == "still") {
      $(this).attr('src',$(this).data('animate'));
      $(this).attr('data-state','animate');
    } else {
      $(this).attr('src',$(this).attr('data-still'));
      $(this).attr('data-state','still');
    }
  });

  $('#add-animal').click(function() {
    var newAnimal = $('#addNewAnimal').val();
    createAnimalButton(newAnimal);
    $('#addNewAnimal').val("");
  })

}); // END ##############