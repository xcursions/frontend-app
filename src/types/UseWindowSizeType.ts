export type WindowSizeType = {
  width: undefined | number;
  height: undefined | number;
};

export interface UseWindowSizeType extends WindowSizeType {
  isDesktopView: boolean;
  isTabletView: boolean;
  isTabletMdView: boolean;
  isMobileView: boolean;
}
