function convertDate (dateData) {
  let day = dateData.getDate()
  let month = dateData.getMonth() + 1
  let year = dateData.getFullYear()

  if (day < 10) {
    day = `0${day}`
  }
  if (month < 10) {
    month = `0${month}`
  }

  let convertedDate = `${year}-${month}-${day}`
  
  return convertedDate
}

module.exports = convertDate