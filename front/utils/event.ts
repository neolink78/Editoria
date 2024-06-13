/**
 * Return whether the click is outside an element
 */
export const isClickOutside = (
  event: Event,
  el: HTMLElement | null,
): boolean => {
  let target = event.target as HTMLElement;
  if (!target) return false;
  do {
    if (target === el && target) return false;
    target = target.parentElement as HTMLElement;
  } while (target);
  // This is a click outside.
  return true;
};
