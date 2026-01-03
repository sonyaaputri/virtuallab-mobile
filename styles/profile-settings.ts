import { StyleSheet } from 'react-native';

export const COLORS = {
  bg: '#f8f9fa',
  white: '#ffffff',
  text: '#333',
  muted: '#555',
  purple: '#8441A4',
  pink: '#FF5B94',
  red: '#FF3F42',
};

export const GRADIENTS = {
  primary: [COLORS.purple, COLORS.pink] as const,
};

export const profileStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  headerInnerOneRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10 as any,
    flex: 1,
    justifyContent: 'center',
  },

  backIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(132,65,164,0.2)',
    backgroundColor: 'rgba(132,65,164,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    fontSize: 34,
    lineHeight: 34,
    color: COLORS.purple,
    fontWeight: '700',
  },

  logoImg: { width: 40, height: 40, resizeMode: 'contain' },
  logoText: { fontSize: 18, fontWeight: 'bold', color: COLORS.purple },

  avatarSmall: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSmallText: { color: COLORS.white, fontWeight: 'bold' },

  scrollContent: { paddingVertical: 20, paddingBottom: 40 },

  container: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

  profileContainer: {
    gap: 16 as any,
  },

  decorativeSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageWrapper: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    justifyContent: 'center',
  },

  decorativeImage: {
    width: '100%',
    height: 260,
    resizeMode: 'contain',
  },

  bubble: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.95,
  },

  bubbleTop: { width: 18, height: 18, backgroundColor: '#EC4899', top: 18, left: '50%', marginLeft: -9 },
  bubbleBottom: { width: 22, height: 22, backgroundColor: '#8B5CF6', bottom: 10, left: '50%', marginLeft: -11 },
  bubbleLeft: { width: 16, height: 16, backgroundColor: '#FF5B94', left: 10, top: '55%', marginTop: -8 },
  bubbleRight: { width: 20, height: 20, backgroundColor: COLORS.purple, right: 10, top: '55%', marginTop: -10 },
  bubbleTopLeft: { width: 14, height: 14, backgroundColor: '#F59E0B', left: 22, top: 24 },
  bubbleBottomRight: { width: 24, height: 24, backgroundColor: '#10B981', right: 18, bottom: 14 },

  formSection: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    alignItems: 'center',
  },

  photoDisplay: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  photoRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },

  photoImg: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },

  photoInitials: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: 'bold',
  },

  editPhotoBtn: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editPhotoText: { fontSize: 14, color: COLORS.purple },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },

  form: {
    width: '100%',
    maxWidth: 420,
  },

  formGroup: { marginBottom: 14 },

  label: {
    marginBottom: 6,
    color: COLORS.muted,
    fontWeight: '600',
  },

  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: COLORS.white,
    fontSize: 16,
  },

  buttonGroup: {
    flexDirection: 'row',
    gap: 12 as any,
    marginTop: 16,
  },

  updateBtn: { flex: 1 },
  updateBtnInner: {
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  updateBtnText: { color: COLORS.white, fontWeight: '700' },

  cancelBtn: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  cancelBtnText: { color: COLORS.pink, fontWeight: '700' },

  logoutBtn: {
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.red,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    paddingVertical: 12,
  },
  logoutBtnText: { color: COLORS.white, fontWeight: '700' },
});