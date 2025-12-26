import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { homeStyles, COLORS, GRADIENTS } from '../../styles/homepage';
import { SafeAreaView } from 'react-native-safe-area-context';


type TabName = 'modul' | 'simulasi' | 'quiz';

type ContentItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  available: boolean;
  difficulty?: string;
  completed?: boolean;
  questions?: number;
};

const CONFIG = {
  AVAILABLE_LABS: ['newton-laws'],
  STORAGE_KEYS: {
    USER: 'currentUser',
  },
};

const CONTENT_DATA: Record<TabName, ContentItem[]> = {
  simulasi: [
    {
      id: 'newton-laws',
      title: 'Hukum II Newton',
      description:
        'Pelajari hukum II Newton dengan simulasi interaktif. Eksperimen dengan massa, gaya, dan percepatan.',
      icon: '🚀',
      difficulty: 'Pemula',
      completed: true,
      available: true,
    },
    {
      id: 'projectile-motion',
      title: 'Gerak Proyektil',
      description:
        'Simulasi gerak peluru dengan berbagai sudut dan kecepatan awal. Analisis lintasan dan jangkauan.',
      icon: '🎯',
      difficulty: 'Menengah',
      completed: false,
      available: false,
    },
    {
      id: 'waves-oscillation',
      title: 'Gelombang & Osilasi',
      description:
        'Eksplorasi gelombang mekanik, frekuensi, amplitudo, dan fenomena interferensi.',
      icon: '🌊',
      difficulty: 'Menengah',
      completed: false,
      available: false,
    },
  ],
  quiz: [
    {
      id: 'newton-laws-quiz',
      title: 'Quiz Hukum II Newton',
      description: 'Uji pemahamanmu tentang Hukum II Newton dengan 10 soal pilihan ganda.',
      icon: '🚀',
      questions: 10,
      available: true,
    },
    {
      id: 'projectile-motion-quiz',
      title: 'Quiz Gerak Proyektil',
      description: 'Tes pengetahuanmu tentang gerak peluru dengan 10 soal interaktif.',
      icon: '🎯',
      questions: 10,
      available: false,
    },
    {
      id: 'waves-oscillation-quiz',
      title: 'Quiz Gelombang & Osilasi',
      description: 'Evaluasi pemahaman gelombang dan osilasi dengan 10 soal menarik.',
      icon: '🌊',
      questions: 10,
      available: false,
    },
  ],
  modul: [
    {
      id: 'newton-laws-module',
      title: 'Modul Hukum II Newton',
      description:
        'Pelajari konsep dasar Hukum II Newton, rumus, dan aplikasi dalam kehidupan sehari-hari.',
      icon: '📖',
      difficulty: 'Pemula',
      available: true,
    },
    {
      id: 'projectile-motion-module',
      title: 'Modul Gerak Proyektil',
      description:
        'Materi lengkap tentang gerak peluru, komponen vektor, dan persamaan kinematika.',
      icon: '🎯',
      difficulty: 'Menengah',
      available: false,
    },
    {
      id: 'waves-oscillation-module',
      title: 'Modul Gelombang & Osilasi',
      description: 'Eksplorasi konsep gelombang mekanik, osilasi harmonik, dan fenomena terkait.',
      icon: '🌊',
      difficulty: 'Menengah',
      available: false,
    },
  ],
};

function getButtonText(item: ContentItem, type: TabName) {
  if (!item.available) return '🔮 Segera Hadir';
  if (type === 'simulasi') return item.completed ? '🔄 Ulangi Lab' : '🚀 Mulai Lab';
  return '🚀 Mulai';
}

function getMetaText(item: ContentItem, type: TabName) {
  // Di web, meta selalu pakai difficulty. Tapi quiz data tidak punya difficulty. :contentReference[oaicite:6]{index=6}
  // Ini fallback yang tetap “setara info”-nya untuk quiz.
  if (type === 'quiz') return `📊 ${item.questions ?? 10} Soal`;
  return `📊 ${item.difficulty ?? '-'}`;
}

function makeInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? 'J';
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? 'D';
  return (a + b).toUpperCase();
}

export default function HomePageTab() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState<TabName>('simulasi');
  const [userName, setUserName] = useState<string>('John Doe');
  const [userAvatar, setUserAvatar] = useState<string>('JD');

  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonItem, setComingSoonItem] = useState<ContentItem | null>(null);
  const [comingSoonType, setComingSoonType] = useState<TabName>('simulasi');

  const data = useMemo(() => CONTENT_DATA[activeTab] ?? [], [activeTab]);

  const numColumns = width >= 750 ? 2 : 1;

  useEffect(() => {
    // web: initializeUserInfo() redirect kalau tidak ada user :contentReference[oaicite:7]{index=7}
    (async () => {
      const userStr = await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.USER);
      if (!userStr) {
        // setara web redirect ke index.html
        router.replace('/');
        return;
      }

      try {
        const user = JSON.parse(userStr);
        const name = user?.name || 'John Doe';
        setUserName(name);
        setUserAvatar(user?.avatar || makeInitials(name));
      } catch {
        router.replace('/');
      }
    })();
  }, [router]);

  const onLogout = async () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar dari akun?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
          router.replace('/');
        },
      },
    ]);
  };

  const openComingSoon = (item: ContentItem, type: TabName) => {
    setComingSoonItem(item);
    setComingSoonType(type);
    setComingSoonOpen(true);
  };

  const closeComingSoon = () => {
    setComingSoonOpen(false);
    setComingSoonItem(null);
  };

  const handleCardAction = (item: ContentItem, type: TabName) => {
    if (!item.available) {
      openComingSoon(item, type);
      return;
    }

    if (type === 'simulasi') {
      // web: showSimulation -> simulation-hukum-newton.html?lab=... :contentReference[oaicite:8]{index=8}
      if (CONFIG.AVAILABLE_LABS.includes(item.id)) {
        // NANTI: route ini kita buat saat convert simulasi
        // aku set dulu placeholder rute yang rapi:
        router.push({ pathname: '/simulation', params: { lab: item.id } } as any);
      } else {
        openComingSoon(item, type);
      }
      return;
    }

    if (type === 'quiz') {
      // web: quiz -> quiz.html :contentReference[oaicite:9]{index=9}
      router.push('/quiz');
      return;
    }

    // modul
    if (item.id === 'newton-laws-module') {
      // web: modul newton -> modul-hukum-newton.html :contentReference[oaicite:10]{index=10}
      router.push('/modul');
      return;
    }

    openComingSoon(item, type);
  };

  return (
    <View style={homeStyles.screen}>
      {/* HEADER */}
      <SafeAreaView edges={['top']} style={homeStyles.dashboardHeader}>
        <View style={homeStyles.headerInnerOneRow}>
          {/* kiri kosong supaya title bener-bener center */}
          <View style={{ width: 44 }} />

          {/* Logo + Title */}
          <View style={homeStyles.headerCenter}>
            <Image source={require('../../assets/images/4.png')} style={homeStyles.logoImg} />
            <Text style={homeStyles.logoText}>PhysicsLab Virtual</Text>
          </View>

          {/* Profile Avatar */}
          <Pressable onPress={() => router.push('/profile-settings')}>
            <LinearGradient colors={GRADIENTS.primary} style={homeStyles.avatar}>
              <Text style={homeStyles.avatarText}>{userAvatar}</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>


      <ScrollView contentContainerStyle={homeStyles.scrollContent}>
        <View style={homeStyles.container}>
          {/* WELCOME */}
          <LinearGradient colors={GRADIENTS.primary} style={homeStyles.welcomeSection}>
            <Text style={homeStyles.welcomeTitle}>Selamat Datang di PhysicsLab Virtual!</Text>
            <Text style={homeStyles.welcomeSubtitle}>
              Eksplorasi fisika dengan simulasi interaktif, games edukatif, dan materi pembelajaran
              yang lengkap
            </Text>

            {/* “particles” versi RN (tanpa animasi CSS tapi posisi sama konsepnya) */}
            <View pointerEvents="none" style={homeStyles.particles}>
              <View style={[homeStyles.particle, homeStyles.p1]} />
              <View style={[homeStyles.particle, homeStyles.p2]} />
              <View style={[homeStyles.particle, homeStyles.p3]} />
            </View>
          </LinearGradient>

          {/* NAV TABS (Modul / Simulation / Quiz / Games) */}
          <View style={homeStyles.navTabsWrap}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={homeStyles.navTabs}>
              <Pressable
                onPress={() => setActiveTab('modul')}
                style={[homeStyles.navTab, activeTab === 'modul' && homeStyles.navTabActive]}
              >
                <Text style={homeStyles.navTabIcon}>📚</Text>
                <Text style={[homeStyles.navTabText, activeTab === 'modul' && homeStyles.navTabTextActive]}>
                  Modul
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setActiveTab('simulasi')}
                style={[homeStyles.navTab, activeTab === 'simulasi' && homeStyles.navTabActive]}
              >
                <Text style={homeStyles.navTabIcon}>🔬</Text>
                <Text style={[homeStyles.navTabText, activeTab === 'simulasi' && homeStyles.navTabTextActive]}>
                  Simulation
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setActiveTab('quiz')}
                style={[homeStyles.navTab, activeTab === 'quiz' && homeStyles.navTabActive]}
              >
                <Text style={homeStyles.navTabIcon}>❓</Text>
                <Text style={[homeStyles.navTabText, activeTab === 'quiz' && homeStyles.navTabTextActive]}>
                  Quiz
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push('/games')}
                style={homeStyles.navTab}
              >
                <Text style={homeStyles.navTabIcon}>🎮</Text>
                <Text style={homeStyles.navTabText}>Games</Text>
              </Pressable>
            </ScrollView>
          </View>

          {/* CONTENT GRID */}
          <FlatList
            key={numColumns} // biar rerender saat ganti kolom
            data={data}
            numColumns={numColumns}
            scrollEnabled={false}
            contentContainerStyle={homeStyles.grid}
            columnWrapperStyle={numColumns > 1 ? homeStyles.gridRow : undefined}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => {
              const btnText = getButtonText(item, activeTab);
              const metaText = getMetaText(item, activeTab);

              return (
                <View style={[homeStyles.card, numColumns > 1 ? homeStyles.cardHalf : null]}>
                  <LinearGradient colors={GRADIENTS.primary} style={homeStyles.cardImage}>
                    <Text style={homeStyles.cardIcon}>{item.icon}</Text>
                  </LinearGradient>

                  <View style={homeStyles.cardContent}>
                    <Text style={homeStyles.cardTitle}>{item.title}</Text>
                    <Text style={homeStyles.cardDesc}>{item.description}</Text>

                    <Text style={homeStyles.cardMeta}>{metaText}</Text>

                    <Pressable onPress={() => handleCardAction(item, activeTab)}>
                      <LinearGradient colors={GRADIENTS.primary} style={homeStyles.btnPrimaryFull}>
                        <Text style={homeStyles.btnPrimaryText}>{btnText}</Text>
                      </LinearGradient>
                    </Pressable>
                  </View>
                </View>
              );
            }}
          />

          {/* FOOTER (sesuai homepage.html, bagian bottom saja) */}
          <View style={homeStyles.footer}>
            <View style={homeStyles.footerAnimatedLine} />
            <LinearGradient colors={GRADIENTS.footer} style={homeStyles.footerBox}>
              <Text style={homeStyles.footerText}>
                © 2025 Created with passion and creativity by Aulia Azka. All rights reserved.
              </Text>
              <Text style={homeStyles.footerVersion}>
                Version 1.0 - Newton&apos;s Second Law Simulator
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* COMING SOON MODAL */}
      <Modal transparent visible={comingSoonOpen} animationType="fade" onRequestClose={closeComingSoon}>
        <Pressable style={homeStyles.modalOverlay} onPress={closeComingSoon}>
          <Pressable style={homeStyles.modalCard} onPress={() => {}}>
            <Text style={homeStyles.modalIcon}>{comingSoonItem?.icon ?? '🔮'}</Text>
            <Text style={homeStyles.modalTitle}>Akan Segera Tersedia!</Text>
            <Text style={homeStyles.modalName}>{comingSoonItem?.title ?? '-'}</Text>
            <Text style={homeStyles.modalDesc}>
              Fitur ini sedang dalam pengembangan dan akan segera hadir dengan konten interaktif yang menarik.
            </Text>

            <Pressable onPress={closeComingSoon}>
              <LinearGradient colors={GRADIENTS.primary} style={homeStyles.btnPrimaryFull}>
                <Text style={homeStyles.btnPrimaryText}>Mengerti</Text>
              </LinearGradient>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}