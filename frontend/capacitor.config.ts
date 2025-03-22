import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.getbet.app',
  appName: 'getbet',
  webDir: 'build',
  plugins:{
    Clipboard:{
      enable:true
    }
  }
};

export default config;
