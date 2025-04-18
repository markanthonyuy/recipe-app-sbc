export const formatDate = (date: Date) => {
  if (!(date instanceof Date)) {
    return date
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
