const ForgotPasswordTemplate = (token: string) => {
  return `  <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
    <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p style="margin-bottom: 20px;">You've requested to reset your password. Click the link below to proceed:</p>
      <p style="margin-bottom: 20px;"><a href="http://localhost:5173/reset-password?token=${token}" style="color: #007bff; text-decoration: none;">Reset Password</a></p>
      <p style="margin-bottom: 20px;">This link will expire in <strong>10 minutes</strong>.</p>
      <p style="margin-bottom: 20px;">If you didn't request a password reset, you can safely ignore this email.</p>
    </div>
  </div>`;
};
export default ForgotPasswordTemplate;
