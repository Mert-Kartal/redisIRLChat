import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AccountService } from '../account/account.service';
import { ConfigService } from '@nestjs/config';
import { Providers } from '@prisma/client';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly accountService: AccountService,
  ) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL');
    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Google configuration is missing');
    }
    super({
      clientID,
      clientSecret,
      callbackURL,
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ) {
    const { id, name, emails } = profile as {
      id: string;
      name: { givenName: string };
      emails: { value: string }[];
    };

    const data = await this.accountService.findOrCreate(
      name.givenName,
      emails[0].value,
      id,
      Providers.GOOGLE,
    );
    done(null, data);
  }
}
