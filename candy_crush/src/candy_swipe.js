import { blastCandy } from "./candy_blast.js";

export const validateLiberty = (swiped, swiper) => {
  const dx = Math.abs(swiper.x - swiped.x);
  const dy = Math.abs(swiper.y - swiped.y);

  const isHorizontalLiberty = dx === 0 && dy === 1;
  const isVerticalLiberty = dy === 0 && dx === 1;
  const success = isHorizontalLiberty || isVerticalLiberty;

  return success;
};

export const updateCandies = (swiped, swiper) => {
  const temp = swiped.value;
  swiped.value = swiper.value;
  swiper.value = temp;
};

export const validateBlast = (swiped, swiper, screen) => {
  updateCandies(swiped, swiper);
  const candiesToBlast = [];
  let success = false;

  const { swipedBlasts, swiperBlasts } = blastCandy({ swiped, swiper, screen });

  if (swipedBlasts.success) {
    success = true;
    candiesToBlast.push(swipedBlasts.candies);
  }

  if (swiperBlasts.success) {
    success = true;
    candiesToBlast.push(swiperBlasts.candies);
  }

  if (!success) {
    updateCandies(swiped, swiper);
    return { success, "candiesToBlast": [] };
  }

  return { success, candiesToBlast };
};

export const swipeCandy = ({ swiped, swiper, screen }) => {
  const isLiberty = validateLiberty(swiped, swiper);
  const isBlastPossible = validateBlast(swiped, swiper, screen);

  if (isLiberty && isBlastPossible.success) {
    return isBlastPossible.candiesToBlast;
  }

  return { swiped, swiper };
};
