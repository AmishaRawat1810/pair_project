import { blastCandy } from "./candy_blast.js";

export const validateLiberty = (swiped, swiper) => {
  const dx = Math.abs(swiper.x - swiped.x);
  const dy = Math.abs(swiper.y - swiped.y);
  return (dx === 0 && dy === 1) || (dy === 0 && dx === 1);
};

export const swapCandies = (swiped, swiper, screen) => {
  const temp = swiped.value;

  // Update objects
  swiped.value = swiper.value;
  swiper.value = temp;

  // Update grid
  screen[swiped.y][swiped.x] = swiped.value;
  screen[swiper.y][swiper.x] = swiper.value;
};

export const swipeCandy = ({ swiped, swiper, screen }) => {
  if (!validateLiberty(swiped, swiper)) return { success: false };

  swapCandies(swiped, swiper, screen);

  const { swipedBlasts, swiperBlasts, allMatches } = blastCandy({
    swiped,
    swiper,
    screen,
  });

  if (swiperBlasts.success || swipedBlasts.success) {
    return { success: true, candiesToBlast: allMatches };
  }

  swapCandies(swiped, swiper, screen);
  return { success: false, candiesToBlast: [] };
};
