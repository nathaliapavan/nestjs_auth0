import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login(user: { username: string; password: string }) {
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;
    const audience = process.env.AUTH0_AUDIENCE;
    const grantType = 'password';
    const tokenEndpoint = `${process.env.AUTH0_DOMAIN}oauth/token`;

    try {
      const response = await this.httpService
        .post(tokenEndpoint, {
          client_id: clientId,
          client_secret: clientSecret,
          username: user.username,
          password: user.password,
          audience: audience,
          grant_type: grantType,
        })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error(
        'Error getting token:',
        error.response.data.error_description,
      );
      throw new Error('Error getting token');
    }
  }
}
