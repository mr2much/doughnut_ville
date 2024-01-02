# Doughtnut Ville

Brief project description goes here.

## Features

- [ ] Implement search feature on main screen

## Client-Side (Front-End):

- [x] Conditionals will be added as part of the new filter
-       [x] Add conditional dropdown next to Select Column dropdown
-       [x] Remove conditional dropdown from container on the left
-       [x] Remove container on the left
-       [x] Test building new query string with new page structure

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
-       [x] When pressing the button, remove all filters
-       [x] When pressing the button, all controls must reset
-       [x] When pressing the button, all entries should be displayed
- [ ] Add multiple filters
-       [x] Add elements for the filters
-           [x] Create search query matching filters
-               [x] Search query should be created from client side code
-               [x] Search query should contain selected conditionals
-               [x] Search query should contain specified criteria
-       [x] Add button to remove unwanted filters
-       [x] Send object containing the filter criteria to the server
-       [x] When pressing the Search button, display results matching filters
-       [ ] When removing one of the filters, apply filters with existing ones
- [ ] Sort entries by column type, and values

## Server-Side (Back-End):

- [x] Search should search the provided value in the DB by querying the specified column
-       [x] Define search algorithm
-       [x] Define search query on server side
-       [x] Use client side comparisson operators for search query
- [x] Define route for search without ID
- [x] Handle errors
-       [x] Fix errors where two requests are being sent at once.
- [x] Add path to receive requests containing filtered queries
-       [x] Build query string containing filter criteria
-       [x] Query database using query string
-       [x] Send back results of the search query

## Bugs

- ~~Query string can't have repeated conditions with current implementation~~ _Fixed_
- ~~Two filters, apply condition first. More than two, apply condition last.~~ _Fixed_
- Fix layout with column dropdown and filter dropdown
- Fix layout issue with filter dropdown which causes misalignments when reducing the size of the screen
