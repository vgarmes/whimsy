export type FileStatus =
  | 'autonomous' // Flying autonomously towards the file
  | 'being-captured' // Very close to the folder, being sucked in
  | 'captured' // At the very center of the folder, no longer active
  | 'caught' // The user is grabbing the file
  | 'released'; // The user has released a previously-grabbed file
