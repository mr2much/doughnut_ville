# Project Title

Brief project description goes here.

## Features

- [ ] Implement search feature on main screen

## Client-Side (Front-End):

- [ ] Fix the date format on the Table for the home page.
- [x] Create a search interface on main screen
- [x] Add checkboxes to select which columns to display
-       [x] Add dropdown button
-       [x] Include Bootstrap bundle for dropdown functionality
-       [x] Add checkboxes listing columns
-       [x] Add a button to apply changes
-       [x] Add code to add/remove the columns checked/unchecked
-       [x] On Clear/Search, reset table to original state
-       [x] On Clear/Search, reset column checkboxes to original state
- [x] Display Search Result
- [x] Search should search in DB by specifying a column name
-       [x] Column name should be selected with a dropdown menu.
-       [ ] How to add partial search on the values for 'directions' column?
- [x] Use dropdown to select comparisson operators for search query
-       [x]  create dropdown on the search form on client side
-       [ ] add more comparisson operators to dropdown
- [x] Add button to clear search results
-       [x] When pressing the button, all controls must reset
-       [x] When pressing the button, all entries should be displayed
- [ ] Sort entries by column type, and values

## Server-Side (Back-End):

- [x] Search should search the provided value in the DB by querying the specified column
-       [x] Define search algorithm
-       [x] Define search query on server side
-       [x] Use client side comparisson operators for search query
- [x] Define route for search without ID
- [x] Handle errors
-       [x] Fix errors where two requests are being sent at once.
