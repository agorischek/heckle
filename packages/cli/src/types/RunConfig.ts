import { Target } from '@heckle/core';

export type RunConfig = {
  targets: {
    [key: string]: Target;
  };
};
