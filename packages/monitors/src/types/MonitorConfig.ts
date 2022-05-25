import { TargetConfig } from './TargetConfig';

export type MonitorConfig = {
  location: string;
  prefixNames: boolean;
  ping: {
    enabled: boolean;
    display: string;
  };
  suite: {
    display: string;
  };
  targets: {
    [id: string]: TargetConfig;
  };
};
