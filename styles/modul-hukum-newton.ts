import { StyleSheet } from 'react-native';

export const COLORS = {
  bg: '#f8f9fa',
  text: '#333',
  muted: '#666',
  white: '#ffffff',
  purple: '#8441A4',
  pink: '#FF5B94',
};

export const GRADIENTS = {
  primary: [COLORS.purple, COLORS.pink] as const,
};

export const modulStyles = StyleSheet.create({
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

  header: {
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(132,65,164,0.2)',
    backgroundColor: 'rgba(132,65,164,0.1)',
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonText: {
    color: COLORS.purple,
    fontSize: 16,
    fontWeight: '600',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },

  logoImg: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },

  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.purple,
    flexShrink: 1,
  },

  userRow: {
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
    paddingVertical: 30,
    paddingBottom: 20,
  },

  moduleHeader: {
    borderRadius: 15,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },

  moduleTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  moduleSubtitle: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
    textAlign: 'center',
  },

  toc: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  tocTitle: {
    color: COLORS.purple,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  tocRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10 as any,
  },

  tocPill: {
    backgroundColor: COLORS.bg,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  tocPillText: {
    color: COLORS.purple,
    fontSize: 14,
    fontWeight: '500',
  },

  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    marginBottom: 15,
  },

  sectionToggle: {
    backgroundColor: COLORS.bg,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionToggleText: {
    color: COLORS.purple,
    fontSize: 16,
    fontWeight: 'bold',
  },

  sectionChevron: {
    color: COLORS.purple,
    fontSize: 14,
    fontWeight: 'bold',
  },

  sectionContent: {
    paddingTop: 12,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
    marginBottom: 12,
  },

  bold: {
    fontWeight: 'bold',
  },

  formulaBox: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 15,
    alignItems: 'center',
  },

  formulaMain: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },

  formulaSub: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },

  grid: {
    marginTop: 12,
    gap: 12 as any,
  },

  conceptCard: {
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.purple,
  },

  conceptTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.purple,
    marginBottom: 8,
  },

  conceptText: {
    color: COLORS.text,
    lineHeight: 22,
  },

  examplesGrid: {
    gap: 12 as any,
  },

  exampleCard: {
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  exampleTitle: {
    fontWeight: 'bold',
    color: COLORS.purple,
    marginBottom: 6,
    fontSize: 16,
  },

  exampleHint: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 10,
  },

  exampleValues: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
  },

  mono: {
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.text,
  },

  showAnswerBtn: {
    marginTop: 10,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },

  showAnswerText: {
    color: COLORS.white,
    fontWeight: '600',
  },

  calculatorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },

  calculatorTitle: {
    color: COLORS.purple,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  calcInputsRow: {
    gap: 12 as any,
    marginBottom: 12,
  },

  calcInput: {
    flexDirection: 'column',
  },

  calcLabel: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: COLORS.purple,
  },

  calcTextInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: COLORS.white,
    fontSize: 16,
  },

  btnPrimary: {
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

  calcResultBox: {
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },

  calcResultText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});