// convert seconds into HHMMSS format
export const secondsToHHMMSS = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;
  let stringHours, stringMinutes, stringSeconds;

  // Padding the values to ensure they are two digits
  stringHours = hours < 10 ? '0' + hours : hours;
  stringMinutes = minutes < 10 ? '0' + minutes : minutes;

  stringSeconds = seconds < 10 ? '0' + seconds : seconds;

  return stringHours + ':' + stringMinutes + ':' + stringSeconds;
};

export const secondsToMMSS = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;
  let stringMinutes, stringSeconds;

  // Padding the values to ensure they are two digits
  // stringHours = hours < 10 ? '0' + hours : hours;
  stringMinutes = minutes < 10 ? '0' + minutes : minutes;

  stringSeconds = seconds < 10 ? '0' + seconds : seconds;

  return stringMinutes + ':' + stringSeconds;
};
