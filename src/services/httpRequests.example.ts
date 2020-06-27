import api from './api';

export async function getAlarmState(): Promise<string> {
  try {
    const response = await api.get('/alarm_state.json');

    return response.data.alarm_state;
  } catch {
    return 'Error';
  }
}

export async function setNewAlarmState(newState: string): Promise<string> {
  try {
    const response = await api.put('/alarm_state.json', {
      alarm_state: newState,
      authorization: 'langustinLechuga',
    });

    return response.data.alarm_state;
  } catch {
    return 'Error';
  }
}

export async function addNewDevice(deviceId: string): Promise<[] | string> {
  try {
    const data = await api.get('/devices.json');

    const devices: string[] = data.data;

    if (devices !== null) {
      const deviceAlreadyExists = devices.find((item) => {
        return item === deviceId;
      });

      if (deviceAlreadyExists) {
        console.log('Device id already exists on the database');
        return 'Device id already exists on the database';
      }

      devices.push(deviceId);

      const response = await api.put('/devices.json', devices);

      return response.data;
    } else {
      const response = await api.put('/devices.json', [deviceId]);
      return response.data;
    }
  } catch {
    return 'Error';
  }
}

export async function getAlarmHistory(): Promise<object | string> {
  try {
    const { data } = await api.get('/history.json');

    const historyKeys = Object.keys(data);

    let history: string[] = [];

    historyKeys.map((item) => {
      history.push(data[item]);
    });

    history.forEach((item, index) => {
      const arr = item.split(' ');
      const utcSeconds = Number(arr[0]);
      let d = new Date(0);
      d.setUTCSeconds(utcSeconds);
      const newStr =
        (d.getDate() < 10 ? '0' : '') +
        String(d.getDate()) +
        '/' +
        (d.getMonth() + 1 < 10 ? '0' : '') +
        String(d.getMonth() + 1) +
        '/' +
        String(d.getFullYear()) +
        ' ' +
        (d.getHours() < 10 ? '0' : '') +
        String(d.getHours()) +
        ':' +
        (d.getMinutes() < 10 ? '0' : '') +
        String(d.getMinutes()) +
        ' → ' +
        arr[1];
      history[index] = newStr;
    });

    history.reverse();

    return history;
  } catch {
    return 'Error';
  }
}

export async function clearAlarmHistory(): Promise<string | null> {
  try {
    const { data } = await api.delete('/B84A50C788CD230FC1F312B5Fhistory.json');

    return data;
  } catch {
    return 'Error';
  }
}
