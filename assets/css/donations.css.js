// BoxScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
  },
  boxContainer: {
    gap: 16,
  },
  boxWrapper: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
  },
  box: {
    borderRadius: 16,
    padding: 16,
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxIcon: {
    color: '#FF6B6B',
    fontSize: 24,
    marginRight: 8,
  },
  boxHeaderText: {
    color: '#FF6B6B',
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  boxContent: {
    gap: 16,
  },
  boxDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    color: '#757575',
    fontSize: 18,
    marginRight: 8,
  },
  detailLabel: {
    color: '#333',
    fontWeight: '600',
    marginRight: 4,
  },
  detailValue: {
    color: '#333',
    flex: 1,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timestampIcon: {
    color: '#757575',
    fontSize: 14,
    marginRight: 4,
  },
  timestampText: {
    color: '#757575',
    fontSize: 12,
  },
  centeredItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
  },
  centeredItem: {
    flex: 1,
    alignItems: 'center',
  },
  centeredItemDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 10,
    backgroundColor: '#E0E0E0',
  },
  centeredItemLabel: {
    color: '#757575',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  centeredItemValue: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;