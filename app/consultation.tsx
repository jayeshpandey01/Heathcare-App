import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  image: string;
  availability: string;
  fee: string;
};

export default function ConsultationScreen() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [doctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialization: 'Cardiologist',
      rating: 4.8,
      experience: '12 years',
      image: 'https://example.com/doctor1.jpg',
      availability: 'Available Today',
      fee: '₹500',
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Neurologist',
      rating: 4.9,
      experience: '15 years',
      image: 'https://example.com/doctor2.jpg',
      availability: 'Next: 2:30 PM',
      fee: '₹800',
    },
    {
      id: '3',
      name: 'Dr. Anjali Patel',
      specialization: 'Pediatrician',
      rating: 4.7,
      experience: '8 years',
      image: 'https://example.com/doctor3.jpg',
      availability: 'Available Today',
      fee: '₹600',
    },
  ]);

  const specialties = [
    { id: 'all', name: 'All Specialties' },
    { id: 'cardio', name: 'Cardiology' },
    { id: 'neuro', name: 'Neurology' },
    { id: 'pediatric', name: 'Pediatrics' },
    { id: 'ortho', name: 'Orthopedics' },
  ];

  const handleConsult = (doctorId: string) => {
    // Implement consultation booking logic
    console.log('Consult with doctor:', doctorId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Video Consultation</Text>
        <Text style={styles.subtitle}>Connect with top doctors online</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666666" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search doctors, specialties...</Text>
      </View>

      {/* Specialties */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.specialtiesContainer}
      >
        {specialties.map(specialty => (
          <TouchableOpacity
            key={specialty.id}
            style={[
              styles.specialtyButton,
              selectedSpecialty === specialty.id && styles.selectedSpecialty
            ]}
            onPress={() => setSelectedSpecialty(specialty.id)}
          >
            <Text style={[
              styles.specialtyText,
              selectedSpecialty === specialty.id && styles.selectedSpecialtyText
            ]}>
              {specialty.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Doctors List */}
      <ScrollView style={styles.doctorsList}>
        {doctors.map(doctor => (
          <View key={doctor.id} style={styles.doctorCard}>
            <View style={styles.doctorInfo}>
              <View style={styles.doctorImage}>
                <Ionicons name="person-circle-outline" size={48} color="#4A90E2" />
              </View>
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialization}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#F5A623" />
                  <Text style={styles.rating}>{doctor.rating}</Text>
                  <Text style={styles.experience}>• {doctor.experience}</Text>
                </View>
              </View>
            </View>
            <View style={styles.availabilityContainer}>
              <View style={styles.availabilityBadge}>
                <Ionicons name="time-outline" size={16} color="#50E3C2" />
                <Text style={styles.availabilityText}>{doctor.availability}</Text>
              </View>
              <Text style={styles.fee}>{doctor.fee}</Text>
            </View>
            <TouchableOpacity
              style={styles.consultButton}
              onPress={() => handleConsult(doctor.id)}
            >
              <Text style={styles.consultButtonText}>Consult Now</Text>
            </TouchableOpacity>
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    margin: 24,
    padding: 12,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: '#666666',
    fontSize: 16,
  },
  specialtiesContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  specialtyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  selectedSpecialty: {
    backgroundColor: '#4A90E2',
  },
  specialtyText: {
    color: '#666666',
    fontSize: 14,
  },
  selectedSpecialtyText: {
    color: '#FFFFFF',
  },
  doctorsList: {
    flex: 1,
    padding: 24,
  },
  doctorCard: {
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
  doctorInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  doctorImage: {
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 4,
  },
  experience: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#50E3C220',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  availabilityText: {
    fontSize: 14,
    color: '#50E3C2',
    marginLeft: 4,
  },
  fee: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  consultButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  consultButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 