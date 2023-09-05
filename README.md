# Yandex practicum learning messenger project

- [Design](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE)
- [Netlify](https://ubiquitous-klepon-b5b9ad.netlify.app)

## Run Locally

Clone the project

```bash
  git clone https://github.com/tp47/practicum-chat
```

Go to the project directory

```bash
  cd practicum-chat
```

Install dependencies

```bash
  npm install
```

Start the dev server

```bash
  npm run dev
```

## Build Project

Build project

```bash
  npm run build
```

Preview builded project

```bash
  npm run preview
```

## Endpoints

#### Home page

```http
/
```

| Local                       | Netlify                                            | Description                              |
| :-------------------------- | :------------------------------------------------- | :--------------------------------------- |
| [/](http://localhost:3000/) | [/](https://ubiquitous-klepon-b5b9ad.netlify.app/) | Home page of application with login form |

#### Login page

```http
/signin
```

| Local                                   | Netlify                                                        | Description          |
| :-------------------------------------- | :------------------------------------------------------------- | :------------------- |
| [/signin](http://localhost:3000/signin) | [/signin](https://ubiquitous-klepon-b5b9ad.netlify.app/signin) | Page with login form |

#### Signup page

```http
/signup
```

| Local                                   | Netlify                                                        | Description           |
| :-------------------------------------- | :------------------------------------------------------------- | :-------------------- |
| [/signup](http://localhost:3000/signup) | [/signup](https://ubiquitous-klepon-b5b9ad.netlify.app/signup) | Page with signup form |

#### Profile page

```http
/profile
```

| Local                                     | Netlify                                                          | Description                             |
| :---------------------------------------- | :--------------------------------------------------------------- | :-------------------------------------- |
| [/profile](http://localhost:3000/profile) | [/profile](https://ubiquitous-klepon-b5b9ad.netlify.app/profile) | Page with user profile and edit actions |

#### Chat page

```http
/chat
```

| Local                               | Netlify                                                    | Description    |
| :---------------------------------- | :--------------------------------------------------------- | :------------- |
| [/chat](http://localhost:3000/chat) | [/chat](https://ubiquitous-klepon-b5b9ad.netlify.app/chat) | Page with chat |

#### Server error page

```http
/error
```

| Local                                 | Netlify                                                      | Description                        |
| :------------------------------------ | :----------------------------------------------------------- | :--------------------------------- |
| [/error](http://localhost:3000/error) | [/error](https://ubiquitous-klepon-b5b9ad.netlify.app/error) | Page with server error information |

#### Not found error page

Any unlisted route, for example:

```http
/not-found
```

| Local                                         | Netlify                                                              | Description                        |
| :-------------------------------------------- | :------------------------------------------------------------------- | :--------------------------------- |
| [/not-found](http://localhost:3000/not-found) | [/not-found](https://ubiquitous-klepon-b5b9ad.netlify.app/not-found) | Page with server error information |

#### Edit profile page

```http
/profile-edit
```

| Local                                               | Netlify                                                                    | Description                 |
| :-------------------------------------------------- | :------------------------------------------------------------------------- | :-------------------------- |
| [/profile-edit](http://localhost:3000/profile-edit) | [/profile-edit](https://ubiquitous-klepon-b5b9ad.netlify.app/profile-edit) | Page with profile edit form |

#### Edit password page

```http
/password-edit
```

| Local                                                 | Netlify                                                                      | Description                  |
| :---------------------------------------------------- | :--------------------------------------------------------------------------- | :--------------------------- |
| [/password-edit](http://localhost:3000/password-edit) | [/password-edit](https://ubiquitous-klepon-b5b9ad.netlify.app/password-edit) | Page with password edit form |
