$('form').submit(function (e) {
    e.preventDefault();

    // Declare necessary variables
    var searchTerm = document.getElementById("search");
    var omdb = "http://www.omdbapi.com/?s=";
    var yearInput = document.getElementById('year');
	var yearInputValue = yearInput.value;
	var yearSearch = "&y=" + yearInputValue;

    //console.log(searchTerm.value);
    

    var omdbSearch = omdb + searchTerm.value;

    if (yearInputValue != "") {

    	omdbSearch = omdb + searchTerm.value + yearSearch;
    }


   // console.log(omdbSearch);
    
    // HTTP GET Request to OMDB
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	    if (request.readyState === 4) {
	        if (request.status === 200) {
	           
	           // store the request response in a variable
	            var response = request.responseText;
	            var movies = document.getElementById("movies");
	            
	            // make sure that results from previous searches are not kept on the page
	            movies.innerHTML = "";


	            // parse the JSON
	           		var movieItems = JSON.parse(response);

	           	

	           	//check to see that there are search results
	          	 	if (movieItems.Response === "True") { 

	          	 	

	           
	            //iterate over movie items
	          		for (var i=0; i<movieItems.Search.length; i++) {

	          	 	var title = "<span class='movie-title'>" + movieItems.Search[i].Title + "</span>";
	          	 	var year = "<span class='movie-year'>" + movieItems.Search[i].Year + "</span>";
	          	 	var imdb = movieItems.Search[i].imdbID;
	          	 	var imdbButton = "<a class='imdbButton' target='_blank' href='http://www.imdb.com/title/" + imdb + "'>View on IMDB</a>";
	          	 	var pageButton = "<a id='pageButton' class='pageButton'>More...</a>";
					

	          	 	// display the poster image if it is not N/A
	          	 	if (movieItems.Search[i].Poster != "N/A") {
	          	 	var img = "<div class='poster-wrap'><img class='movie-poster' src='" + movieItems.Search[i].Poster + "' alt='" + title + "'/></div>";
	          	 }

	          	 	// if the poster image is N/A, display a placeholder instead
	          	 	else if (movieItems.Search[i].Poster = "N/A") {
	          	 		var img = "<div class='poster-wrap'><i class='material-icons poster-placeholder'>crop_original</i></div>";
	          	 	}

	          	 	var pageResult = img + title + year + imdbButton;
	          	 
	        		// add information for each search result to the page
	        		movies.innerHTML = movies.innerHTML + "<li>" + img + title + year + imdbButton + pageButton + "</li>";

	        		
			        }


			        
	        	

			    }
	        		
	        

	        else if(movieItems.Response === "False") {


					console.log(movieItems.Response);	           
	        	  	movies.innerHTML = "<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>No movies found for search: " + searchTerm.value + ".</li>";

	        			
	        		}
	        		
	    }
	}
	};


	request.open("GET", omdbSearch , true);
	request.send(null);

 }); 







