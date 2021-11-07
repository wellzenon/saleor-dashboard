import { User } from "@saleor/fragments/types/User";
import {
  AccountErrorFragment,
  CreateToken,
  ExternalAuthenticationUrl,
  ExternalObtainAccessTokens,
  MutationSetPasswordArgs,
  SetPasswordMutation,
  UserFragment
} from "@saleor/sdk/dist/apollo/types";
import { FetchResult } from "apollo-link";
import { MutableRefObject } from "react";

export interface RequestExternalLoginInput {
  redirectUri: string;
}

export interface ExternalLoginInput {
  code: string;
  state: string;
}

export interface RequestExternalLogoutInput {
  returnTo: string;
}

export interface UserContext {
  login: (
    username: string,
    password: string
  ) => Promise<
    Pick<CreateToken, "csrfToken" | "token"> & {
      errors: AccountErrorFragment[];
      user: UserFragment;
    }
  >;
  loginByExternalPlugin: (
    pluginId: string,
    input: ExternalLoginInput
  ) => Promise<
    Pick<ExternalObtainAccessTokens, "csrfToken" | "token"> & {
      user: UserFragment;
      errors: AccountErrorFragment[];
    }
  >;
  logout: () => Promise<void>;
  requestLoginByExternalPlugin: (
    pluginId: string,
    input: RequestExternalLoginInput
  ) => Promise<
    Pick<ExternalAuthenticationUrl, "authenticationData"> & {
      errors: AccountErrorFragment[];
    }
  >;
  setPassword: (
    opts: MutationSetPasswordArgs
  ) => Promise<
    FetchResult<SetPasswordMutation, Record<string, any>, Record<string, any>>
  >;
  user?: User;
  autologinPromise?: MutableRefObject<Promise<any>>;
  authenticating: boolean;
  authenticated: boolean;
}
