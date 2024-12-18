export const getTimestamp = (time) => {
  const date = new Date(time);
  console.log(date);
};

export const parseTimeToSeconds = (time) => {
  const [hours, minutes, seconds] = time
    .split(/[: ]/)
    .map((val, i) => (i < 3 ? Number(val) : val));
  const isPM = time.includes("PM");

  // Convert to 24-hour format
  const adjustedHours = isPM ? (hours % 12) + 12 : hours % 12;

  return adjustedHours * 3600 + minutes * 60 + seconds;
};

export const getCurrentTimeInSeconds = () => {
  const now = new Date();
  const hours = now.getHours(); // Local time in 24-hour format
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return hours * 3600 + minutes * 60 + seconds;
};

export const subtractTimes = (currentTimeInSeconds, targetTime) => {
  // Convert target time to seconds
  const targetSeconds = parseTimeToSeconds(targetTime);

  if (targetSeconds > currentTimeInSeconds) return "00:00:00";

  // Calculate the difference
  const differenceInSeconds = Math.abs(currentTimeInSeconds - targetSeconds);

  // Convert the difference back to HH:mm:ss
  const hours = Math.floor(differenceInSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((differenceInSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (differenceInSeconds % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
