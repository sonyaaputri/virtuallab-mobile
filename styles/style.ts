// styles/style.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const COLORS = {
  text: '#333',
  white: '#ffffff',
  purple: '#8441A4',
  pink: '#FF5B94',
  footerStart: '#630436',
  footerEnd: '#77297A',
};

export const GRADIENTS = {
  landing: ['#8441A4', '#C44F9C'],
  primary: ['#8441A4', '#9044A2'],
  footer: ['#630436', '#77297A'],
  animatedLine: ['#FF5B94', '#8441A4', '#FF5B94'],
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

  text: {
    color: COLORS.text,
    lineHeight: 22,
  },
});

export const buttonStyles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // .btn-primary
  btnPrimaryText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },

  // .btn-secondary
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8441A4',
  },
  btnSecondaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  btnFullWidth: {
    width: '100%',
  },
});

export const landingStyles = StyleSheet.create({
  // .landing-page
  landingPage: {
    flex: 1,
  },

  // .navbar
  navbar: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  
  navContent: {
    flexDirection: SCREEN_WIDTH <= 768 ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15 as any,
    paddingHorizontal: 20, 
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: SCREEN_WIDTH <= 768 ? 24 : 28,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 15 as any,
    marginRight: SCREEN_WIDTH <= 768 ? 0 : 0,
  },

// HERO
hero: {
  paddingTop: 25,
  paddingBottom: 50,
  alignItems: 'center',
},
heroContent: {
  flexDirection: SCREEN_WIDTH <= 768 ? 'column' : 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: SCREEN_WIDTH <= 768 ? 30 : 40,
  minHeight: SCREEN_WIDTH <= 768 ? undefined : 400,
},
heroMascotWrap: {
  alignItems: 'center',
  justifyContent: 'center',
  width: SCREEN_WIDTH <= 768 ? 250 : 300,
},
heroMascotImage: {
  width: SCREEN_WIDTH <= 768 ? 200 : 350,
  height: SCREEN_WIDTH <= 768 ? 250 : 420,
  resizeMode: 'contain',
},
heroTextWrap: {
  flex: SCREEN_WIDTH <= 768 ? 0 : 1,
  alignItems: 'center',
  maxWidth: 800,
},
heroTitle: {
  fontSize: SCREEN_WIDTH <= 768 ? 40 : 56,
  fontWeight: 'bold',
  color: COLORS.white,
  marginBottom: 20,
  textAlign: 'center',
  textShadowColor: 'rgba(0,0,0,0.3)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 4,
},
heroParagraph: {
  fontSize: SCREEN_WIDTH <= 768 ? 16 : 21,
  color: COLORS.white,
  opacity: 0.9,
  marginBottom: 40,
  maxWidth: 600,
  textAlign: 'center',
  lineHeight: 26,
},

  // FEATURES
  featuresSection: {
    paddingVertical: 80,
    backgroundColor: COLORS.white,
  },

  featuresTitle: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.text,
  },

  featuresSubtitle: {
    textAlign: 'center',
    fontSize: 19,
    color: '#666',
    marginBottom: 50,
    lineHeight: 26,
  },

  // features-grid
  featuresGrid: {
    width: '100%',
    flexDirection: 'column',
    rowGap: 20 as any,
  },

  // feature-card
  featureCard: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  featureIcon: {
    fontSize: 48,
    marginBottom: 20,
  },

  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },

  featureDesc: {
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
  },

  // FOOTER
  footer: {
    marginTop: 50,
  },

  footerAnimatedLine: {
    height: 4,
    backgroundColor: COLORS.pink,
  },

  footerContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 20,
    alignItems: 'center',
  },

  footerBottomText: {
    color: COLORS.white,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20,
  },

  footerVersion: {
    marginTop: 5,
    color: COLORS.white,
    fontSize: 14,
  },
});

export const authCommonStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 40,
  },

  authTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 30,
  },

  formGroup: {
    marginBottom: 20,
  },

  formLabel: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#555',
  },

  textInput: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 16,
  },
});