$(document).ready(function(){
  track_user();

  //Materialize... 
  $(".button-collapse").sideNav();
  $('.modal').modal();
  //$('.carousel').carousel();
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  //$('.carousel').carousel('next');
  //$('.carousel').carousel('prev');
  $('select').material_select();
  $('input#input_text').characterCounter();
  $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 80,
      /*today: 'Today',*/
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true,
      format: 'yyyy-mm-dd'
  });
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'right', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );

  /*$('input.autocomplete').autocomplete({
      data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
      },
      limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
      onAutocomplete: function(val) {
        // Callback function when value is autcompleted.
        console.log('>> ', val);
      },
      minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });*/

  //load_content('#user_navbar', './includes/user_navbar.hbs');
});