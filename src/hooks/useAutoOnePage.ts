import { useMemo } from "react";

const MM_TO_PX = 3.78;
const A4_HEIGHT_PX = 297 * MM_TO_PX;
// Minimum scale of 90% to preserve readability
const MIN_SCALE = 0.9;

interface UseAutoOnePageOptions {
  contentHeight: number;
  pagePadding: number;
  enabled: boolean;
}

interface UseAutoOnePageResult {
  scaleFactor: number;
  isScaled: boolean;
  /** Content overflows even at minimum scale */
  cannotFit: boolean;
}

export function useAutoOnePage({
  contentHeight,
  pagePadding,
  enabled,
}: UseAutoOnePageOptions): UseAutoOnePageResult {
  return useMemo(() => {
    if (!enabled || contentHeight <= 0) {
      return { scaleFactor: 1, isScaled: false, cannotFit: false };
    }

    // A4 usable height = total A4 height - top and bottom margins
    const availableHeight = A4_HEIGHT_PX - 2 * pagePadding;

    // Actual content height (excluding #resume-preview top/bottom padding)
    const actualContentHeight = contentHeight - 2 * pagePadding;

    if (actualContentHeight <= availableHeight) {
      // Content fits on one page, no scaling needed
      return { scaleFactor: 1, isScaled: false, cannotFit: false };
    }

    const idealScale = availableHeight / actualContentHeight;

    if (idealScale >= MIN_SCALE) {
      // Within acceptable range, apply scale directly
      return { scaleFactor: idealScale, isScaled: true, cannotFit: false };
    }

    // Exceeds acceptable range; clamp to minimum scale and flag cannotFit
    return { scaleFactor: MIN_SCALE, isScaled: true, cannotFit: true };
  }, [contentHeight, pagePadding, enabled]);
}
