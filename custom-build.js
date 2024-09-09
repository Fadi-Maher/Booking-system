const { execSync } = require("child_process");

const ignoreErrors = process.env.IGNORE_BUILD_ERRORS === "true";

try {
  execSync("next build", { stdio: "inherit" });
} catch (error) {
  if (ignoreErrors) {
    console.warn(
      "Build completed with errors, but proceeding with deployment."
    );
  } else {
    console.error("Build failed with errors.");
    console.error(error.message);
    process.exit(1); // Exit with a non-zero status code if not ignoring errors
  }
}
