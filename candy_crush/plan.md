# flow of program:

- fill candies.
- user swipe (candies).
- check for blast.
- increment the score.
- refill(from above candies fall).

# defaults :

- grid_size : 10 , 10
- candies : 🍬 , 🍭 , 🍩 , 🍪
- swiped : the candy that user selects first to swipe
- swiper : the candy that user selects second to swipe

# Fill Candies

- randomly choose candies to fill the grid.

# Display

- fill that candies into teminal grid.


# Swiping logic

- get the swiped blocks [swiped, swiper].
- validate swiped block:
  - only perpendicular neighbour blocks gets swiped.
- swap candies if [Blast Possible].
- otherwise don't swap.

# matching logic

- 3 consequtive matches : return true.

# blasting logic

- check for similar candies in 3 directions, except from direction it was
  swipped from.
- For checking :take two from each direction, check for match.

# increment the score

- 1 candy : 1 score.
- blasting candy will give more score.

# refilling the grid

- blasted candies get removed
- above candies are pushed down
- new candies are pushed from the above

# architecture. 
- 
