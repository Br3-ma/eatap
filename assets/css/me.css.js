// MeScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  coverPhoto: {
    height: 150,
    backgroundColor: '#FF6B6B',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: -50,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  badgeContainer: {
    position: 'absolute',
    top: 60,
    right: '35%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  profileBadge: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginTop: 4,
  },
  profileBio: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
  },
  actionText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    width: '45%',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityInfo: {
    marginLeft: 15,
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activityMeta: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailContent: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
});

export default styles;