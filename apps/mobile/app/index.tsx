import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const tournaments = [
  {
    id: 1,
    name: 'French Open',
    location: 'Paris, France',
    startDate: '2025-05-26',
    category: 'ATP/WTA',
    surface: 'Clay'
  },
  {
    id: 2,
    name: 'Wimbledon',
    location: 'London, England',
    startDate: '2025-06-30',
    category: 'ATP/WTA',
    surface: 'Grass'
  },
  {
    id: 3,
    name: 'US Open',
    location: 'New York, USA',
    startDate: '2025-08-25',
    category: 'ATP/WTA',
    surface: 'Hard'
  }
]

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Tennis Travel Assistant</Text>
        <Text style={styles.subtitle}>
          Plan your tennis tournament trips with ease
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Tournaments</Text>
        {tournaments.map((tournament) => (
          <View key={tournament.id} style={styles.tournamentCard}>
            <View style={styles.tournamentHeader}>
              <Text style={styles.tournamentName}>{tournament.name}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{tournament.category}</Text>
              </View>
            </View>
            
            <Text style={styles.tournamentLocation}>{tournament.location}</Text>
            <Text style={styles.tournamentDate}>
              {new Date(tournament.startDate).toLocaleDateString()}
            </Text>
            <Text style={styles.tournamentSurface}>{tournament.surface} Court</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.flightButton}>
                <Text style={styles.buttonText}>Find Flights</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.hotelButton}>
                <Text style={styles.buttonText}>Find Hotels</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  tournamentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
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
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tournamentName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1d4ed8',
  },
  tournamentLocation: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 4,
  },
  tournamentDate: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  tournamentSurface: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  flightButton: {
    flex: 1,
    backgroundColor: '#0ea5e9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  hotelButton: {
    flex: 1,
    backgroundColor: '#64748b',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
})
