import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#052C10',
    paddingTop: 15,
    paddingHorizontal: 25,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  titleText: {
    color: '#eaeaea',
    fontSize: 36,
    fontWeight: 'bold',
    textAlignVertical: 'bottom',
  },
  bearImageContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bearImage: {
    width: 50,
    height: 50,
  },
  alarmSituationTextContainer: {
    marginTop: 45,
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarmSituationText: {
    fontWeight: 'bold',
    fontSize: 45,
  },
  sensorFiredText: {
    color: '#eaeaea',
    fontSize: 14,
  },
  alarmSituationButtonContainer: {
    backgroundColor: '#1DA1F2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    width: 150,
    alignSelf: 'center',
  },
  alarmSituationButtonText: {
    color: '#eaeaea',
    fontSize: 14,
  },
  historyItemContainer: {
    marginTop: 5,
  },
  historyItemText: {
    color: '#d0d0d0',
    fontSize: 12,
    paddingLeft: 10,
  },
  viewAllTheHistoryButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    width: 150,
    alignSelf: 'center',
    marginTop: 15,
  },
  viewAllTheHistoryButtonText: {
    color: '#eaeaea',
    fontWeight: 'bold',
  },
  muteSoundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  muteSoundIcon: {
    width: 30,
    height: 25,
  },
  clearHistoryButton: {
    width: '100%',
    marginTop: 15,
  },
  clearHistoryText: {
    color: '#CD0000',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default styles;
