const localDay = Number(new Date().toLocaleString().slice(0, 2))
const localMonth = Number(new Date().toLocaleString().slice(3, 5))
const localYear = Number(new Date().toLocaleString().slice(6, 10))

const calenderYear = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

export {calenderYear,localDay, localMonth, localYear }