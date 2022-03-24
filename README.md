Paso uno y dos, fornt pagina auth
paso tres pagina main navigation par ael front

1 - crear todo lo relacionado a la creacion de usuario, creo primero el back, usando helper para inicializar el server, luego creo el front donde tendré un fech el cual en el body enviara toda la info.

2- creo lo relacionado al login, creo un file nuevo el API, este file sera dinamico , en el cual voy a 
conectar el servidor tambien y usare el method NextAuth para crear todo el back. Seguir los pasos de alli,
Luego voy al fron de donde enviare la info. Aquí no llamaré a ningun fech, en vambio usaré la funcion signIn, desde conde enviaré la info al back.Luego puedo usar el getSession para ver si hay alguna secion iniciada y usar el loading. 

3- trabajo con las cookes, para ello llamo el hook useSession de "react-auth/client", lo que me retornara un objeto.  {useSession } from "next-auth/react"; Para que funcione debo colocar un provider en el _api.
Luego teniendo esta info puedo manejar el log out de la login screen. 

4- logout: en el logout bottom llamo el onClick para llamar a la funcion hadleLogAuth, la cual disparará
al method sigOut(), de next-auth/react.

5- si estoy logout, no permitir que se vea las rutas privadas. voy al componente user-Profile, Luego puedo usar el getSession para ver si hay alguna secion iniciada y usar el loading. Primero con useState creo el estado para ver si paraece el loading, y luego con el get session que se va a fijar si hay algo iniciado, cambio el estado del useState.
 window.location.href ="/auth" ---> para redireccionar. 1- agrego el useRouter() al autentification, cuando es login uso el useRouter() para redireccionar. (diferencia push y replace). Replace borra lo anterior


6- agrego el serverSidePorps, paso la funcion de control de ver si el usuario esta o no autenticado al server side, de esta forma la respuesta será mas rapida. en page *"profile"*. Par alo que tambien utilizare el **getSession**, ver como manejar el redirection para cuando no está autentificado. 
Haciendo esto me puedo desacer de lo que cumple la misma funcion en el navegador, lo dejaré comentado


Protection the auth page:

1- agrego el useRouter() al autentification, cuando es login uso el useRouter() para redireccionar. (diferencia push y replace). Replace borra lo anterior.

2- paso 3 en adelante del login pero con el auth.

en este caso lo hice clientSide, pero se puede hacer igual que en el login serverSide usando getServerSideProps.


Protecting API routes:

1- Lo primeros que hacemos es crear un API pero manualmente, en este caso usaremos esto para ver y controlar quien puede cambiar la contraseña. Para esto deberemos verificar que el method que se envía es un PATCH PUT or POST, luego ver si hay sesion abierta. Para eso uso nuevamente el getSession (esta en API/USER/CHANGE-PASSWORD).

2- veo que tipo de method es, controlo que esté auth y luego comparo email y passwords.
importnate el email lo extraigo del token. (session es el token), al token le agregu el email en [...nextauth].js

3- verifico si el usuario existe, medio al pedo por que el usiario debería existir 

4- controlo la password actual y veo que la que el usuario ponga como old sea la misma, sino no le doy autorización.

5- voy a la colleccion y utilizo el method updateOne, el cual esta explicado en change-password.



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
