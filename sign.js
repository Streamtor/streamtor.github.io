exports.default = async function (configuration) {
  const CERTIFICATE_NAME = process.env.WINDOWS_SIGN_CERTIFICATE_NAME;
  const TOKEN_PASSWORD = process.env.WINDOWS_SIGN_TOKEN_PASSWORD;

  require("child_process").execSync(
    `your command here ${CERTIFICATE_NAME} ${TOKEN_PASSWORD}`,
    {
      stdio: "inherit",
    }
  );
};
