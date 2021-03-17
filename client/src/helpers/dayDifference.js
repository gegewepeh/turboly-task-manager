function dayDifference (currentDate, dueDate) {
  const differenceInMS = dueDate.getTime() - currentDate.getTime()
  const differenceInDays = differenceInMS / (1000 * 3600 * 24)
  return differenceInDays
}

module.exports = dayDifference