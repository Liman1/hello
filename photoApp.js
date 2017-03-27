
$(function(){
	init(); // starting the app!
});		

// Create an init method that will hold all of the code that must run upon initializing of app
init = function(){
	// create event listener on select element
	$('#button').on('click', function(){
		var subject = $("#subject").val();
		$('#photoWork').empty();
		getPhoto(subject);
	});
	
	// show-hide author, comments and likes
	$("#photoWork").on('click', '#currentPhoto', function(e) {
		position = ($('#photoWork #currentPhoto').index(this));
		$("h3:eq(" + position + ")").slideToggle("slow");
		$("h4:eq(" + position + ")").slideToggle("slow");
		$("h5:eq(" + position + ")").slideToggle("slow");		
	});	
}; 

// getting photos from 500px
getPhoto = function(query){
        $.ajax({
        url: 'https://api.500px.com/v1/photos/search?term=toronto&consumer_key=SIwRLq0AwiEydJeCT8NLk3chVNyEMgweH52bQVx5',
            method: 'GET',
            data: {
                term: query
            },
            success: function(result){
				// if getting photos success -> display in HTML
				displayPhoto(result.photos);
            },
            error: function(error){
                console.log('Something went wrong.');
            }
        });	
  };

// display photos in HTML
displayPhoto = function(photoArray){
	photoArray.forEach(function(photo){ // using jQuery forEach to loop over our array of photos
		// Creating elements for each piece of data:
		var name = $('<h2>').text(photo.name);		
		var clickImage = $('<h6>').text('Click on image for additional info');
		var image = $('<img>').attr('id', 'currentPhoto').attr('src', photo.image_url);		
		var authorName = $('<h3>').text('Author: ' + photo.user.fullname).addClass('info');
		var comments = $('<h4>').text('Number of comments: ' + photo.comments_count).addClass('info');
		var likes = $('<h5>').text('Likes: ' + photo.positive_votes_count).addClass('info');
		var horRule = $('<hr>');
		
		var photoHtml = $('<div>').addClass('photo-piece').append(horRule, name, clickImage, image, authorName, comments, likes); // Adding all of our elements into this div
		$('#photoWork').append(photoHtml); // Appending entire div to our webpage!
	});
};



  

		
	