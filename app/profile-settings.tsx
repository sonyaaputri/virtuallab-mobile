import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

import { profileStyles, COLORS, GRADIENTS } from '../styles/profile-settings';
import { API_CONFIG } from './api/config';

type CurrentUser = {
  name?: string;
  email?: string;
  initials?: string;
  avatar?: string; // di mobile kamu pakai avatar (initials) juga
  photo?: string; // base64/data url dari web
};

function makeInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? 'A';
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? 'U';
  return (a + b).toUpperCase();
}

export default function ProfileSettingsScreen() {
  const router = useRouter();

  const [user, setUser] = useState<CurrentUser | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null); // data:image/... base64

  const avatarText = useMemo(() => {
    const name = fullName || user?.name || 'Aulia User';
    return user?.initials || user?.avatar || makeInitials(name);
  }, [fullName, user]);

  useEffect(() => {
    // web: initializeUserInfo() ambil currentUser, kalau kosong -> redirect index :contentReference[oaicite:2]{index=2}
    (async () => {
      const userStr = await AsyncStorage.getItem('currentUser');
      if (!userStr) {
        router.replace('/');
        return;
      }
      try {
        const u: CurrentUser = JSON.parse(userStr);
        setUser(u);

        setFullName(u?.name || '');
        setEmail(u?.email || '');

        // web: kalau user.photo ada, tampilkan photo, else tampilkan initials :contentReference[oaicite:3]{index=3}
        setPhotoDataUrl(u?.photo || null);
      } catch {
        router.replace('/');
      }
    })();
  }, [router]);

  const goBack = () => {
    // web: goBackToDashboard() -> homepage :contentReference[oaicite:4]{index=4}
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)' as any);
  };

  const onCancel = () => {
    // web: cancel -> homepage :contentReference[oaicite:5]{index=5}
    router.replace('/(tabs)' as any);
  };

  const onLogout = () => {
    // web: confirm logout, hapus currentUser dan redirect :contentReference[oaicite:6]{index=6}
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar dari akun?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('currentUser');
          await AsyncStorage.removeItem('access_token'); // biar bersih
          router.replace('/');
        },
      },
    ]);
  };

  const pickPhoto = async () => {
    // web: klik edit -> pilih file -> convert base64 :contentReference[oaicite:7]{index=7} :contentReference[oaicite:8]{index=8}
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Izin diperlukan', 'Izinkan akses galeri untuk memilih foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (result.canceled) return;

    const asset = result.assets?.[0];
    if (!asset?.base64) {
      Alert.alert('Gagal', 'Tidak bisa membaca gambar sebagai base64.');
      return;
    }

    const mime = asset.mimeType || 'image/jpeg';
    const dataUrl = `data:${mime};base64,${asset.base64}`;
    setPhotoDataUrl(dataUrl);
  };

  const handleUpdate = async () => {
    // web: validasi password cocok :contentReference[oaicite:9]{index=9}
    if (newPassword && newPassword !== confirmPassword) {
      Alert.alert('Gagal', 'Password tidak cocok!');
      return;
    }

    // web: token access_token harus ada :contentReference[oaicite:10]{index=10}
    const token = await AsyncStorage.getItem('access_token');
    if (!token) {
      Alert.alert('Sesi habis', 'Token tidak ditemukan, silakan login ulang.');
      router.replace('/');
      return;
    }

    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        // web: kirim name, email, photo (base64) :contentReference[oaicite:11]{index=11}
        body: JSON.stringify({
          name: fullName,
          email,
          photo: photoDataUrl,
          // catatan: web kamu tidak mengirim password ke endpoint profile.
          // jadi kita juga tidak mengirim password agar tidak mengubah logika backend.
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || 'Update gagal');
      }

      // web: simpan user yang dikembalikan ke currentUser :contentReference[oaicite:12]{index=12}
      const updatedUser: CurrentUser = data?.user || {
        ...user,
        name: fullName,
        email,
        photo: photoDataUrl,
        initials: avatarText,
      };

      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);

      Alert.alert('Berhasil', 'Profile berhasil diupdate!');
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Terjadi kesalahan saat update');
    }
  };

  if (!user) {
    return <View style={{ flex: 1, backgroundColor: COLORS.bg }} />;
  }

  return (
    <View style={profileStyles.screen}>
      {/* HEADER (1 baris, seperti modul/quiz) */}
      <SafeAreaView edges={['top']} style={profileStyles.header}>
        <View style={profileStyles.headerInnerOneRow}>
          <Pressable onPress={goBack} style={profileStyles.backIconBtn}>
            <Text style={profileStyles.backIcon}>‹</Text>
          </Pressable>

          <View style={profileStyles.headerCenter}>
            <Image source={require('../assets/images/4.png')} style={profileStyles.logoImg} />
            <Text style={profileStyles.logoText}>PhysicsLab Virtual</Text>
          </View>

          <Pressable onPress={() => { /* sudah di profile */ }}>
            <LinearGradient colors={GRADIENTS.primary} style={profileStyles.avatarSmall}>
              <Text style={profileStyles.avatarSmallText}>{avatarText}</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={profileStyles.scrollContent}>
        <View style={profileStyles.container}>
          <View style={profileStyles.profileContainer}>
            {/* Decorative section (gambar + bubble) */}
            <View style={profileStyles.decorativeSection}>
              <View style={profileStyles.imageWrapper}>
                <Image
                  source={require('../assets/images/1.png')}
                  style={profileStyles.decorativeImage}
                />

                {/* bubble-bubble dekorasi (tanpa animasi web) :contentReference[oaicite:13]{index=13} */}
                <View style={[profileStyles.bubble, profileStyles.bubbleTop]} />
                <View style={[profileStyles.bubble, profileStyles.bubbleBottom]} />
                <View style={[profileStyles.bubble, profileStyles.bubbleLeft]} />
                <View style={[profileStyles.bubble, profileStyles.bubbleRight]} />
                <View style={[profileStyles.bubble, profileStyles.bubbleTopLeft]} />
                <View style={[profileStyles.bubble, profileStyles.bubbleBottomRight]} />
              </View>
            </View>

            {/* Form section */}
            <View style={profileStyles.formSection}>
              {/* Profile photo display + edit */}
              <View style={profileStyles.photoDisplay}>
                <LinearGradient colors={GRADIENTS.primary} style={profileStyles.photoRing}>
                  {photoDataUrl ? (
                    <Image source={{ uri: photoDataUrl }} style={profileStyles.photoImg} />
                  ) : (
                    <Text style={profileStyles.photoInitials}>{avatarText}</Text>
                  )}
                </LinearGradient>

                <Pressable onPress={pickPhoto} style={profileStyles.editPhotoBtn}>
                  <Text style={profileStyles.editPhotoText}>✏️</Text>
                </Pressable>
              </View>

              <Text style={profileStyles.title}>Profile Settings</Text>

              <View style={profileStyles.form}>
                <View style={profileStyles.formGroup}>
                  <Text style={profileStyles.label}>Full Name</Text>
                  <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter your full name"
                    style={profileStyles.input}
                  />
                </View>

                <View style={profileStyles.formGroup}>
                  <Text style={profileStyles.label}>Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={profileStyles.input}
                  />
                </View>

                <View style={profileStyles.formGroup}>
                  <Text style={profileStyles.label}>New Password</Text>
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Enter new password"
                    secureTextEntry
                    style={profileStyles.input}
                  />
                </View>

                <View style={profileStyles.formGroup}>
                  <Text style={profileStyles.label}>Confirm Password</Text>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm new password"
                    secureTextEntry
                    style={profileStyles.input}
                  />
                </View>

                <View style={profileStyles.buttonGroup}>
                  <Pressable onPress={handleUpdate} style={profileStyles.updateBtn}>
                    <LinearGradient colors={GRADIENTS.primary} style={profileStyles.updateBtnInner}>
                      <Text style={profileStyles.updateBtnText}>Update</Text>
                    </LinearGradient>
                  </Pressable>

                  <Pressable onPress={onCancel} style={profileStyles.cancelBtn}>
                    <Text style={profileStyles.cancelBtnText}>Cancel</Text>
                  </Pressable>
                </View>

                {/* Logout di profile (sesuai permintaan kamu) */}
                <Pressable onPress={onLogout} style={profileStyles.logoutBtn}>
                  <Text style={profileStyles.logoutBtnText}>Logout</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Footer: sengaja tidak ada */}
        </View>
      </ScrollView>
    </View>
  );
}