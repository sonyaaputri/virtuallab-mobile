import { StyleSheet } from 'react-native';

export const COLORS = {
  purple: '#8441A4',
  pink: '#FF5B94',
  purpleMuda: '#F9E9FF',
  pinkMuda: '#F6D7E3',
  text: '#333',
  muted: '#666',
  bg: '#f8f9fa',
  white: '#ffffff',
  footerStart: '#630436',
  footerEnd: '#77297A',
};

export const GRADIENTS = {
  primary: [COLORS.purple, COLORS.pink] as const,
  primary1: [COLORS.purpleMuda, COLORS.pinkMuda] as const,
  footer: [COLORS.footerStart, COLORS.footerEnd] as const,
};

export const homeStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

dashboardHeader: {
  backgroundColor: COLORS.white,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
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

  dashboardNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoImg: {
    width: 40,
    height: 40,
    marginRight: 0,
    resizeMode: 'contain',
  },

  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.purple,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12 as any,
  },

  userName: {
    color: COLORS.text,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },

  btnSecondarySmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.purple,
    backgroundColor: 'transparent',
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnSecondarySmallText: {
    color: COLORS.purple,
    fontWeight: '600',
  },

  scrollContent: {
    paddingVertical: 40,
    paddingBottom: 60,
  },

  welcomeSection: {
    borderRadius: 15,
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  welcomeSubtitle: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.95,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 999,
  },

  p1: { width: 18, height: 18, top: '15%', left: '8%' },
  p2: { width: 12, height: 12, top: '70%', left: '85%' },
  p3: { width: 22, height: 22, top: '25%', left: '75%' },

  navTabsWrap: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  navTabs: {
    alignItems: 'center',
    columnGap: 8 as any,
  },

  navTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8 as any,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    minWidth: 120,
    justifyContent: 'center',
  },

  navTabActive: {
    backgroundColor: COLORS.purple, // Tab
    shadowColor: COLORS.purple,
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  navTabIcon: {
    fontSize: 16,
  },

  navTabText: {
    color: COLORS.muted,
    fontWeight: '500',
  },

  navTabTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },

  grid: {
    paddingBottom: 10,
  },

  gridRow: {
    gap: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  cardHalf: {
    flex: 1,
  },

  cardImage: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardIcon: {
    fontSize: 56,
    color: COLORS.white,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  cardContent: {
    padding: 25,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },

  cardDesc: {
    color: COLORS.muted,
    marginBottom: 20,
    lineHeight: 22,
  },

  cardMeta: {
    marginBottom: 20,
    fontSize: 14,
    color: '#888',
  },

  btnPrimaryFull: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnPrimaryText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },

  // footer: {
  //   marginTop: 30,
  //   borderRadius: 15,
  //   overflow: 'hidden',
  // },

  // footerAnimatedLine: {
  //   height: 4,
  //   backgroundColor: COLORS.pink,
  // },

  // footerBox: {`
  //   paddingVertical: 20,
  //   paddingHorizontal: 20,
  //   alignItems: 'center',
  // },

  // footerText: {
  //   color: COLORS.white,
  //   opacity: 0.85,
  //   textAlign: 'center',
  //   lineHeight: 20,
  // },

  // footerVersion: {
  //   marginTop: 5,
  //   color: COLORS.white,
  //   fontSize: 14,
  // },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },

  modalIcon: {
    fontSize: 56,
    marginBottom: 10,
  },

  modalTitle: {
    color: COLORS.purple,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalName: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.text,
  },

  modalDesc: {
    marginBottom: 20,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
});