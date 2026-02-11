import { blastCandy } from "./candy_blast.js";

export const validateLiberty = (swiped, swiper) => {
  const dx = Math.abs(swiper.x - swiped.x);
  const dy = Math.abs(swiper.y - swiped.y);

  const isHorizontalLiberty = dx === 0 && dy === 1;
  const isVerticalLiberty = dy === 0 && dx === 1;
  const success = isHorizontalLiberty || isVerticalLiberty;

  return success;
};

export const updateCandies = (swiped, swiper, screen) => {
  const temp = swiped.value;
  swiped.value = swiper.value;
  screen[swiped.y][swiped.x] = swiper.value;
  swiper.value = temp;
  screen[swiper.y][swiper.x] = temp;
};

export const validateBlast = (swiped, swiper, screen) => {
  updateCandies(swiped, swiper, screen);

  const { swipedBlasts, swiperBlasts, allMatches } = blastCandy({
    swiped,
    swiper,
    screen,
  });

  if (swiperBlasts.success || swipedBlasts.success) {
    return { success: true, candiesToBlast: allMatches };
  }

  updateCandies(swiped, swiper, screen);
  return { success: false, candiesToBlast: [] };
};

export const swipeCandy = ({ swiped, swiper, screen }) => {
  const isLiberty = validateLiberty(swiped, swiper);
  const isBlastPossible = validateBlast(swiped, swiper, screen);

  if (isLiberty && isBlastPossible.success) {
    return isBlastPossible.candiesToBlast;
  }

  return [];
};
