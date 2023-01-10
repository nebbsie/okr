export type Config = {
  noShell?: boolean;
  backgroundColour?: BackgroundColour;
  isBoard?: boolean;
};

export const enum BackgroundColour {
  WHITE = 'white',
  GREY = 'grey',
}
