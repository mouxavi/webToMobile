import React, { useRef, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView, WebViewNavigation} from 'react-native-webview';

export default function App() {
    const webViewRef = useRef<WebView | null>(null);
    const [currentUrl, setCurrentUrl] = useState('https://x.com');

    const handleNavigationStateChange = (navState: WebViewNavigation) => {
      if (navState.url.startsWith('http') && !navState.url.startsWith(currentUrl)) {
        setCurrentUrl(navState.url);
      }
    };

    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Terug"
          onPress={() => {
            if (webViewRef.current) {
              webViewRef.current.goBack();
            }
          }}
        />
      </View>
      <WebView
        ref={webViewRef}
        source={{ uri: currentUrl }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black'
    },
    buttonContainer: {
      padding: 10, 
    },
    webview: {
      flex: 1,
    },
  });