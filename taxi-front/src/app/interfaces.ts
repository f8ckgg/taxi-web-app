export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  role: string;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  driver: boolean;
}
export interface CarDTO {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
}
export interface RoadDTO {
  id: number;
  startLocation: string;
  endLocation: string;
  accepted: boolean;
  finished: boolean;
  car: CarDTO;
  user: UserDTO;
  driver: UserDTO;
}
export interface BillDTO{
  id: number;
  amount: number;
  road: RoadDTO;
}
export interface RatingDTO {
  id: number;
  value: number;
  comment: string;
}
