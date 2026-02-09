# flow of program:

- fill candies.
- user swipe (candies).
- check for blast.
- increment the score.
- refill(from above candies fall).

# defaults :

- grid_size : 20, 20
- swipper : the candy that user selects first to swipe
- swipped : the candy that user selects second to swipe

# Fill Candies

- randomly choose a candy.
- fill that candy into teminal grid.

# Swiping logic

- get the swiped blocks [swipper, swipped].
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
