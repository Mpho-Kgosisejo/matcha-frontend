$(document).ready(function(){
    //Materialize... 
    $(".button-collapse").sideNav();
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
        closeOnSelctet: true
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

    //load_content('#user_navbar', './includes/user_navbar.hbs');
});