export function formatDateForInput(dateString) {
  // dateString est au format YYYY-MM-DD
  // Vous pouvez le reformater au format DD/MM/YYYY si nécessaire
  // Par exemple, si dateString est "2023-10-25", on le reformate en "25/10/2023"
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}