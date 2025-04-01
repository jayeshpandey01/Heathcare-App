import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type Scan = {
  id: string;
  type: 'MRI' | 'CT';
  date: string;
  status: 'pending' | 'analyzed';
  result?: string;
  confidence?: number;
};

export default function TumorDetectionScreen() {
  const [scans, setScans] = useState<Scan[]>([
    {
      id: '1',
      type: 'MRI',
      date: '2024-03-15',
      status: 'analyzed',
      result: 'No tumor detected',
      confidence: 98.5,
    },
    {
      id: '2',
      type: 'CT',
      date: '2024-03-10',
      status: 'analyzed',
      result: 'Small benign tumor detected',
      confidence: 95.2,
    },
  ]);

  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Handle the uploaded image
      const newScan: Scan = {
        id: Date.now().toString(),
        type: 'MRI',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
      };
      setScans(prev => [newScan, ...prev]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Tumor Detection</Text>
        <Text style={styles.subtitle}>Analyze your MRI/CT scans instantly</Text>
      </View>

      {/* Upload Section */}
      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <View style={styles.uploadIconContainer}>
            <Ionicons name="scan-outline" size={32} color="#4A90E2" />
          </View>
          <Text style={styles.uploadTitle}>Upload New Scan</Text>
          <Text style={styles.uploadSubtitle}>Support for MRI and CT scans</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Scans */}
      <View style={styles.recentScans}>
        <Text style={styles.sectionTitle}>Recent Scans</Text>
        <ScrollView style={styles.scansList}>
          {scans.map(scan => (
            <View key={scan.id} style={styles.scanCard}>
              <View style={styles.scanHeader}>
                <View style={styles.scanTypeContainer}>
                  <Ionicons
                    name={scan.type === 'MRI' ? 'magnet-outline' : 'scan-outline'}
                    size={24}
                    color="#4A90E2"
                  />
                  <Text style={styles.scanType}>{scan.type}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: scan.status === 'analyzed' ? '#50E3C220' : '#F5A62320' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: scan.status === 'analyzed' ? '#50E3C2' : '#F5A623' }
                  ]}>
                    {scan.status === 'analyzed' ? 'Analyzed' : 'Pending'}
                  </Text>
                </View>
              </View>
              <Text style={styles.scanDate}>{scan.date}</Text>
              {scan.result && (
                <View style={styles.resultContainer}>
                  <Text style={styles.resultTitle}>AI Analysis Result:</Text>
                  <Text style={styles.resultText}>{scan.result}</Text>
                  {scan.confidence && (
                    <View style={styles.confidenceContainer}>
                      <Text style={styles.confidenceLabel}>Confidence:</Text>
                      <Text style={styles.confidenceValue}>{scan.confidence}%</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Ionicons name="flash-outline" size={24} color="#4A90E2" />
            <Text style={styles.featureTitle}>Instant Analysis</Text>
            <Text style={styles.featureDescription}>Get results in seconds</Text>
          </View>
          <View style={styles.featureCard}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#4A90E2" />
            <Text style={styles.featureTitle}>High Accuracy</Text>
            <Text style={styles.featureDescription}>98% detection rate</Text>
          </View>
          <View style={styles.featureCard}>
            <Ionicons name="medical-outline" size={24} color="#4A90E2" />
            <Text style={styles.featureTitle}>Expert Review</Text>
            <Text style={styles.featureDescription}>Verified by specialists</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  uploadSection: {
    padding: 24,
  },
  uploadButton: {
    backgroundColor: '#4A90E220',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  recentScans: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  scansList: {
    flex: 1,
  },
  scanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scanTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scanDate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  resultContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#50E3C2',
  },
  featuresSection: {
    padding: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 12,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
}); 