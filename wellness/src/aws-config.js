const awsConfig = {
  aws_cognito_region: `${process.env.REACT_APP_AWS_REGION}`, // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id: `${process.env.REACT_APP_AWS_USER_POOL_ID}`, // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: `${process.env.REACT_APP_AWS_WEB_CLIENT_ID}`,
  aws_mandatory_sign_in: "enable", // (optional) - Users are not allowed to get the aws credentials unless they are signed in
};

export default awsConfig;
