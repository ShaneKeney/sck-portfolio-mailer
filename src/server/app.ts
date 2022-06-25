import 'module-alias/register';
import createServer, { startServer } from "@services/server";

// Wrapper to leveraage async/await
const app = async () => {
  // Create Express app setup
  const app = await createServer()

  // Start Express server with above app configuration
  await startServer(app)
}

app()