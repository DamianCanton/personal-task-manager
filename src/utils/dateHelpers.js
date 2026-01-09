export function formatDate(date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function getToday() {
  return formatDate(new Date());
}

export function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDate(tomorrow);
}

export function getPrettyDate(dateString) {
  // dateString is YYYY-MM-DD
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-").map(Number);
  // Note: Month is 0-indexed in JS Date
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function addDays(dateString, days) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return formatDate(date);
}

export function getDayOfWeek(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const jsDay = date.getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}
