function convertPriority (priorityId) {
  let priority = ''

  switch (priorityId) {
    case 3:
      priority = 'Low'
      break
    case 2:
      priority = 'Medium'
      break
    default:
      priority = 'High'
  }
  
  return priority
}

module.exports = convertPriority