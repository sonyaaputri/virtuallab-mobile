import { StyleSheet } from 'react-native';

export const GRADIENTS = {
  primary: ['#8441A4', '#FF5B94'] as const,
};

export const simStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  header: {
    backgroundColor: '#ffffff',
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
    flex: 1,
    justifyContent: 'center',
    gap: 10 as any,
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
    fontSize: 32,
    lineHeight: 32,
    color: '#8441A4',
    fontWeight: '700',
  },

  logoImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8441A4',
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});