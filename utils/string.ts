/**
 * Get initials from a full name, skipping common prepositions and articles
 * @param name - Full name to get initials
 * @param maxLength - Maximum number of initials (default: 2)
 * @returns Initials in uppercase
 * @example
 * getInitials('Fulano da Silva') // returns 'FS'
 * getInitials('Beltrano de Oliveira', 1) // returns 'B'
 */
export const getInitials = (name: string, maxLength = 2): string => {
  if (!name) return ''

  const skipWords = ['da', 'de', 'do', 'das', 'dos', 'e']

  return name
    .split(' ')
    .filter(word => !skipWords.includes(word.toLowerCase()))
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, maxLength)
} 