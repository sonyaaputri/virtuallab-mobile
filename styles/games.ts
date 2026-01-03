// styles/games.ts
import { StyleSheet } from 'react-native';

export const BASE_SIZE = { w: 800, h: 600 };

export const gamesStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f0fb',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },

  headerInner: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },

  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(132,65,164,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(132,65,164,0.18)',
  },

  backIcon: {
    fontSize: 26,
    color: '#8441a4',
    marginTop: -2,
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'center',
  },

  logoImg: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },

  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8441a4',
  },

  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AD499E',
  },

  avatarText: {
    color: '#fff',
    fontWeight: '800',
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  hudCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    marginBottom: 12,
  },

  hudRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  badge: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(132,65,164,0.08)',
    borderRadius: 999,
  },

  badgeText: {
    color: '#4b2a61',
    fontWeight: '700',
    fontSize: 12,
  },

  stageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },

  stage: {
    width: '100%',
    aspectRatio: BASE_SIZE.w / BASE_SIZE.h,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },

  controlsHint: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6b6b6b',
  },

  touchControls: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  controlBtn: {
    minWidth: 70,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#8441a4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controlBtnSecondary: {
    backgroundColor: '#ff5b94',
  },

  controlBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },

  player: {
    position: 'absolute',
    width: 50,
    height: 40,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#c8a3ff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  bullet: {
    position: 'absolute',
    width: 4,
    height: 16,
    backgroundColor: '#ffd166',
    borderRadius: 3,
  },

  asteroid: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#ff9ac2',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#8441a4',
    marginBottom: 10,
    textAlign: 'center',
  },

  modalQuestion: {
    color: '#333',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },

  optionBtn: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(132,65,164,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(132,65,164,0.18)',
    marginBottom: 10,
  },

  optionText: {
    color: '#3b214d',
    fontWeight: '700',
  },

  feedback: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '800',
  },

  modalActionBtn: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#8441a4',
    alignItems: 'center',
  },
  
  modalActionText: {
    color: '#fff',
    fontWeight: '900',
  },
});