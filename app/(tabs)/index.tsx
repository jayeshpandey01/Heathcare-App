import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Animated, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type HealthMetric = {
  title: string;
  value: string;
  unit: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

type QuickAction = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  screen: string;
};

type Article = {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [userName] = useState('John');
  const [refreshing, setRefreshing] = useState(false);
  const [activeMetric, setActiveMetric] = useState<number | null>(null);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(-50);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const healthMetrics: HealthMetric[] = [
    { title: 'Steps', value: '8,234', unit: 'steps', icon: 'footsteps-outline', color: '#4A90E2' },
    { title: 'Heart Rate', value: '72', unit: 'bpm', icon: 'heart-outline', color: '#E24A4A' },
    { title: 'Sleep', value: '7.5', unit: 'hrs', icon: 'moon-outline', color: '#4AE2A3' },
    { title: 'Water', value: '1.8', unit: 'L', icon: 'water-outline', color: '#4A90E2' },
  ];

  const quickActions: QuickAction[] = [
    { title: 'AI Health Assistant', icon: 'chatbubbles-outline', color: '#4A90E2', screen: '/chat' },
    { title: 'Smart Reports', icon: 'document-text-outline', color: '#4AE2A3', screen: '/reports' },
    { title: 'Video Consultation', icon: 'videocam-outline', color: '#E24A4A', screen: '/consultation' },
    { title: 'AI Tumor Detection', icon: 'scan-outline', color: '#F5A623', screen: '/tumor-detection' },
    { title: 'Health Blog', icon: 'newspaper-outline', color: '#9B4AE2', screen: '/blog' },
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding Your Blood Pressure Readings',
      category: 'Cardiovascular Health',
      readTime: '5 min read',
      image: 'https://picsum.photos/200/300',
    },
    {
      id: '2',
      title: 'Tips for Better Sleep Quality',
      category: 'Sleep Health',
      readTime: '4 min read',
      image: 'https://picsum.photos/200/301',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Animated Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View>
            <Text style={styles.greeting}>{greeting}, {userName}</Text>
            <Text style={styles.subtitle}>Let's check your health status</Text>
          </View>
          <Link href="/profile" asChild>
            <TouchableOpacity style={styles.profileButton}>
              <LinearGradient
                colors={['#4A90E2', '#357ABD']}
                style={styles.profileGradient}
              >
                <Ionicons name="person-circle-outline" size={32} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </Link>
        </Animated.View>

        {/* Health Metrics */}
        <Animated.View 
          style={[
            styles.metricsContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <Text style={styles.sectionTitle}>Today's Health Metrics</Text>
          <View style={styles.metricsGrid}>
            {healthMetrics.map((metric, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveMetric(activeMetric === index ? null : index)}
                style={[
                  styles.metricCard,
                  activeMetric === index && styles.activeMetricCard
                ]}
              >
                <View style={[styles.metricIconContainer, { backgroundColor: `${metric.color}20` }]}>
                  <Ionicons name={metric.icon} size={24} color={metric.color} />
                </View>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricUnit}>{metric.unit}</Text>
                <Text style={styles.metricTitle}>{metric.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <Link 
                key={index}
                href={action.screen as any}
                asChild
              >
                <TouchableOpacity
                  style={styles.actionCard}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={[action.color, action.color + '80']}
                    style={styles.actionIconContainer}
                  >
                    <Ionicons name={action.icon} size={24} color="#FFFFFF" />
                  </LinearGradient>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>

        {/* Featured Articles */}
        <View style={styles.articlesContainer}>
          <View style={styles.articlesHeader}>
            <Text style={styles.sectionTitle}>Featured Articles</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={width * 0.7 + 16}
          >
            {articles.map((article) => (
              <TouchableOpacity 
                key={article.id} 
                style={styles.articleCard}
                activeOpacity={0.9}
              >
                <Image source={{ uri: article.image }} style={styles.articleImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.articleGradient}
                >
                  <View style={styles.articleContent}>
                    <Text style={styles.articleCategory}>{article.category}</Text>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <Text style={styles.readTime}>{article.readTime}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  profileButton: {
    padding: 8,
  },
  metricsContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricCard: {
    width: (width - 80) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  metricUnit: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  actionsContainer: {
    padding: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionCard: {
    width: (width - 80) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
    textAlign: 'center',
  },
  articlesContainer: {
    padding: 24,
  },
  articlesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllButton: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  articleCard: {
    width: width * 0.7,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  articleImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  articleContent: {
    padding: 16,
  },
  articleCategory: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  readTime: {
    fontSize: 12,
    color: '#666666',
  },
  activeMetricCard: {
    transform: [{ scale: 1.05 }],
    borderColor: '#4A90E2',
    borderWidth: 2,
  },
  profileGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 16,
  },
  articleContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  articleCategory: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.9,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  readTime: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});
