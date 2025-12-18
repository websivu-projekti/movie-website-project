# :clapper: Clipper

This is a website based around movies, where users are able to search for movies or series, mark their favourites, see movies that are currently in nearby theaters and create groups for movie-watching. The website is based on React and Node-technologies and uses PostgreSQL for database-related needs. This is a project created towards Web Development Project-course.

## Contents
- [Features](#features)
- [Installation](#installation)
- [Technical information](#technical-information)
- [Other information](#other-information)

## Presentation/Poster

Here you can find a presentation about how our project went and all features written more precisely. 

[https://1drv.ms/p/c/68891eacfbec9491/IQBoNQrHZQyAQa5DmfjxohbCASZMUJM3EavVJuzivBv-1sc?e=n3fDSE](https://1drv.ms/p/c/68891eacfbec9491/IQBoNQrHZQyAQa5DmfjxohbCASZMUJM3EavVJuzivBv-1sc?e=n3fDSE)

## Features

On the website, users are able to browse through movies or TV-series and get information about them. Registered or signed in users can add their favourite movies/series to their favourites-list and groups with other users for communal movie-watching.

### :star: Search for and browse movies

Users can search for movies and series from the search bar, or from the Films-page, this function doesn't require signing in. On Films-page, users can filter through movies and series using the filter bar on the side. Available filters include sorting by different ways, genres, decades, rating and by content providers available in the user's region. Search results aren't filterable due to API restrictions.

### :star: Currently playing

On the "Now in Cinemas"-page, users can see what might be playing in their region's theaters.

### :star: Create an account or sign in

Users are able to create an account from the Register-button in the header. Username, email and a password are required for creating an account.

Registered users can sign in from the Sign In-button, located in the header nearby the Register-button. Users sign in by providing their email and password.

### :star: Add a review

On movies' and TV-series' individual pages, users can leave their review of said content. Reviews consist of a star rating going from 1 to 5 stars and a possibility to write a review in the text box. Only logged in users can leave reviews, but logged out users are welcome to browse them. Logged in users are able to add movies and series to their favourites, or to 
groups they own or are a member of.

### :star: Create a group

Logged in users can create groups where other users can send join requests. Users belonging to a group can then add movies and TV-series they might want to watch to the group's list.


## Installation

The site is available for viewing on [http://13.49.77.96:3000/](http://13.49.77.96:3000/). You can also get a local development version by copying the repository.

For deploying a development version of the site, use Docker. The project uses PostgreSQL, but you won't need a server as it's driven in Docker. If you want to inspect the database, you can use psql or pgAdmin as a client. Use the `docker compose up -build` command in the project's root folder to build it. To unbuild it, use the `docker compose down` command.

## Technical information

API documentation can be viewed here [https://documenter.getpostman.com/view/43497144/2sB3dTrn85](https://documenter.getpostman.com/view/43497144/2sB3dTrn85).

Site's wireframe was made in Moqups, changes to page structure were made during development, but it still somewhat follows the initial wireframe. 
Wireframe can be viewed here [https://app.moqups.com/H3pSKjq5KR7jFpC39XbAgoNNwBFY8Yev/view/page/a03550308](https://app.moqups.com/H3pSKjq5KR7jFpC39XbAgoNNwBFY8Yev/view/page/a03550308).

Below is a class diagram of the database used:
![Class diagram of database](/documentation/DBclassdiagram.png)

## Other information

Group's work diary can be found here: [https://unioulu-my.sharepoint.com/:x:/g/personal/t2sone00_students_oamk_fi/EQMMcQR0T_tAo_flIuGgs6kBhodtleJ-5jwdfjyO5t_zeg?e=zec8ov](https://unioulu-my.sharepoint.com/:x:/g/personal/t2sone00_students_oamk_fi/EQMMcQR0T_tAo_flIuGgs6kBhodtleJ-5jwdfjyO5t_zeg?e=zec8ov)

