import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  LayoutChangeEvent,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { modulStyles, COLORS, GRADIENTS } from '../styles/modul-hukum-newton';
import { SafeAreaView } from 'react-native-safe-area-context';


type SectionKey = 'introduction' | 'principles' | 'applications' | 'examples' | 'calculator';

type UserData = {
  name?: string;
  avatar?: string;
};

function makeInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? 'J';
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? 'D';
  return (a + b).toUpperCase();
}

export default function ModulHukumNewtonScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [userName, setUserName] = useState('John Doe');
  const [userAvatar, setUserAvatar] = useState('JD');

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    intro: false,
    principles: false,
    applications: false,
    examples: false,
  });

  const [shownAnswers, setShownAnswers] = useState<Record<string, boolean>>({
    ex1: false,
    ex2: false,
    ex3: false,
  });

  const [mass, setMass] = useState('');
  const [force, setForce] = useState('');
  const [resultText, setResultText] = useState('Percepatan: - m/s²');
  const [resultColor, setResultColor] = useState(COLORS.purple);

  const [anchors, setAnchors] = useState<Record<SectionKey, number>>({
    introduction: 0,
    principles: 0,
    applications: 0,
    examples: 0,
    calculator: 0,
  });

  useEffect(() => {
    // web: initializeUserInfo() -> redirect kalau tidak ada user
    (async () => {
      const userStr = await AsyncStorage.getItem('currentUser');
      if (!userStr) {
        router.replace('/');
        return;
      }
      try {
        const u: UserData = JSON.parse(userStr);
        const name = u?.name || 'John Doe';
        setUserName(name);
        setUserAvatar(u?.avatar || makeInitials(name));
      } catch {
        router.replace('/');
      }
    })();
  }, [router]);

  const onLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar dari akun?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('currentUser');
          router.replace('/');
        },
      },
    ]);
  };

  const goBackToDashboard = () => {
    // web: kembali ke homepage.html
    // di mobile: balik ke halaman sebelumnya jika ada, kalau tidak ada -> ke tabs
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)' as any);
  };

  const goToSimulation = () => {
    // web: simulation-hukum-newton.html?lab=newton-laws
    router.push({ pathname: '/simulation', params: { lab: 'newton-laws' } } as any);
  };

  const toggle = (key: keyof typeof collapsed) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAnswer = (key: keyof typeof shownAnswers) => {
    setShownAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateAcceleration = () => {
    const m = parseFloat(mass);
    const f = parseFloat(force);

    if (Number.isNaN(m) || Number.isNaN(f) || m <= 0) {
      setResultText('Masukkan nilai yang valid!');
      setResultColor('#dc3545');
      return;
    }

    const a = f / m;
    setResultText(`Percepatan: ${a.toFixed(2)} m/s²`);
    setResultColor('#28a745');
  };

  const onAnchorLayout = (key: SectionKey) => (e: any) => {
    // ambil y dulu supaya gak akses event yang sudah null
    const y = e?.nativeEvent?.layout?.y ?? 0;
    setAnchors((prev) => ({ ...prev, [key]: y }));
    };


  const scrollToSection = (key: SectionKey) => {
    scrollRef.current?.scrollTo({ y: Math.max(anchors[key] - 10, 0), animated: true });
  };

  const avatarNode = useMemo(() => {
    return (
      <Pressable
        onPress={() => router.push('/profile-settings')}
        style={({ pressed }) => [pressed ? { opacity: 0.85 } : null]}
      >
        <LinearGradient colors={GRADIENTS.primary} style={modulStyles.avatar}>
          <Text style={modulStyles.avatarText}>{userAvatar}</Text>
        </LinearGradient>
      </Pressable>
    );
  }, [router, userAvatar]);

  return (
    <View style={modulStyles.screen}>
                {/* HEADER (simple mobile) */}
    <SafeAreaView edges={['top']} style={modulStyles.header}>
    <View style={modulStyles.headerInnerOneRow}>
        {/* Back */}
        <Pressable onPress={goBackToDashboard} style={modulStyles.backIconBtn}>
        <Text style={modulStyles.backIcon}>‹</Text>
        </Pressable>

        {/* Logo + Title */}
        <View style={modulStyles.headerCenter}>
        <Image source={require('../assets/images/4.png')} style={modulStyles.logoImg} />
        <Text style={modulStyles.logoText}>PhysicsLab Virtual</Text>
        </View>

        {/* Profile */}
        <Pressable onPress={() => router.push('/profile-settings')}>
        <LinearGradient colors={GRADIENTS.primary} style={modulStyles.avatar}>
            <Text style={modulStyles.avatarText}>{userAvatar}</Text>
        </LinearGradient>
        </Pressable>
    </View>
    </SafeAreaView>


      <ScrollView ref={scrollRef} contentContainerStyle={modulStyles.scrollContent}>
        <View style={modulStyles.container}>
          {/* MODULE HEADER */}
          <LinearGradient colors={GRADIENTS.primary} style={modulStyles.moduleHeader}>
            <Text style={modulStyles.moduleTitle}>Modul Hukum Newton II</Text>
            <Text style={modulStyles.moduleSubtitle}>Hubungan Gaya, Massa, dan Percepatan</Text>
          </LinearGradient>

          {/* TOC */}
          <View style={modulStyles.toc}>
            <Text style={modulStyles.tocTitle}>📖 Daftar Isi</Text>

            <View style={modulStyles.tocRow}>
              <Pressable onPress={() => scrollToSection('introduction')} style={modulStyles.tocPill}>
                <Text style={modulStyles.tocPillText}>Pendahuluan</Text>
              </Pressable>
              <Pressable onPress={() => scrollToSection('principles')} style={modulStyles.tocPill}>
                <Text style={modulStyles.tocPillText}>Prinsip Dasar</Text>
              </Pressable>
              <Pressable onPress={() => scrollToSection('applications')} style={modulStyles.tocPill}>
                <Text style={modulStyles.tocPillText}>Aplikasi Nyata</Text>
              </Pressable>
              <Pressable onPress={() => scrollToSection('examples')} style={modulStyles.tocPill}>
                <Text style={modulStyles.tocPillText}>Contoh Perhitungan</Text>
              </Pressable>
              <Pressable onPress={() => scrollToSection('calculator')} style={modulStyles.tocPill}>
                <Text style={modulStyles.tocPillText}>Kalkulator</Text>
              </Pressable>
            </View>
          </View>

          {/* INTRODUCTION */}
          <View onLayout={onAnchorLayout('introduction')} />
          <View style={modulStyles.sectionCard}>
            <Pressable onPress={() => toggle('intro')} style={modulStyles.sectionToggle}>
              <Text style={modulStyles.sectionToggleText}>📚 Pendahuluan Hukum Newton II</Text>
              <Text style={modulStyles.sectionChevron}>{collapsed.intro ? '▶' : '▼'}</Text>
            </Pressable>

            {!collapsed.intro && (
              <View style={modulStyles.sectionContent}>
                <Text style={modulStyles.paragraph}>
                  <Text style={modulStyles.bold}>Hukum Newton II</Text> adalah salah satu hukum fundamental
                  dalam fisika yang menjelaskan hubungan antara gaya, massa, dan percepatan suatu benda.
                </Text>

                <LinearGradient colors={[COLORS.pink, COLORS.purple]} style={modulStyles.formulaBox}>
                  <Text style={modulStyles.formulaMain}>F = m × a</Text>
                  <Text style={modulStyles.formulaSub}>Gaya = Massa × Percepatan</Text>
                </LinearGradient>

                <View style={modulStyles.grid}>
                  <View style={modulStyles.conceptCard}>
                    <Text style={modulStyles.conceptTitle}>F (Gaya)</Text>
                    <Text style={modulStyles.conceptText}>
                      Gaya total yang bekerja pada benda, diukur dalam Newton (N)
                    </Text>
                  </View>

                  <View style={modulStyles.conceptCard}>
                    <Text style={modulStyles.conceptTitle}>m (Massa)</Text>
                    <Text style={modulStyles.conceptText}>
                      Jumlah materi dalam benda, diukur dalam kilogram (kg)
                    </Text>
                  </View>

                  <View style={modulStyles.conceptCard}>
                    <Text style={modulStyles.conceptTitle}>a (Percepatan)</Text>
                    <Text style={modulStyles.conceptText}>
                      Perubahan kecepatan per satuan waktu, diukur dalam m/s²
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* PRINCIPLES */}
          <View onLayout={onAnchorLayout('principles')} />
          <View style={modulStyles.sectionCard}>
            <Pressable onPress={() => toggle('principles')} style={modulStyles.sectionToggle}>
              <Text style={modulStyles.sectionToggleText}>⚖️ Prinsip Dasar</Text>
              <Text style={modulStyles.sectionChevron}>{collapsed.principles ? '▶' : '▼'}</Text>
            </Pressable>

            {!collapsed.principles && (
              <View style={modulStyles.sectionContent}>
                <View style={modulStyles.grid}>
                  <View style={modulStyles.conceptCard}>
                    <Text style={modulStyles.conceptTitle}>Hubungan Proporsional</Text>
                    <Text style={modulStyles.conceptText}>
                      Percepatan berbanding lurus dengan gaya total yang bekerja pada benda
                    </Text>
                  </View>
                  <View style={modulStyles.conceptCard}>
                    <Text style={modulStyles.conceptTitle}>Hubungan Terbalik</Text>
                    <Text style={modulStyles.conceptText}>
                      Percepatan berbanding terbalik dengan massa benda
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* APPLICATIONS */}
          <View onLayout={onAnchorLayout('applications')} />
          <View style={modulStyles.sectionCard}>
            <Pressable onPress={() => toggle('applications')} style={modulStyles.sectionToggle}>
              <Text style={modulStyles.sectionToggleText}>🌍 Aplikasi Nyata</Text>
              <Text style={modulStyles.sectionChevron}>{collapsed.applications ? '▶' : '▼'}</Text>
            </Pressable>

            {!collapsed.applications && (
              <View style={modulStyles.sectionContent}>
                <View style={modulStyles.grid}>
                  <View style={modulStyles.conceptCard}>
                    <Text style={modulStyles.conceptTitle}>Mobil vs Truk</Text>
                    <Text style={modulStyles.conceptText}>
                      Mobil ringan lebih mudah dipercepat dibanding truk berat dengan mesin yang sama
                    </Text>
                  </View>
                  <View style={modulStyles.conceptCard}>
                    <Text style={modulStyles.conceptTitle}>Olahraga</Text>
                    <Text style={modulStyles.conceptText}>
                      Atlet menggunakan teknik untuk memaksimalkan gaya dan meminimalkan massa efektif
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* EXAMPLES */}
          <View onLayout={onAnchorLayout('examples')} />
          <View style={modulStyles.sectionCard}>
            <Pressable onPress={() => toggle('examples')} style={modulStyles.sectionToggle}>
              <Text style={modulStyles.sectionToggleText}>🧮 Contoh Perhitungan</Text>
              <Text style={modulStyles.sectionChevron}>{collapsed.examples ? '▶' : '▼'}</Text>
            </Pressable>

            {!collapsed.examples && (
              <View style={modulStyles.sectionContent}>
                <View style={modulStyles.examplesGrid}>
                  {/* Example 1 */}
                  <View style={modulStyles.exampleCard}>
                    <Text style={modulStyles.exampleTitle}>Contoh 1: Mobil Ringan</Text>
                    <Text style={modulStyles.exampleHint}>
                      Mobil ringan dengan gaya mesin 2000 N menghasilkan percepatan berapa?
                    </Text>

                    <View style={modulStyles.exampleValues}>
                      <Text style={modulStyles.mono}>m = 1000 kg</Text>
                      <Text style={modulStyles.mono}>F = 2000 N</Text>
                      {shownAnswers.ex1 && (
                        <Text style={modulStyles.mono}>a = F/m = 2000/1000 = 2 m/s²</Text>
                      )}
                    </View>

                    <Pressable onPress={() => toggleAnswer('ex1')} style={modulStyles.showAnswerBtn}>
                      <Text style={modulStyles.showAnswerText}>
                        {shownAnswers.ex1 ? 'Sembunyikan Jawaban' : 'Tampilkan Jawaban'}
                      </Text>
                    </Pressable>
                  </View>

                  {/* Example 2 */}
                  <View style={modulStyles.exampleCard}>
                    <Text style={modulStyles.exampleTitle}>Contoh 2: Truk Berat</Text>
                    <Text style={modulStyles.exampleHint}>
                      Truk berat dengan gaya mesin yang sama menghasilkan percepatan berapa?
                    </Text>

                    <View style={modulStyles.exampleValues}>
                      <Text style={modulStyles.mono}>m = 5000 kg</Text>
                      <Text style={modulStyles.mono}>F = 2000 N</Text>
                      {shownAnswers.ex2 && (
                        <Text style={modulStyles.mono}>a = F/m = 2000/5000 = 0.4 m/s²</Text>
                      )}
                    </View>

                    <Pressable onPress={() => toggleAnswer('ex2')} style={modulStyles.showAnswerBtn}>
                      <Text style={modulStyles.showAnswerText}>
                        {shownAnswers.ex2 ? 'Sembunyikan Jawaban' : 'Tampilkan Jawaban'}
                      </Text>
                    </Pressable>
                  </View>

                  {/* Example 3 */}
                  <View style={modulStyles.exampleCard}>
                    <Text style={modulStyles.exampleTitle}>Contoh 3: Gaya Ganda</Text>
                    <Text style={modulStyles.exampleHint}>
                      Dengan menggandakan gaya, percepatan menjadi berapa?
                    </Text>

                    <View style={modulStyles.exampleValues}>
                      <Text style={modulStyles.mono}>m = 1000 kg</Text>
                      <Text style={modulStyles.mono}>F = 4000 N</Text>
                      {shownAnswers.ex3 && (
                        <Text style={modulStyles.mono}>a = F/m = 4000/1000 = 4 m/s²</Text>
                      )}
                    </View>

                    <Pressable onPress={() => toggleAnswer('ex3')} style={modulStyles.showAnswerBtn}>
                      <Text style={modulStyles.showAnswerText}>
                        {shownAnswers.ex3 ? 'Sembunyikan Jawaban' : 'Tampilkan Jawaban'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* CALCULATOR */}
          <View onLayout={onAnchorLayout('calculator')} />
          <View style={modulStyles.calculatorCard}>
            <Text style={modulStyles.calculatorTitle}>🧮 Kalkulator Hukum Newton II</Text>

            <View style={modulStyles.calcInputsRow}>
              <View style={modulStyles.calcInput}>
                <Text style={modulStyles.calcLabel}>Massa (kg)</Text>
                <TextInput
                  value={mass}
                  onChangeText={setMass}
                  placeholder="Masukkan massa"
                  keyboardType="numeric"
                  style={modulStyles.calcTextInput}
                />
              </View>

              <View style={modulStyles.calcInput}>
                <Text style={modulStyles.calcLabel}>Gaya (N)</Text>
                <TextInput
                  value={force}
                  onChangeText={setForce}
                  placeholder="Masukkan gaya"
                  keyboardType="numeric"
                  style={modulStyles.calcTextInput}
                />
              </View>
            </View>

            <Pressable onPress={calculateAcceleration}>
              <LinearGradient colors={GRADIENTS.primary} style={modulStyles.btnPrimary}>
                <Text style={modulStyles.btnPrimaryText}>Hitung Percepatan</Text>
              </LinearGradient>
            </Pressable>

            <View style={modulStyles.calcResultBox}>
              <Text style={[modulStyles.calcResultText, { color: resultColor }]}>{resultText}</Text>
            </View>
          </View>

          {/* CTA */}
          <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 60 }}>
            <Pressable onPress={goToSimulation}>
              <LinearGradient colors={GRADIENTS.primary} style={modulStyles.btnPrimary}>
                <Text style={modulStyles.btnPrimaryText}>🚀 Coba Simulasi Interaktif</Text>
              </LinearGradient>
            </Pressable>
          </View>

          {/* FOOTER: sengaja dihapus sesuai permintaan */}
        </View>
      </ScrollView>
    </View>
  );
}