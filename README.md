# You Came to the Right Neighborhood
New in the neighborhood? Find amnenities and other useful services that are few minutes of walk away!

## Try it out!
https://simonhuang.ca/ycttrn/

## Inspiration
Finding a new place to live is always difficult as you don't always know what services are close to you. _You Came to the Right Neighborhood _ helps you locate those amenities and services that are within a few blocks away! The application gives you an overview of what to expect if you ever decide to live in that area and helps you make better decisions.

## What it does
Select a radius and drop a pin to any location within Montreal. Icons representing grocery stores, schools, hospitals, clinics, bus stops and metro stops that are located in the area within range will be displayed.

## How we built it
The frontend was built using React and MapBox. Backend is done with Node.js and Express.js

## Challenges we ran into
Populating the database with the coordinates of all services is very difficult as the location data is not readily available. Some scraping methods had to used and not everything can be listed in the database.

## Accomplishments that we are proud of
The simple and clean web interface is quite nice.

## What we learned
It is really hard to retrieve a large data set of specific services in an area. CORS requirements when communicating with frontend and backend during development.

## What's next for You Came to the Right Neighborhood
Populate the database with even more data! With only ~10 000+ entries (Mostly consisting of bus stops), it is still not enough to give an overview of a spot
