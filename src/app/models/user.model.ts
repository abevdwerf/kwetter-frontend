export interface User {
  id: number;
  displayName: string;
  userName: string;
  description: string;
  firebaseUuid: string;
}

export interface RegisterUser {
  displayName: string;
  userName: string;
  firebaseUuid: string;
}