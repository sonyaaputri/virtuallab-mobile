import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

import { quizStyles, COLORS, GRADIENTS } from '../styles/quiz';
import { SafeAreaView } from 'react-native-safe-area-context';


type QuizItem = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type UserData = {
  name?: string;
  avatar?: string;
};

const QUIZ_DATA: QuizItem[] = [
  {
    question: 'Apa rumus hukum II Newton?',
    options: ['F = m × a', 'F = m + a', 'F = m / a', 'F = a / m'],
    correctIndex: 0,
    explanation:
      'Hukum II Newton menyatakan bahwa gaya (F) sama dengan massa (m) dikalikan percepatan (a).',
  },
  {
    question:
      'Jika massa benda 5 kg dan percepatan 2 m/s², berapakah gaya yang bekerja?',
    options: ['10 N', '7 N', '3 N', '1 N'],
    correctIndex: 0,
    explanation:
      'Gaya dihitung dengan rumus F = m × a, jadi 5 kg × 2 m/s² = 10 N.',
  },
  {
    question: 'Apa satuan gaya dalam SI?',
    options: ['Newton (N)', 'Joule (J)', 'Watt (W)', 'Pascal (Pa)'],
    correctIndex: 0,
    explanation: 'Satuan gaya dalam Sistem Internasional adalah Newton (N).',
  },
  {
    question:
      'Jika gaya yang bekerja 20 N dan massa benda 4 kg, berapakah percepatan benda?',
    options: ['5 m/s²', '8 m/s²', '4 m/s²', '2 m/s²'],
    correctIndex: 0,
    explanation:
      'Percepatan dihitung dengan rumus a = F / m, jadi 20 N / 4 kg = 5 m/s².',
  },
  {
    question: 'Apa yang terjadi jika gaya yang bekerja pada benda nol?',
    options: [
      'Benda diam atau bergerak lurus beraturan',
      'Benda bergerak melingkar',
      'Benda bergerak zig-zag',
      'Benda melambat',
    ],
    correctIndex: 0,
    explanation:
      'Jika gaya yang bekerja nol, benda akan diam atau bergerak lurus beraturan sesuai hukum I Newton.',
  },
];

function makeInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? 'A';
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? 'U';
  return (a + b).toUpperCase();
}

function performanceMessage(percentage: number) {
  if (percentage >= 80) return 'Pemahaman Anda tentang Hukum Newton II sangat baik!';
  if (percentage >= 50) return 'Pemahaman Anda cukup baik, tapi masih bisa ditingkatkan.';
  return 'Anda perlu belajar lebih banyak tentang Hukum Newton II.';
}

export default function QuizScreen() {
  const router = useRouter();

  const total = QUIZ_DATA.length;

  const [userName, setUserName] = useState('Aulia');
  const [userAvatar, setUserAvatar] = useState('A');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(QUIZ_DATA.length).fill(null)
  );

  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Music
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const current = useMemo(() => QUIZ_DATA[currentIndex], [currentIndex]);

  const progressPct = useMemo(() => {
    return Math.round(((currentIndex + 1) / total) * 100);
  }, [currentIndex, total]);

  const correctCount = useMemo(() => {
    let c = 0;
    QUIZ_DATA.forEach((q, i) => {
      if (answers[i] === q.correctIndex) c++;
    });
    return c;
  }, [answers]);

  const incorrectCount = total - correctCount;
  const percentage = Math.round((correctCount / total) * 100);

  useEffect(() => {
    // web: initializeUserInfo() ambil currentUser :contentReference[oaicite:2]{index=2}
    (async () => {
      const userStr = await AsyncStorage.getItem('currentUser');
      if (!userStr) {
        router.replace('/');
        return;
      }
      try {
        const u: UserData = JSON.parse(userStr);
        const name = u?.name || 'Aulia';
        setUserName(name);
        setUserAvatar(u?.avatar || makeInitials(name));
      } catch {
        router.replace('/');
      }
    })();
  }, [router]);

  useEffect(() => {
    // web: localStorage quizMusicEnabled :contentReference[oaicite:3]{index=3}
    (async () => {
      const v = await AsyncStorage.getItem('quizMusicEnabled');
      setMusicEnabled(v === 'true');
    })();
  }, []);

  useEffect(() => {
    // cleanup sound
    return () => {
      if (sound) {
        sound.unloadAsync().catch(() => {});
      }
    };
  }, [sound]);

  const stopMusic = async () => {
    if (!sound) return;
    try {
      await sound.stopAsync();
      await sound.setPositionAsync(0);
    } catch {}
  };

  const ensureSoundLoaded = async () => {
    if (sound) return sound;
    const { sound: s } = await Audio.Sound.createAsync(
      // pastikan file ada di assets kamu: assets/quiz-music.wav
      require('../assets//images/quiz-music.wav'),
      { isLooping: true, volume: 1.0 }
    );
    setSound(s);
    return s;
  };

  const applyMusicState = async (enabled: boolean) => {
    const s = await ensureSoundLoaded();
    if (enabled) {
      try {
        await s.playAsync();
      } catch {
        // kalau gagal, biarin (mirip web: autoplay prevented)
      }
    } else {
      await stopMusic();
    }
  };

  useEffect(() => {
    // tiap toggle berubah, apply
    (async () => {
      await applyMusicState(musicEnabled);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicEnabled]);

  const onToggleMusic = async () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    await AsyncStorage.setItem('quizMusicEnabled', String(next));
  };

  const onBackToDashboard = () => {
    // web: confirm keluar dari kuis :contentReference[oaicite:4]{index=4}
    Alert.alert('Keluar', 'Apakah Anda yakin ingin keluar dari kuis?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await stopMusic();
          router.replace('/(tabs)' as any);
        },
      },
    ]);
  };

  const onLogout = () => {
    // web: confirm logout :contentReference[oaicite:5]{index=5}
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar dari akun?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('currentUser');
          await stopMusic();
          router.replace('/');
        },
      },
    ]);
  };

  const selectOption = (idx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = idx;
      return next;
    });
  };

  const prevDisabled = currentIndex === 0;
  const nextDisabled = answers[currentIndex] === null;

  const onPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const onNext = async () => {
    if (answers[currentIndex] === null) return;
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }
    // submit
    setShowResults(true);
    await stopMusic(); // web: stop audio saat results :contentReference[oaicite:6]{index=6}
  };

  const onRestart = () => {
    setAnswers(new Array(QUIZ_DATA.length).fill(null));
    setCurrentIndex(0);
    setShowReview(false);
    setShowResults(false);
    // music state tetap sesuai toggle
  };

  const onOpenReview = () => {
    setShowResults(false);
    setShowReview(true);
  };

  const onCloseReview = () => {
    setShowReview(false);
    setShowResults(true);
  };

  return (
    <View style={quizStyles.screen}>
        {/* HEADER (simple mobile, sama seperti modul) */}
    <View style={quizStyles.header}>
    <View style={quizStyles.headerInnerOneRow}>
        {/* Back */}
        <Pressable onPress={onBackToDashboard} style={quizStyles.backIconBtn}>
        <Text style={quizStyles.backIcon}>‹</Text>
        </Pressable>

        {/* Logo + Title */}
        <View style={quizStyles.headerCenter}>
        <Image source={require('../assets/images/4.png')} style={quizStyles.logoImg} />
        <Text style={quizStyles.logoText}>PhysicsLab Virtual</Text>
        </View>

        {/* Profile Avatar (logout nanti di profile) */}
        <Pressable onPress={() => router.push('/profile-settings')}>
        <LinearGradient colors={GRADIENTS.primary} style={quizStyles.avatar}>
            <Text style={quizStyles.avatarText}>{userAvatar}</Text>
        </LinearGradient>
        </Pressable>
    </View>
    </View>


      <ScrollView contentContainerStyle={quizStyles.scrollContent}>
        <View style={quizStyles.container}>
          <View style={quizStyles.quizSection}>
            {/* QUIZ HEADER */}
            <View style={quizStyles.quizHeader}>
              <Text style={quizStyles.quizIcon}>❓</Text>

              <View style={{ flex: 1 }}>
                <Text style={quizStyles.quizTitle}>Kuis Hukum Newton II</Text>
                <Text style={quizStyles.quizSubtitle}>Uji pemahaman Anda tentang F = ma</Text>
              </View>

              <Pressable onPress={onToggleMusic}>
                <LinearGradient
                  colors={musicEnabled ? GRADIENTS.primary : GRADIENTS.muted}
                  style={[quizStyles.musicToggle, !musicEnabled && quizStyles.musicToggleMuted]}
                >
                  <Text style={quizStyles.musicToggleText}>{musicEnabled ? '🔊' : '🔇'}</Text>
                </LinearGradient>
              </Pressable>
            </View>

            {/* PROGRESS */}
            {!showResults && !showReview && (
              <View style={quizStyles.quizProgress}>
                <View style={quizStyles.progressBar}>
                  <LinearGradient
                    colors={GRADIENTS.primary}
                    style={[quizStyles.progressFill, { width: `${progressPct}%` }]}
                  />
                </View>
                <Text style={quizStyles.progressText}>
                  {currentIndex + 1} dari {total}
                </Text>
              </View>
            )}

            {/* QUIZ CONTENT */}
            {!showResults && !showReview && (
              <View style={quizStyles.questionCard}>
                <Text style={quizStyles.questionNumber}>
                  Pertanyaan {currentIndex + 1}
                </Text>

                <Text style={quizStyles.questionText}>{current.question}</Text>

                <View style={quizStyles.optionsContainer}>
                  {current.options.map((opt, idx) => {
                    const selected = answers[currentIndex] === idx;
                    return (
                      <Pressable
                        key={idx}
                        onPress={() => selectOption(idx)}
                        style={[
                          quizStyles.optionLabel,
                          selected && quizStyles.optionSelected,
                        ]}
                      >
                        <View style={[quizStyles.radio, selected && quizStyles.radioSelected]}>
                          {selected && <View style={quizStyles.radioDot} />}
                        </View>
                        <Text style={quizStyles.optionText}>{opt}</Text>
                      </Pressable>
                    );
                  })}
                </View>

                <View style={quizStyles.quizButtons}>
                  <Pressable
                    disabled={prevDisabled}
                    onPress={onPrev}
                    style={[quizStyles.btnQuiz, prevDisabled && quizStyles.btnQuizDisabled]}
                  >
                    <Text style={quizStyles.btnQuizText}>⬅️ Sebelumnya</Text>
                  </Pressable>

                  <Pressable
                    disabled={nextDisabled}
                    onPress={onNext}
                    style={[quizStyles.btnQuiz, nextDisabled && quizStyles.btnQuizDisabled]}
                  >
                    <Text style={quizStyles.btnQuizText}>
                      {currentIndex === total - 1 ? 'Submit' : 'Selanjutnya ➡️'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* RESULTS */}
            {showResults && !showReview && (
              <View style={quizStyles.quizResults}>
                <View style={quizStyles.resultsHeader}>
                  <Image
                    source={require('../assets/images/3.png')}
                    style={quizStyles.resultsIcon}
                  />
                  <Text style={quizStyles.resultsTitle}>Selamat!</Text>
                  <Text style={quizStyles.resultsScore}>
                    {correctCount} / {total}
                  </Text>
                </View>

                <View style={quizStyles.scoreBreakdown}>
                  <Text style={quizStyles.scoreItem}>Benar: {correctCount}</Text>
                  <Text style={quizStyles.scoreItem}>Salah: {incorrectCount}</Text>
                  <Text style={quizStyles.scoreItem}>Persentase: {percentage}%</Text>
                </View>

                <Text style={quizStyles.performanceMessage}>
                  {performanceMessage(percentage)}
                </Text>

                <View style={quizStyles.resultsActions}>
                  <Pressable onPress={onRestart} style={quizStyles.btnQuiz}>
                    <Text style={quizStyles.btnQuizText}>🔄 Ulangi Kuis</Text>
                  </Pressable>

                  <Pressable onPress={onOpenReview} style={quizStyles.btnQuiz}>
                    <Text style={quizStyles.btnQuizText}>📋 Lihat Pembahasan</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* REVIEW */}
            {showReview && (
              <View style={quizStyles.quizReview}>
                <View style={quizStyles.reviewHeader}>
                  <Text style={quizStyles.reviewTitle}>📋 Pembahasan Jawaban</Text>
                  <Pressable onPress={onCloseReview}>
                    <Text style={quizStyles.closeReview}>✖️</Text>
                  </Pressable>
                </View>

                {QUIZ_DATA.map((q, i) => {
                  const user = answers[i];
                  const isCorrect = user === q.correctIndex;

                  return (
                    <View
                      key={i}
                      style={[
                        quizStyles.reviewCard,
                        isCorrect ? quizStyles.reviewCardCorrect : quizStyles.reviewCardIncorrect,
                      ]}
                    >
                      <Text style={quizStyles.reviewQuestion}>
                        {i + 1}. {q.question}
                      </Text>

                      <Text
                        style={[
                          quizStyles.reviewLine,
                          { color: isCorrect ? '#4CAF50' : '#f44336' },
                        ]}
                      >
                        Jawaban Anda: {user !== null ? q.options[user] : 'Belum dijawab'}
                      </Text>

                      <Text style={[quizStyles.reviewLine, { color: '#4CAF50' }]}>
                        Jawaban Benar: {q.options[q.correctIndex]}
                      </Text>

                      <View
                        style={[
                          quizStyles.explanationBox,
                          isCorrect ? quizStyles.explCorrect : quizStyles.explIncorrect,
                        ]}
                      >
                        <Text style={quizStyles.explanationText}>{q.explanation}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer sengaja tidak ada */}
    </View>
  );
}