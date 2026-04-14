export const DEPTS = [
  "Computer Science and Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics and Communication",
  "Information Technology",
  "Artificial Intelligence",
  "Data Science"
];

export const avatarColors = [
  "navy", "teal", "sapphire", "indigo", "slate"
];

export const getInitials = (numOrName) => {
  if (!numOrName) return "?";
  if (typeof numOrName === 'string') {
    return numOrName.split(' ')
      .slice(0, 2)
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase() || '?';
  }
  return "?";
};


