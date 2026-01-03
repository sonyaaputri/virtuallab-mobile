import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { login } from './api/auth';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      Alert.alert('Sukses', 'Login berhasil! Selamat datang di PhysicsLab Virtual.');
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#8441A4', '#FF5B94']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.authContainer}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
              <Text style={styles.closeBtnText}>×</Text>
            </TouchableOpacity>

            <View style={styles.authForm}>
              <Text style={styles.title}>Masuk ke Akun</Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Image
                      source={
                        showPassword
                          ? require('../assets/images/visible.png')
                          : require('../assets/images/nonvisible.png')
                      }
                      style={styles.passwordIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.btn, loading && styles.btnDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Login</Text>
                )}
              </TouchableOpacity>

              <View style={styles.authToggle}>
                <Text style={styles.toggleText}>Belum punya akun? </Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <Text style={styles.toggleLink}>Daftar di sini</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authContainer: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 1,
  },
  closeBtnText: {
    fontSize: 24,
    color: '#999',
  },
  authForm: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    width: '100%',
    padding: 12,
    paddingRight: 50, // Ubah dari 40 ke 50
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 16,
  },
  passwordToggle: {
    position: 'absolute',
    right: 0, // Ubah dari 10 ke 0
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // Lebar area touchable lebih besar
    height: '100%',
    // Hapus transform: [{ translateY: -10 }]
  },
  passwordIcon: {
    width: 22, // Sedikit lebih besar
    height: 22,
    resizeMode: 'contain',
  },
  btn: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#8441A4',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  authToggle: {
    flexDirection: 'row',
    marginTop: 20,
  },
  toggleText: {
    color: '#666',
  },
  toggleLink: {
    color: '#8441A4',
    fontWeight: '600',
  },
});