import { h } from "preact";

export function mapTotalBalance(
  minutes: number,
  hasFullLabel: boolean = true,
): h.JSX.Element {
  let prefix = "";

  if (minutes < 0) {
    prefix = "-";
    minutes = Math.abs(minutes);
  } else {
    prefix = "+";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const days = Math.floor(hours / 24);

  let hourLabel;
  let minuteLabel;

  if (hasFullLabel) {
    hourLabel = hours === 1
      ? "godzina"
      : (hours > 1 && hours < 5 ? "godziny" : "godzin");
    minuteLabel = remainingMinutes === 1
      ? "minuta"
      : (remainingMinutes > 1 && remainingMinutes < 5 ? "minuty" : "minut");
  } else {
    hourLabel = "g";
    minuteLabel = "m";
  }

  if (days > 0) {
    return (
      <p class={`${prefix === "+" ? "text-green-500" : "text-red-500"}`}>
        {prefix}
        {days} dni {hours - days * 24} {hourLabel} {remainingMinutes}{" "}
        {minuteLabel}
      </p>
    );
  }

  if (hours > 0) {
    return (
      <p class={`${prefix === "+" ? "text-green-500" : "text-red-500"}`}>
        {prefix}
        {hours} {hourLabel} {remainingMinutes} {minuteLabel}
      </p>
    );
  }

  if (remainingMinutes > 0) {
    return (
      <p class={`${prefix === "+" ? "text-green-500" : "text-red-500"}`}>
        {prefix}
        {remainingMinutes} {minuteLabel}
      </p>
    );
  }

  return (
    <p class="text-green-500">
      0 minut
    </p>
  );
}
