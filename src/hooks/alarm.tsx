import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useCallback,
} from 'react';

import {
  getAlarmState,
  setNewAlarmState,
  getAlarmHistory,
  clearAlarmHistory,
} from '../services/httpRequests';

interface IAlarmContext {
  alarmState: string;
  alarmHistory: string[];
  changeAlarmState(): Promise<string>;
  updateAlarm(): void;
  updateHistory(): void;
  clearHistory(): void;
}

const AlarmContext = createContext<IAlarmContext>({} as IAlarmContext);

export const AlarmProvider: React.FC = ({ children }) => {
  const [alarmState, setAlarmState] = useState('Carregando');
  const [alarmHistory, setAlarmHistory] = useState<string[]>([]);

  useEffect(() => {
    getAlarmState().then((state) => {
      switch (state) {
        case 'on':
          setAlarmState('Ligado');
          break;
        case 'off':
          setAlarmState('Desligado');
          break;
        case 'ringing':
          setAlarmState('Tocando!');
          break;
        default:
          setAlarmState('Problema na conexão');
      }
    });
    getAlarmHistory().then((history) => {
      if (history === 'Error') {
        setAlarmHistory([]);
      } else {
        setAlarmHistory(history as string[]);
      }
    });
  }, []);

  const changeAlarmState = useCallback(async (): Promise<string> => {
    let response = '';
    if (alarmState !== 'Desligado') {
      response = await setNewAlarmState('off');
      response !== 'Error' && setAlarmState('Desligado');
    } else {
      response = await setNewAlarmState('on');
      response !== 'Error' && setAlarmState('Ligado');
    }
    return response;
  }, [alarmState]);

  const updateAlarm = useCallback(async () => {
    const response = await getAlarmState();
    switch (response) {
      case 'on':
        setAlarmState('Ligado');
        break;
      case 'off':
        setAlarmState('Desligado');
        break;
      case 'ringing':
        setAlarmState('Tocando!');
        break;
      default:
        setAlarmState('Problema na conexão');
    }
  }, []);

  const updateHistory = useCallback(async (): Promise<void> => {
    const history = await getAlarmHistory();
    if (history === 'Error') {
      setAlarmHistory([]);
    } else {
      setAlarmHistory(history as string[]);
    }
  }, []);

  const clearHistory = useCallback(async () => {
    await clearAlarmHistory();
    updateHistory();
    return;
  }, [updateHistory]);

  return (
    <AlarmContext.Provider
      value={{
        alarmState,
        alarmHistory,
        changeAlarmState,
        updateAlarm,
        updateHistory,
        clearHistory,
      }}>
      {children}
    </AlarmContext.Provider>
  );
};

export function useAlarmContext() {
  const context = useContext(AlarmContext);

  return context;
}
