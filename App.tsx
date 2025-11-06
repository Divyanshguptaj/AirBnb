import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

export default function App() {
  // Initialize WebBrowser
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    // ...existing JSX code...
  );
}