// app/games.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_SIZE, gamesStyles } from '../styles/games';

type CurrentUser = {
  name?: string;
  avatar?: string;
  initials?: string;
  photo?: string;
};

type Rect = { x: number; y: number; width: number; height: number };
type Bullet = Rect & { speed: number };
type Asteroid = Rect & { speed: number };

type QuizQ = { q: string; o: string[]; c: number };

const physicsQuestions: QuizQ[] = [
  { q: 'Rumus Hukum II Newton adalah...', o: ['F = ma', 'F = m/a', 'F = a/m', 'F = m + a'], c: 0 },
  { q: 'Sebuah benda bermassa 5 kg diberi gaya 20 N. Berapakah percepatannya?', o: ['2 m/s²', '4 m/s²', '10 m/s²', '100 m/s²'], c: 1 },
  { q: 'Jika massa benda digandakan dan gaya tetap, maka percepatan akan...', o: ['Menjadi dua kali lipat', 'Tetap sama', 'Menjadi setengahnya', 'Menjadi empat kali lipat'], c: 2 },
  { q: 'Benda bermassa 10 kg memiliki percepatan 3 m/s². Gaya yang bekerja adalah...', o: ['13 N', '30 N', '3.33 N', '300 N'], c: 1 },
  { q: 'Dalam Hukum II Newton, percepatan benda berbanding lurus dengan...', o: ['Massa benda', 'Gaya yang bekerja', 'Kecepatan benda', 'Waktu tempuh'], c: 1 },
  { q: 'Gaya 50 N menghasilkan percepatan 5 m/s². Massa benda tersebut adalah...', o: ['5 kg', '10 kg', '45 kg', '250 kg'], c: 1 },
  { q: 'Jika gaya yang bekerja pada benda ditambah 2 kali lipat (massa tetap), percepatan akan...', o: ['Tetap', 'Menjadi 2 kali lipat', 'Menjadi setengahnya', 'Menjadi 4 kali lipat'], c: 1 },
  { q: 'Satuan percepatan dalam SI adalah...', o: ['m/s', 'm/s²', 'N/kg', 'kg.m/s²'], c: 1 },
  { q: 'Menurut Hukum II Newton, benda dengan massa lebih besar memerlukan gaya yang... untuk menghasilkan percepatan yang sama.', o: ['Lebih kecil', 'Sama', 'Lebih besar', 'Tidak ada hubungannya'], c: 2 },
  { q: 'Benda bermassa 8 kg mengalami gaya resultan 32 N. Percepatannya adalah...', o: ['2 m/s²', '4 m/s²', '8 m/s²', '256 m/s²'], c: 1 },
  { q: "Dalam rumus F = ma, 'a' mewakili...", o: ['Percepatan', 'Amplitudo', 'Area', 'Arah'], c: 0 },
  { q: 'Jika tidak ada gaya resultan yang bekerja pada benda (F = 0), maka percepatannya adalah...', o: ['Maksimum', 'Minimum', '0 m/s²', '9.8 m/s²'], c: 2 },
  { q: 'Mobil bermassa 1000 kg dipercepat dari diam dengan percepatan 2 m/s². Gaya yang diperlukan adalah...', o: ['500 N', '1000 N', '2000 N', '4000 N'], c: 2 },
  { q: 'Hubungan antara massa dan percepatan dalam Hukum II Newton adalah...', o: ['Berbanding lurus', 'Berbanding terbalik', 'Eksponensial', 'Tidak ada hubungan'], c: 1 },
  { q: 'Gaya 100 N bekerja pada benda bermassa 25 kg. Percepatannya adalah...', o: ['2 m/s²', '4 m/s²', '5 m/s²', '25 m/s²'], c: 1 },
];

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function collide(a: Rect, b: Rect) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export default function GamesScreen() {
  const router = useRouter();

  // User Header
  const [user, setUser] = useState<CurrentUser | null>(null);
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

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [nextQuizScore, setNextQuizScore] = useState(50);
  const [totalQuizAnswered, setTotalQuizAnswered] = useState(0);

  const playerRef = useRef<Rect>({ x: 375, y: 520, width: 50, height: 40 });
  const bulletsRef = useRef<Bullet[]>([]);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const asteroidTimerRef = useRef(0);
  const asteroidDelayRef = useRef(60);

  const [renderTick, setRenderTick] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef<number>(0);

  const [gamePaused, setGamePaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Touch controls
  const moveLeftHeld = useRef(false);
  const moveRightHeld = useRef(false);

  // Quiz
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizIdx, setQuizIdx] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; color: string } | null>(null);
  const answeredSet = useRef<number[]>([]);

  const [stageSize, setStageSize] = useState<{ w: number; h: number }>({
    w: Dimensions.get('window').width - 32 - 20,
    h: (Dimensions.get('window').width - 32 - 20) * (BASE_SIZE.h / BASE_SIZE.w),
  });

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      const w = Math.max(320, window.width - 32 - 20);
      const h = w * (BASE_SIZE.h / BASE_SIZE.w);
      setStageSize({ w, h });
    });
    return () => sub.remove();
  }, []);

  const scale = stageSize.w / BASE_SIZE.w;

  function shoot() {
    if (gameOver || gamePaused) return;
    const p = playerRef.current;
    bulletsRef.current.push({
      x: p.x + p.width / 2 - 2,
      y: p.y,
      width: 4,
      height: 16,
      speed: 8,
    });
  }

  function spawnAsteroid() {
    const size = 30 + Math.random() * 30;
    asteroidsRef.current.push({
      x: Math.random() * (BASE_SIZE.w - size),
      y: -size,
      width: size,
      height: size,
      speed: 2 + Math.random() * 3,
    });
  }

  function openQuiz() {
    setGamePaused(true);
    let available = physicsQuestions
      .map((_, idx) => idx)
      .filter((idx) => !answeredSet.current.includes(idx));

    if (!available.length) {
      answeredSet.current = [];
      available = physicsQuestions.map((_, idx) => idx);
    }

    const picked = available[Math.floor(Math.random() * available.length)];
    setQuizIdx(picked);
    setFeedback(null);
    setQuizVisible(true);
  }

  function endGame() {
    setGameOver(true);
    setGamePaused(true);
  }

  function restartGame() {
    setScore(0);
    setLives(3);
    setNextQuizScore(50);
    setTotalQuizAnswered(0);

    playerRef.current = { x: 375, y: 520, width: 50, height: 40 };
    bulletsRef.current = [];
    asteroidsRef.current = [];
    asteroidTimerRef.current = 0;
    asteroidDelayRef.current = 60;

    answeredSet.current = [];
    setQuizIdx(null);
    setQuizVisible(false);
    setFeedback(null);

    setGameOver(false);
    setGamePaused(false);
    setRenderTick((t) => t + 1);
  }

  function step(dtMs: number) {
    const dt = Math.min(dtMs / 16.67, 2.2);
    const p = playerRef.current;
    const speed = 6 * dt;
    if (moveLeftHeld.current) p.x -= speed;
    if (moveRightHeld.current) p.x += speed;
    p.x = clamp(p.x, 0, BASE_SIZE.w - p.width);

    bulletsRef.current = bulletsRef.current
      .map((b) => ({ ...b, y: b.y - b.speed * dt }))
      .filter((b) => b.y > -b.height);

    const newAsteroids: Asteroid[] = [];
    for (const a of asteroidsRef.current) {
      const nextA = { ...a, y: a.y + a.speed * dt };
      if (nextA.y > BASE_SIZE.h) continue;

      if (collide(p, nextA)) {
        setLives((lv) => {
          const after = lv - 1;
          if (after <= 0) endGame();
          return after;
        });
        continue;
      }
      newAsteroids.push(nextA);
    }
    asteroidsRef.current = newAsteroids;

    const bullets = bulletsRef.current.slice();
    const asts = asteroidsRef.current.slice();

    for (let bi = bullets.length - 1; bi >= 0; bi--) {
      let hit = false;
      for (let ai = asts.length - 1; ai >= 0; ai--) {
        if (collide(bullets[bi], asts[ai])) {
          bullets.splice(bi, 1);
          asts.splice(ai, 1);
          hit = true;
          setScore((s) => {
            const next = s + 10;
            if (next >= nextQuizScore) openQuiz();
            return next;
          });
          break;
        }
      }
      if (hit) continue;
    }
    bulletsRef.current = bullets;
    asteroidsRef.current = asts;

    asteroidTimerRef.current += 1 * dt;
    if (asteroidTimerRef.current > asteroidDelayRef.current) {
      spawnAsteroid();
      asteroidTimerRef.current = 0;
      if (asteroidDelayRef.current > 30) asteroidDelayRef.current -= 0.5;
    }
  }

  function loop(t: number) {
    if (gameOver || gamePaused) return;

    if (!lastTRef.current) lastTRef.current = t;
    const dt = t - lastTRef.current;
    lastTRef.current = t;

    step(dt);
    setRenderTick((x) => x + 1);

    rafRef.current = requestAnimationFrame(loop);
  }

  useEffect(() => {
    if (gameOver || gamePaused) return;
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTRef.current = 0;
    };
  }, [gameOver, gamePaused]);

  function chooseAnswer(optIndex: number) {
    if (quizIdx === null) return;
    const q = physicsQuestions[quizIdx];

    if (optIndex === q.c) {
      setFeedback({ text: '✅ Benar! Lanjutkan permainan!', color: '#2e7d32' });
      answeredSet.current.push(quizIdx);
      setTotalQuizAnswered((n) => n + 1);
      setTimeout(() => {
        setQuizVisible(false);
        setGamePaused(false);
        setNextQuizScore((v) => v + 50);
      }, 800);
    } else {
      setFeedback({ text: '❌ Salah! Kehilangan 1 nyawa!', color: '#c62828' });
      setLives((lv) => {
        const after = lv - 1;
        return after;
      });

      setTimeout(() => {
        setQuizVisible(false);
        setNextQuizScore((v) => v + 50);

        setLives((lv) => {
          if (lv <= 0) {
            endGame();
            return 0;
          }
          setGamePaused(false);
          return lv;
        });
      }, 900);
    }
  }

  const player = playerRef.current;
  const bullets = bulletsRef.current;
  const asteroids = asteroidsRef.current;

  return (
    <View style={gamesStyles.screen}>
      {/* HEADER */}
      <SafeAreaView edges={['top']} style={gamesStyles.header}>
        <View style={gamesStyles.headerInner}>
          <Pressable onPress={goBack} style={gamesStyles.backBtn}>
            <Text style={gamesStyles.backIcon}>‹</Text>
          </Pressable>

          <View style={gamesStyles.headerCenter}>
            <Image source={require('../assets/images/4.png')} style={gamesStyles.logoImg} />
            <Text style={gamesStyles.logoText}>PhysicsLab Virtual</Text>
          </View>

          <Pressable
            onPress={() => router.push('/profile-settings')}
            style={gamesStyles.avatarBtn}
          >
            <View style={gamesStyles.avatarCircle}>
              <Text style={gamesStyles.avatarText}>{avatarText}</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>

      <View style={gamesStyles.content}>
        {/* HUD */}
        <View style={gamesStyles.hudCard}>
          <View style={gamesStyles.hudRow}>
            <View style={gamesStyles.badge}>
              <Text style={gamesStyles.badgeText}>Skor: {score}</Text>
            </View>
            <View style={gamesStyles.badge}>
              <Text style={gamesStyles.badgeText}>Nyawa: {lives}</Text>
            </View>
            <View style={gamesStyles.badge}>
              <Text style={gamesStyles.badgeText}>Soal berikutnya: {nextQuizScore}</Text>
            </View>
          </View>
        </View>

        {/* STAGE */}
        <View style={gamesStyles.stageCard}>
          <View style={[gamesStyles.stage, { width: stageSize.w, height: stageSize.h }]}>
            {/* Player */}
            <View
              style={[
                gamesStyles.player,
                {
                  left: player.x * scale,
                  top: player.y * scale,
                  width: player.width * scale,
                  height: player.height * scale,
                },
              ]}
            />

            {/* Bullets */}
            {bullets.map((b, i) => (
              <View
                key={`b-${i}-${renderTick}`}
                style={[
                  gamesStyles.bullet,
                  {
                    left: b.x * scale,
                    top: b.y * scale,
                    width: b.width * scale,
                    height: b.height * scale,
                  },
                ]}
              />
            ))}

            {/* Asteroids */}
            {asteroids.map((a, i) => (
              <View
                key={`a-${i}-${renderTick}`}
                style={[
                  gamesStyles.asteroid,
                  {
                    left: a.x * scale,
                    top: a.y * scale,
                    width: a.width * scale,
                    height: a.height * scale,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={gamesStyles.controlsHint}> ← → untuk bergerak • Tombol 🔫 untuk menembak</Text>

        {/* TOUCH CONTROLS */}
        <View style={gamesStyles.touchControls}>
          <Pressable
            onPressIn={() => (moveLeftHeld.current = true)}
            onPressOut={() => (moveLeftHeld.current = false)}
            style={gamesStyles.controlBtn}
          >
            <Text style={gamesStyles.controlBtnText}>←</Text>
          </Pressable>

          <Pressable
            onPress={shoot}
            style={[gamesStyles.controlBtn, gamesStyles.controlBtnSecondary]}
          >
            <Text style={gamesStyles.controlBtnText}>🔫</Text>
          </Pressable>

          <Pressable
            onPressIn={() => (moveRightHeld.current = true)}
            onPressOut={() => (moveRightHeld.current = false)}
            style={gamesStyles.controlBtn}
          >
            <Text style={gamesStyles.controlBtnText}>→</Text>
          </Pressable>
        </View>
      </View>

      {/* QUIZ */}
      <Modal visible={quizVisible} transparent animationType="fade">
        <View style={gamesStyles.modalBackdrop}>
          <View style={gamesStyles.modalCard}>
            <Text style={gamesStyles.modalTitle}>SOAL FISIKA</Text>

            {quizIdx !== null && (
              <>
                <Text style={gamesStyles.modalQuestion}>{physicsQuestions[quizIdx].q}</Text>

                {physicsQuestions[quizIdx].o.map((opt, i) => (
                  <Pressable
                    key={i}
                    onPress={() => chooseAnswer(i)}
                    style={gamesStyles.optionBtn}
                  >
                    <Text style={gamesStyles.optionText}>
                      {String.fromCharCode(65 + i)}. {opt}
                    </Text>
                  </Pressable>
                ))}
              </>
            )}

            {!!feedback && (
              <Text style={[gamesStyles.feedback, { color: feedback.color }]}>
                {feedback.text}
              </Text>
            )}
          </View>
        </View>
      </Modal>

      {/* GAME OVER */}
      <Modal visible={gameOver} transparent animationType="fade">
        <View style={gamesStyles.modalBackdrop}>
          <View style={gamesStyles.modalCard}>
            <Text style={gamesStyles.modalTitle}>Permainan Selesai</Text>
            <Text style={{ textAlign: 'center', marginBottom: 6 }}>
              Skor Akhir: <Text style={{ fontWeight: '900' }}>{score}</Text>
            </Text>
            <Text style={{ textAlign: 'center' }}>
              Soal Terjawab: <Text style={{ fontWeight: '900' }}>{totalQuizAnswered}</Text>
            </Text>

            <TouchableOpacity onPress={restartGame} style={gamesStyles.modalActionBtn}>
              <Text style={gamesStyles.modalActionText}>Main Lagi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}