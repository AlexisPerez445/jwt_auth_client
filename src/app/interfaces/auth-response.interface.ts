export interface AuthResponse {
  ok:    boolean;
  name:  string;
  token: string;
  rol?:   string;
}
export interface CheckTokenResponse {
  ok:  boolean;
  msg: string;
}
