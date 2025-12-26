import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';

import { simStyles, GRADIENTS } from '../styles/simulation-hukum-newton';

type CurrentUser = {
  name?: string;
  avatar?: string;
  initials?: string;
  photo?: string;
};

async function readBundledText(moduleId: number) {
  const asset = Asset.fromModule(moduleId);
  await asset.downloadAsync();
  const uri = asset.localUri ?? asset.uri;
  return await FileSystem.readAsStringAsync(uri);
}

export default function SimulationNewtonScreen() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [html, setHtml] = useState<string>('');

  const avatarText = useMemo(() => user?.avatar || user?.initials || 'U', [user]);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('currentUser');
      if (!raw) return setUser({ name: 'User', avatar: 'U' });
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser({ name: 'User', avatar: 'U' });
      }
    })();
  }, []);

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)' as any);
  };

  // 1) Load HTML/CSS/JS dari assets .txt
  useEffect(() => {
    (async () => {
      const [htmlText, cssText, jsText] = await Promise.all([
        readBundledText(require('../assets/web/simulation/simulation-hukum-newton.html.txt')),
        readBundledText(require('../assets/web/simulation/simulation-hukum-newton.css.txt')),
        readBundledText(require('../assets/web/simulation/simulation-hukum-newton.js.txt')),
      ]);

      // buang footer (kamu minta jangan pakai footer)
      let patched = htmlText.replace(/<footer[\s\S]*?<\/footer>/gi, '');

      // inline CSS
      patched = patched.replace(
        /<link[^>]*rel=["']stylesheet["'][^>]*>/gi,
        `<style>\n${cssText}\n</style>`
      );

      const hideHeaderCss = `
        <style>
        header, .dashboard-header, .navbar, .topbar { display:none !important; }
        footer { display:none !important; }

        /* Biar tidak kebesaran di HP */
        #canvas { width: 100% !important; max-width: 100% !important; height: 260px !important; }
        .container { padding: 12px !important; }
        </style>
        `;

        patched = patched.replace('</head>', `${hideHeaderCss}\n</head>`);


      // inline JS (replace script src *.js)
      patched = patched.replace(
        /<script[^>]*src=["'][^"']+\.js["'][^>]*><\/script>/gi,
        `<script>\n${jsText}\n</script>`
      );

      // fallback kalau link/script gak ketemu
      if (!patched.includes('<style>')) {
        patched = patched.replace('</head>', `<style>\n${cssText}\n</style>\n</head>`);
      }
      if (!patched.includes(jsText)) {
        patched = patched.replace('</body>', `<script>\n${jsText}\n</script>\n</body>`);
      }

      // penting: pastikan ada body (buat jaga-jaga)
      setHtml(patched);
    })();
  }, []);

    const injectedBeforeLoad = useMemo(() => {
    return `
        (function () {
        // ===== localStorage POLYFILL (karena WebView kamu blok) =====
        try {
            var __mem = {};
            Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: function(k){ return __mem.hasOwnProperty(k) ? __mem[k] : null; },
                setItem: function(k,v){ __mem[k] = String(v); },
                removeItem: function(k){ delete __mem[k]; },
                clear: function(){ __mem = {}; }
            },
            configurable: true
            });
        } catch(e) {}

        // ===== cegah fungsi header web crash =====
        window.initializeUserInfo = function(){};

        // ===== pastikan init setelah DOM siap =====
        window.__BOOT_SIM__ = function(){
            try {
            if (typeof NewtonLawSimulation === 'function') {
                if (!window.__SIM_INSTANCE__) window.__SIM_INSTANCE__ = new NewtonLawSimulation();
            }
            } catch (e) {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage('WEB_ERROR:BOOT_FAIL ' + (e && e.message ? e.message : 'unknown'));
            }
            }
        };

        document.addEventListener('DOMContentLoaded', function(){
            setTimeout(window.__BOOT_SIM__, 50);
        });

        // debug error
        window.onerror = function(msg, src, line, col) {
            if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('WEB_ERROR:' + msg + ' @' + line + ':' + col);
            }
        };
        })();
        true;
    `;
    }, []);


  // 3) Setelah halaman keload: PAKSA init NewtonLawSimulation kalau belum kebentuk
  const injectedAfterLoad = useMemo(() => {
    return `
      (function(){
        try {
          if (!window.__SIM_INITED__ && typeof NewtonLawSimulation === 'function') {
            window.__SIM_INITED__ = true;
            window.__SIM_INSTANCE__ = new NewtonLawSimulation();
          }
        } catch (e) {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('WEB_ERROR:INIT_FAIL ' + (e && e.message ? e.message : 'unknown'));
          }
        }
      })();
      true;
    `;
  }, []);

  const onMessage = (event: any) => {
    const msg = event?.nativeEvent?.data;

    if (msg === 'GO_BACK') goBack();
    if (msg === 'OPEN_PROFILE') router.push('/profile-settings');

    // kalau mau lihat error JS dari WebView (sementara)
    if (typeof msg === 'string' && msg.startsWith('WEB_ERROR:')) {
      console.log(msg);
    }
  };

  return (
    <View style={simStyles.screen}>
      <SafeAreaView edges={['top']} style={simStyles.header}>
        <View style={simStyles.headerInnerOneRow}>
          <Pressable onPress={goBack} style={simStyles.backIconBtn}>
            <Text style={simStyles.backIcon}>‹</Text>
          </Pressable>

          <View style={simStyles.headerCenter}>
            <Image source={require('../assets/images/4.png')} style={simStyles.logoImg} />
            <Text style={simStyles.logoText}>PhysicsLab Virtual</Text>
          </View>

          <Pressable onPress={() => router.push('/profile-settings')}>
            <LinearGradient colors={GRADIENTS.primary} style={simStyles.avatar}>
              <Text style={simStyles.avatarText}>{avatarText}</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>

      {html ? (
        <WebView
          originWhitelist={['*']}
          source={{ html }}
          injectedJavaScriptBeforeContentLoaded={injectedBeforeLoad}
          injectedJavaScript={injectedAfterLoad}
          onMessage={onMessage}
          javaScriptEnabled
          domStorageEnabled
          style={simStyles.webview}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Loading simulation...</Text>
        </View>
      )}
    </View>
  );
}