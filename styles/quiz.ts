import { StyleSheet } from 'react-native';

export const COLORS = {
  bg: '#f8f9fa',
  white: '#ffffff',
  text: '#333',
  muted: '#666',
  purple: '#8441A4',
  pink: '#FF5B94',
};

export const GRADIENTS = {
  primary: [COLORS.purple, COLORS.pink] as const,
  muted: ['#faf7ff', '#f0f0ff'] as const,
};

export const quizStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

  header: {
    backgroundColor: COLORS.white,
    paddingVertical: 0,
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
    paddingTop: 50,
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

  quizSection: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1 as any,
    marginBottom: 15,
  },

  quizIcon: { fontSize: 28, color: COLORS.purple },
  quizTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.purple },
  quizSubtitle: { fontSize: 12, color: COLORS.muted, marginTop: 2 },

  musicToggle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.purple,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  musicToggleMuted: {},
  musicToggleText: { fontSize: 22, color: COLORS.white },

  quizProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  progressBar: {
    flexGrow: 1,
    height: 12,
    backgroundColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: -15,
  },

  progressFill: {
    height: '100%',
  },

  progressText: { fontWeight: '600', color: COLORS.text, minWidth: 100, textAlign: 'right' },

  questionCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  questionNumber: { fontWeight: '700', marginBottom: 10, color: COLORS.purple },
  questionText: { fontSize: 18, marginBottom: 15, color: COLORS.text },

  optionsContainer: { gap: 12 as any },

  optionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10 as any,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },

  optionSelected: {
    backgroundColor: '#f0e6f7',
    borderColor: COLORS.purple,
  },

  optionText: { color: COLORS.text, flexShrink: 1 },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {},
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.purple,
  },

  quizButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12 as any,
    marginTop: 20,
  },

  btnQuiz: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.purple,
  },

  btnQuizDisabled: {
    backgroundColor: '#ccc',
  },

  btnQuizText: { color: COLORS.white, fontWeight: '500', fontSize: 13 },

  quizResults: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0e6f7',
    borderRadius: 15,
    marginTop: 10,
  },

  resultsHeader: { alignItems: 'center', marginBottom: 10 },
  resultsIcon: { width: 160, height: 160, resizeMode: 'contain' },
  resultsTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.purple, marginTop: 6 },
  resultsScore: { fontSize: 18, color: COLORS.text, marginTop: 4 },

  scoreBreakdown: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 as any, justifyContent: 'center', marginVertical: 16 },
  scoreItem: { fontWeight: '600', color: '#555' },

  performanceMessage: { fontStyle: 'italic', color: COLORS.muted, textAlign: 'center', marginBottom: 10 },

  resultsActions: { flexDirection: 'row', gap: 12 as any },

  quizReview: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  reviewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  reviewTitle: { margin: 0 as any, color: COLORS.purple, fontWeight: 'bold', fontSize: 18 },
  closeReview: { fontSize: 22, color: COLORS.purple },

  reviewCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    borderWidth: 2,
  },

  reviewCardCorrect: { borderColor: '#4CAF50', backgroundColor: '#e8f5e9' },
  reviewCardIncorrect: { borderColor: '#f44336', backgroundColor: '#ffebee' },

  reviewQuestion: { fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  reviewLine: { marginBottom: 6 },

  explanationBox: { padding: 10, borderRadius: 8 },
  explCorrect: { backgroundColor: '#c8e6c9' },
  explIncorrect: { backgroundColor: '#ffcdd2' },
  explanationText: { fontStyle: 'italic', color: COLORS.text, lineHeight: 20 },
});
