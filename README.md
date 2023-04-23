# Appearition Model Viewer: NextJs

## Moudle-ContentLib

A sample project demostrating how to use the content libray module for managing assets (3d models, images, videos or any other form of media).

### Getting Started

1. Clone the project
2. Open `Appearition.js` file in `utils` folder and enter the following parameters:

- **auth token**: The auth token you created while registering the application.
- **tenant**: The tenant name of your developer account. This is the name you used when you signed up.
- **channel id / project id**: The channel id or project id in the settings page.

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. The functions with APIs for uploading and retrieving assets are in `utils/Appearition.js` file. You can use these functions to integrate the content library module in your application.

### Troubleshooting

1. Make sure you have registered an application on your Appearition platform account
2. Make sure you generate an API Token for your registered application
3. Assign the following roles to the registered application:
   - InternalContentLibraryCreator
   - InternalContentLibraryEditorAll
   - InternalContentLibraryViewerAll
4. Assign your channel to the registered application.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
