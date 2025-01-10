import { h } from 'preact';

export function mapTotalBalance(minutes: number): h.JSX.Element {
  let prefix = "";

  if (minutes < 0) {
    prefix = "-";
    minutes = Math.abs(minutes);
  } else {
    prefix = "+";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hourLabel = hours === 1
    ? "godzina"
    : (hours > 1 && hours < 5 ? "godziny" : "godzin");
  const minuteLabel = remainingMinutes === 1
    ? "minuta"
    : (remainingMinutes > 1 && remainingMinutes < 5 ? "minuty" : "minut");
  return <p class={`${prefix === '+' ? 'text-green-500' : 'text-red-500'}`}>
    {prefix}{hours} {hourLabel} {remainingMinutes} {minuteLabel}
  </p>;
}
