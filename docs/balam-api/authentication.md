---
sidebar_position: 1
---

# Authentication

All requests to the API must be authenticated, to authenticate requests we use a JWT token. To obtain this token you can make a request to the graphql endpoint using the mutation:

```graphql
mutation {
  tokenAuth(
    username: "<some_user>",
    password: "<some_password>"
  ) {
    token
  }
}
```

this will return the following response:

```graphql
{
  "data": {
    "tokenAuth": {
      "token": "<token>"
    }
  }
}
```

use that token in your requests, setting the Authentication header like so:

```js
"Authentication": "JWT <token>"
```

## Refresh JWT token

By default the JWT generated is valid only for 2 hours. After that your JWT token is expired and
won't be able to make request until you generate a new one. But you can also refresh a token, so
if you have a _remember me_ feature, you can use the refresh token mutation to get a new token
without asking the user to enter its credentials again.

You can use this mutation like this:

```graphql
mutation {
  refreshToken(
    token: "<old token>"
  ) {
    token
    refreshExpiresIn
  }
}
```

and you'll get something similar as the `tokenAuth` mutation:

```graphql
{
  "data": {
    "refreshToken": {
      "token": "<new token>",
      "refreshExpiresIn": 1687217746
    }
  }
}
```

you can also get the expiration time in the request adding the `refreshExpiresIn` in the mutation. There's a time limit though,
after 7 days, you won't be able to get a new token by `refreshToken`, so after this time you'll be signed out, and will need to
get a new token by the `tokenAuth` mutation.


## Verify token

You can also verify your token to check if is still valid. To do so, you can use the `verifyToken` mutation. This mutation takes the
token as an input and returns information encrypted in the token. Here is an example:

```graphql
mutation {
  verifyToken(
    token: "<token>"
  ){
    payload
  }
}
```

and the response looks something similar to this:

```graphql
{
  "data": {
    "verifyToken": {
      "payload": {
        "username": "<username>",
        "sub": "<user-uuid>",
        "exp": 1686620159,
        "origIat": 1686612946
      }
    }
  }
}
```

