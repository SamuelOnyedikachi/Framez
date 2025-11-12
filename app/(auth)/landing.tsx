import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeStore } from '@/store/themeStore';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const { isDark } = useThemeStore();
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <LinearGradient
      colors={isDark ? ['#1A1A1A', '#2A2A2A'] : ['#F5F5F5', '#FFFFFF']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.avatarsContainer}>
          <View style={[styles.avatar, styles.avatarLarge]}>
            <LinearGradient
              colors={['#0b0286ff', '#005fa4ff']}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>F</Text>
            </LinearGradient>
          </View>
          <View
            style={[styles.avatar, styles.avatarSmall, styles.avatarTopLeft]}
          >
            <LinearGradient
              colors={['#0c0e31ff', '#000babff']}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarTextSmall}>R</Text>
            </LinearGradient>
          </View>
          <View
            style={[styles.avatar, styles.avatarSmall, styles.avatarTopRight]}
          >
            <LinearGradient
              colors={['#085400ff', '#00811eff']}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarTextSmall}>A</Text>
            </LinearGradient>
          </View>
          <View
            style={[
              styles.avatar,
              styles.avatarMedium,
              styles.avatarBottomLeft,
            ]}
          >
            <LinearGradient
              colors={['#4b0202ff', '#f80909ff']}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarTextMedium}>M</Text>
            </LinearGradient>
          </View>
          <View
            style={[
              styles.avatar,
              styles.avatarMedium,
              styles.avatarBottomRight,
            ]}
          >
            <LinearGradient
              colors={['#310132ff', '#ff00b3ff']}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarTextMedium}>E</Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            Share Your Moments
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Connect with friends and share your creative frames with the world
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <LinearGradient
              colors={['#005fa4ff', '#0b0286ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Get Started →</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/signin')}
            style={[
              styles.secondaryButton,
              { backgroundColor: colors.surface },
            ]}
          >
            <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
              Already have an account?{' '}
              <Text style={{ color: colors.primary }}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  avatarsContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    position: 'absolute',
    borderRadius: 100,
    overflow: 'hidden',
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLarge: {
    width: 140,
    height: 140,
    zIndex: 5,
  },
  avatarMedium: {
    width: 80,
    height: 80,
    zIndex: 3,
  },
  avatarSmall: {
    width: 60,
    height: 60,
    zIndex: 2,
  },
  avatarTopLeft: {
    top: 20,
    left: 20,
  },
  avatarTopRight: {
    top: 30,
    right: 30,
  },
  avatarBottomLeft: {
    bottom: 20,
    left: 40,
  },
  avatarBottomRight: {
    bottom: 30,
    right: 20,
  },
  avatarText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFF',
  },
  avatarTextMedium: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  avatarTextSmall: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 15,
  },
});
