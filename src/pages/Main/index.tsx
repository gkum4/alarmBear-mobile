import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Sound from 'react-native-sound';

import styles from './styles';

import BoxContainer from '../../components/BoxContainer';

import { useAlarmContext } from '../../hooks/alarm';

const sound = new Sound('alarm.mp3');

const Main: React.FC = () => {
  const {
    alarmState,
    changeAlarmState,
    updateAlarm,
    alarmHistory,
    updateHistory,
    clearHistory,
  } = useAlarmContext();

  const [alarmStateColor, setAlarmStateColor] = useState('#9D9D9D');
  const [loading, setLoading] = useState(false);
  const [soundState, setSoundState] = useState('muted');

  useEffect(() => {
    if (alarmState === 'Ligado') {
      sound.stop();
      setAlarmStateColor('#24FF00');
    }
    if (alarmState === 'Desligado') {
      sound.stop();
      setAlarmStateColor('#9D9D9D');
    }
    if (alarmState === 'Tocando!') {
      sound.setVolume(0.4);
      sound.play();
      sound.setNumberOfLoops(-1);
      setSoundState('playing');
      setAlarmStateColor('#CD0000');
      updateHistory();
    }
  }, [alarmState, updateHistory]);

  useEffect(() => {
    setInterval(updateAlarm, 2000);
  }, [updateAlarm]);

  async function handleChangeAlarmStateButton() {
    const response = await changeAlarmState();
    response === 'Error' && Alert.alert('Problema na conexão, tente novamente');
  }

  function handleMuteButton() {
    if (soundState === 'playing') {
      sound.stop();
      setSoundState('paused');
    } else {
      sound.setVolume(0.4);
      sound.play();
      sound.setNumberOfLoops(-1);
      setSoundState('playing');
    }
  }

  const MuteSoundButton: React.FC = () => {
    if (alarmState === 'Tocando!' && soundState === 'playing') {
      return (
        <TouchableOpacity
          onPress={handleMuteButton}
          style={styles.muteSoundButton}>
          <Image
            source={require('../../assets/soundIcon.png')}
            style={styles.muteSoundIcon}
          />
        </TouchableOpacity>
      );
    }
    if (alarmState === 'Tocando!' && soundState === 'paused') {
      return (
        <TouchableOpacity
          onPress={handleMuteButton}
          style={styles.muteSoundButton}>
          <Image
            source={require('../../assets/soundMutedIcon.png')}
            style={styles.muteSoundIcon}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Alarm Bear</Text>
        <View style={styles.bearImageContainer}>
          <Image
            source={require('../../assets/bear.png')}
            style={styles.bearImage}
          />
        </View>
      </View>

      <BoxContainer title="Situação do Alarme">
        <>
          <View style={styles.alarmSituationTextContainer}>
            <Text
              style={[styles.alarmSituationText, { color: alarmStateColor }]}>
              {alarmState}
            </Text>
            {alarmState === 'Tocando!' && (
              <Text style={styles.sensorFiredText}>
                Disparado em: {alarmHistory[0]}
              </Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {alarmState === 'Tocando!' && <MuteSoundButton />}
            <TouchableOpacity
              style={styles.alarmSituationButtonContainer}
              onPress={async () => {
                if (alarmState === 'Tocando!') {
                  Alert.alert(
                    'Deseja realmente parar o alarme?',
                    undefined,
                    [
                      {
                        text: 'NÃO',
                        style: 'cancel',
                      },
                      {
                        text: 'SIM',
                        onPress: async () => {
                          setLoading(true);
                          await handleChangeAlarmStateButton();
                          setLoading(false);
                        },
                      },
                    ],
                    { cancelable: true },
                  );
                } else {
                  setLoading(true);
                  await handleChangeAlarmStateButton();
                  setLoading(false);
                }
              }}>
              {!loading ? (
                <Text style={styles.alarmSituationButtonText}>
                  {alarmState === 'Ligado' || alarmState === 'Tocando!'
                    ? 'Desligar'
                    : 'Ligar'}
                </Text>
              ) : (
                <ActivityIndicator size="small" color="#eaeaea" />
              )}
            </TouchableOpacity>
          </View>
        </>
      </BoxContainer>

      <BoxContainer title="Histórico">
        <>
          {alarmHistory.map((item) => (
            <View style={styles.historyItemContainer}>
              <Text style={styles.historyItemText}>• {item}</Text>
            </View>
          ))}
          {alarmHistory.length !== 0 && (
            <TouchableOpacity
              style={styles.clearHistoryButton}
              onPress={async () => {
                Alert.alert(
                  'Deseja realmente limpar o histórico?',
                  undefined,
                  [
                    {
                      text: 'Não',
                      style: 'cancel',
                    },
                    {
                      text: 'Sim',
                      onPress: () => {
                        clearHistory();
                      },
                    },
                  ],
                  { cancelable: true },
                );
              }}>
              <Text style={styles.clearHistoryText}>Limpar Histórico</Text>
            </TouchableOpacity>
          )}
        </>
      </BoxContainer>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default Main;
