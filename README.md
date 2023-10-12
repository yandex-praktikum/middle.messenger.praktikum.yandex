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

#### Signup page

```http
/sign-up
```

| Local                                     | Netlify                                                          | Description           |
| :---------------------------------------- | :--------------------------------------------------------------- | :-------------------- |
| [/sign-up](http://localhost:3000/sign-up) | [/sign-up](https://ubiquitous-klepon-b5b9ad.netlify.app/sign-up) | Page with signup form |

#### Profile page

```http
/profile
```

| Local                                     | Netlify                                                          | Description                             |
| :---------------------------------------- | :--------------------------------------------------------------- | :-------------------------------------- |
| [/profile](http://localhost:3000/profile) | [/profile](https://ubiquitous-klepon-b5b9ad.netlify.app/profile) | Page with user profile and edit actions |

#### Chat page

```http
/messenger
```

| Local                                         | Netlify                                                              | Description    |
| :-------------------------------------------- | :------------------------------------------------------------------- | :------------- |
| [/messenger](http://localhost:3000/messenger) | [/messenger](https://ubiquitous-klepon-b5b9ad.netlify.app/messenger) | Page with chat |

#### Edit profile page

```http
/settings
```

| Local                                       | Netlify                                                            | Description                 |
| :------------------------------------------ | :----------------------------------------------------------------- | :-------------------------- |
| [/settings](http://localhost:3000/settings) | [/settings](https://ubiquitous-klepon-b5b9ad.netlify.app/settings) | Page with profile edit form |

#### Edit password page
