2048-gamecenter assignment heroku app is contained in the .zip file in this directory.

Description as follows:

README : Comp 20 Assignment 4
10 April 2014
-------
Siddhartha Prasad.

Everything listed in the requirements works correctly, including:
	- (POST) '/submit.json' that submits game information to the database
	- (GET) '/scores.json' that returns a JSON string of the scores of a particular user
	- (GET) '/' that displays scores in ascending order of all the players using the gamecenter.

Collaboration with:
- George Brown
- Max Cohen
- Victor Chao
- Skyler Tom
- Jasper Degens for Workshop and Code Boilerplate

Time spent of assignment:
 - 6 hours
--------------------------------------------------------------------------
The grid in the 2048 game is declared in 'grid.js'. The object the grid is
 stored in is of type 'Grid'. The variable of type grid used in game_manager.js is called 'grid', and is stored in the GameManager object. Cells in the grid are stored in a 2D array.

The score in the 2048 game is stored in a variable 'score' in the 'game_manager.js' file. It is stored in the GameManager object. It is loaded from the score value in the previous state of the game, which is contained in an object of type StorageManager.

---------------------------------------------------------------------------

The modifications made to the 2048 game files were as follows:

	- index.html: The JQuery library was included in the index file by linking the html page to a script at source http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js

	- game_manager.js : An AJAX POST to /submit.json was added using JQuery.A variable requestSent was also added to ensure requests were not sent multiple times. username was also hardcoded into the file.

----------------------------------------------------------------------------

