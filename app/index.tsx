import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { landingStyles, buttonStyles, GRADIENTS } from '../styles/style';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={GRADIENTS.landing} style={landingStyles.landingPage}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* NAVBAR */}
        <View style={landingStyles.navbar}>
          <View style={landingStyles.navContent}>
            <View style={landingStyles.logoRow}>
              <Image
                source={require('../assets/images/4.png')}
                style={{ width: 60, height: 60, marginRight: -5 }}
                resizeMode="contain"
              />
              <Text style={landingStyles.logoText}>PhysicsLab Virtual</Text>
            </View>

            <View style={landingStyles.navButtons}>
              <Pressable
                style={[buttonStyles.btn, buttonStyles.btnSecondary]}
                onPress={() => router.push('/signin')}
              >
                <Text style={buttonStyles.btnSecondaryText}>Login</Text>
              </Pressable>

              <Pressable onPress={() => router.push('/signup')}>
                <LinearGradient
                  colors={GRADIENTS.primary}
                  style={buttonStyles.btn}
                >
                  <Text style={buttonStyles.btnPrimaryText}>Sign up</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>

        {/* HERO */}
        <View style={landingStyles.hero}>
          <View style={landingStyles.heroContent}>
            <View style={landingStyles.heroMascotWrap}>
              <Image
                source={require('../assets/images/5.png')}
                style={landingStyles.heroMascotImage}
              />
            </View>

            <View style={landingStyles.heroTextWrap}>
              <Text style={landingStyles.heroTitle}>Laboratorium Fisika Virtual</Text>
              <Text style={landingStyles.heroParagraph}>
                Pelajari konsep fisika dengan simulasi interaktif yang menarik dan mudah dipahami.
              </Text>

              <Pressable onPress={() => router.push('/signin')}>
                <LinearGradient
                  colors={GRADIENTS.primary}
                  style={[buttonStyles.btn, { paddingVertical: 15, paddingHorizontal: 30 }]}
                >
                  <Text style={[buttonStyles.btnPrimaryText, { fontSize: 18 }]}>
                    Mulai Belajar Sekarang
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>

        {/* FEATURES */}
        <View style={landingStyles.featuresSection}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={landingStyles.featuresTitle}>Fitur Utama</Text>
            <Text style={landingStyles.featuresSubtitle}>
              Platform pembelajaran fisika dengan fitur utama: modul, simulasi, quiz, dan games
            </Text>

            <View style={landingStyles.featuresGrid}>
              <View style={landingStyles.featureCard}>
                <Text style={landingStyles.featureIcon}>📚</Text>
                <Text style={landingStyles.featureTitle}>Modul</Text>
                <Text style={landingStyles.featureDesc}>
                  Pelajari konsep fisika melalui modul pembelajaran yang terstruktur dan mudah dipahami
                </Text>
              </View>

              <View style={landingStyles.featureCard}>
                <Text style={landingStyles.featureIcon}>🔬</Text>
                <Text style={landingStyles.featureTitle}>Simulasi</Text>
                <Text style={landingStyles.featureDesc}>
                  Eksperimen dengan simulasi interaktif untuk memahami hukum fisika secara praktis
                </Text>
              </View>

              <View style={landingStyles.featureCard}>
                <Text style={landingStyles.featureIcon}>❓</Text>
                <Text style={landingStyles.featureTitle}>Quiz</Text>
                <Text style={landingStyles.featureDesc}>
                  Uji pemahaman Anda dengan kuis interaktif dan dapatkan skor instan
                </Text>
              </View>

              <View style={landingStyles.featureCard}>
                <Text style={landingStyles.featureIcon}>🎮</Text>
                <Text style={landingStyles.featureTitle}>Games</Text>
                <Text style={landingStyles.featureDesc}>
                  Belajar fisika melalui permainan yang menyenangkan dan edukatif
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}