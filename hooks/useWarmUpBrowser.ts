import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      // Only call coolDownAsync if warmUpAsync was successful
      void WebBrowser.coolDownAsync().catch(() => {
        // Ignore errors during cleanup
      });
    };
  }, []);
};
