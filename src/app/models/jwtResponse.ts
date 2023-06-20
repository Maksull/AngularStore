import { RefreshTokenRequest } from "./refreshTokenRequest";

export class JwtResponse {
    public jwt: string = "";
    public refreshToken: RefreshTokenRequest = new RefreshTokenRequest();
}