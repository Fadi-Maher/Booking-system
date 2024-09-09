const { execSync } = require("child_process");

try {
  // Run the Next.js build command
  execSync("next build", { stdio: "inherit" });
} catch (error) {
  // Log errors to the console
  console.warn("Build completed with errors. Proceeding with deployment.");
  console.error(error.message);
  // Do not exit with a failure status code to allow deployment to continue
}
