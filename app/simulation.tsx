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
  email?: string;
  id?: string | number;
};

async function readBundledText(moduleId: number) {
  const asset = Asset.fromModule(moduleId);
  await asset.downloadAsync();
  const uri = asset.localUri ?? asset.uri;
  return await FileSystem.readAsStringAsync(uri);
}

function safeUserKey(user: CurrentUser | null) {
  const raw =
    (user?.id != null ? String(user.id) : '') ||
    (user?.email ? user.email : '') ||
    (user?.name ? user.name : '') ||
    'guest';
  return raw.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export default function SimulationNewtonScreen() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [html, setHtml] = useState<string>('');

  // ✅ progres persistent (di-load dari AsyncStorage, bukan reset 0)
  const [savedCount, setSavedCount] = useState<string>('0');
  const [savedTotalTime, setSavedTotalTime] = useState<string>('0');
  const [statsReady, setStatsReady] = useState(false);

  const avatarText = useMemo(() => user?.avatar || user?.initials || 'U', [user]);
  const userKey = useMemo(() => safeUserKey(user), [user]);

  const STORAGE_KEYS = useMemo(() => {
    const prefix = `sim:newton:${userKey}:`;
    return {
      simCount: `${prefix}simulationCount`,
      totalTime: `${prefix}totalTime`,
    };
  }, [userKey]);

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

  // ✅ load progres per user saat userKey sudah ada
  useEffect(() => {
    (async () => {
      // tunggu userKey ada (minimal guest)
      if (!userKey) return;
      const [c, t] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.simCount),
        AsyncStorage.getItem(STORAGE_KEYS.totalTime),
      ]);
      setSavedCount(c ?? '0');
      setSavedTotalTime(t ?? '0');
      setStatsReady(true);
    })();
  }, [STORAGE_KEYS.simCount, STORAGE_KEYS.totalTime, userKey]);

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)' as any);
  };

  useEffect(() => {
    (async () => {
      const [htmlText, cssText, jsText] = await Promise.all([
        readBundledText(require('../assets/web/simulation/simulation-hukum-newton.html.txt')),
        readBundledText(require('../assets/web/simulation/simulation-hukum-newton.css.txt')),
        readBundledText(require('../assets/web/simulation/simulation-hukum-newton.js.txt')),
      ]);

      // ✅ ini tetap seperti kode kamu (hapus footer jika kamu memang mau)
      // NOTE: kalau JS kamu butuh elemen di footer, jangan hapus.
      let patched = htmlText.replace(/<footer[\s\S]*?<\/footer>/gi, '');

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

      patched = patched.replace(
        /<script[^>]*src=["'][^"']+\.js["'][^>]*><\/script>/gi,
        `<script>\n${jsText}\n</script>`
      );

      if (!patched.includes('<style>')) {
        patched = patched.replace('</head>', `<style>\n${cssText}\n</style>\n</head>`);
      }
      if (!patched.includes(jsText)) {
        patched = patched.replace('</body>', `<script>\n${jsText}\n</script>\n</body>`);
      }

      setHtml(patched);
    })();
  }, []);

  /**
   * ✅ INI KUNCINYA:
   * localStorage polyfill MEMORY + preload dari AsyncStorage (savedCount, savedTotalTime)
   * lalu setiap setItem untuk simulationCount/totalTime -> postMessage ke RN untuk disimpan
   */
  const injectedBeforeLoad = useMemo(() => {
    // string aman (tidak null)
    const initCount = JSON.stringify(savedCount ?? '0');
    const initTime = JSON.stringify(savedTotalTime ?? '0');

    return `
(function () {
  try {
    var __mem = {};
    // ✅ preload progres terakhir
    __mem["simulationCount"] = ${initCount};
    __mem["totalTime"] = ${initTime};

    function post(obj){
      try {
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify(obj));
        }
      } catch(e){}
    }

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: function(k){ return __mem.hasOwnProperty(k) ? __mem[k] : null; },
        setItem: function(k,v){
          __mem[k] = String(v);
          // ✅ sync hanya key yang kamu butuh
          if (k === "simulationCount" || k === "totalTime") {
            post({ type: "STATS_UPDATE", key: k, value: String(v) });
          }
        },
        removeItem: function(k){
          delete __mem[k];
          if (k === "simulationCount" || k === "totalTime") {
            post({ type: "STATS_REMOVE", key: k });
          }
        },
        clear: function(){ __mem = {}; }
      },
      configurable: true
    });
  } catch(e) {}

  // cegah fungsi header web crash
  window.initializeUserInfo = function(){};

  // init setelah DOM siap (kode kamu)
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

  window.onerror = function(msg, src, line, col) {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('WEB_ERROR:' + msg + ' @' + line + ':' + col);
    }
  };
})();
true;
`;
  }, [savedCount, savedTotalTime]);

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

  const onMessage = async (event: any) => {
    const msg = event?.nativeEvent?.data;

    if (msg === 'GO_BACK') goBack();
    if (msg === 'OPEN_PROFILE') router.push('/profile-settings');

    if (typeof msg === 'string' && msg.startsWith('WEB_ERROR:')) {
      console.log(msg);
      return;
    }

    // ✅ terima sync progres dari WebView polyfill
    if (typeof msg === 'string') {
      try {
        const data = JSON.parse(msg);

        if (data?.type === 'STATS_UPDATE' && (data.key === 'simulationCount' || data.key === 'totalTime')) {
          const storageKey = data.key === 'simulationCount' ? STORAGE_KEYS.simCount : STORAGE_KEYS.totalTime;
          const value = String(data.value ?? '0');
          await AsyncStorage.setItem(storageKey, value);

          // ✅ update state pakai value terbaru, bukan "0"
          if (data.key === 'simulationCount') setSavedCount(value);
          if (data.key === 'totalTime') setSavedTotalTime(value);

          return;
        }

        if (data?.type === 'STATS_REMOVE' && (data.key === 'simulationCount' || data.key === 'totalTime')) {
          const storageKey = data.key === 'simulationCount' ? STORAGE_KEYS.simCount : STORAGE_KEYS.totalTime;
          await AsyncStorage.removeItem(storageKey);

          if (data.key === 'simulationCount') setSavedCount('0');
          if (data.key === 'totalTime') setSavedTotalTime('0');
          return;
        }
      } catch {
        // ignore
      }
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

      {html && statsReady ? (
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