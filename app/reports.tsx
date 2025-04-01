import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

type Report = {
  id: string;
  title: string;
  date: string;
  type: string;
  status: 'pending' | 'analyzed';
  summary?: string;
};

export default function ReportsScreen() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Blood Test Report',
      date: '2024-03-15',
      type: 'Blood Test',
      status: 'analyzed',
      summary: 'All parameters within normal range. Vitamin D levels slightly low.',
    },
    {
      id: '2',
      title: 'MRI Scan',
      date: '2024-03-10',
      type: 'MRI',
      status: 'analyzed',
      summary: 'No abnormalities detected. Normal brain structure.',
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
      const newReport: Report = {
        id: Date.now().toString(),
        title: 'New Report',
        date: new Date().toISOString().split('T')[0],
        type: 'Uploaded',
        status: 'pending',
      };
      setReports(prev => [newReport, ...prev]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Smart Reports</Text>
        <Text style={styles.subtitle}>AI-powered medical report analysis</Text>
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Ionicons name="cloud-upload-outline" size={24} color="#4A90E2" />
        <Text style={styles.uploadButtonText}>Upload New Report</Text>
      </TouchableOpacity>

      {/* Reports List */}
      <ScrollView style={styles.reportsList}>
        {reports.map(report => (
          <TouchableOpacity key={report.id} style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <View style={styles.reportIcon}>
                <Ionicons
                  name={report.type === 'Blood Test' ? 'water-outline' : 'scan-outline'}
                  size={24}
                  color="#4A90E2"
                />
              </View>
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDate}>{report.date}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: report.status === 'analyzed' ? '#50E3C220' : '#F5A62320' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: report.status === 'analyzed' ? '#50E3C2' : '#F5A623' }
                ]}>
                  {report.status === 'analyzed' ? 'Analyzed' : 'Pending'}
                </Text>
              </View>
            </View>
            {report.summary && (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>AI Analysis Summary:</Text>
                <Text style={styles.summaryText}>{report.summary}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
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
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E220',
    margin: 24,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  uploadButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  reportsList: {
    flex: 1,
    padding: 24,
  },
  reportCard: {
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
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4A90E220',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  reportDate: {
    fontSize: 14,
    color: '#666666',
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
  summaryContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
}); 