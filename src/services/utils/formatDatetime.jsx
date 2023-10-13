export default function timestampToDate(timestamp) {
  timestamp = parseInt(timestamp)
  const date = new Date(timestamp);
  const year = date.getUTCFullYear().toString(); // Obtient les deux derniers chiffres de l'année
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Obtient le mois (janvier = 0)
  const day = date.getUTCDate().toString().padStart(2, '0'); // Obtient le jour du mois
  return `${day} / ${month} / ${year}`;
}
