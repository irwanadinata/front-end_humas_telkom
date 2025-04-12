export const formatTanggal = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatWaktu = (waktuString) => {
  if (!waktuString) return "-";
  const [jam, menit] = waktuString.split(":");
  return `${jam}:${menit}`;
};
