const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendNewUserEmail = async ({ to, tempPassword, name = "Employee" }) => {
    const subject = "Setup your official email account";

    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 24px;">
        <h2 style="color: #1e40af; text-align: center;">Welcome to Employee Management System</h2>
        <p style="font-size: 15px; color: #333;">Dear <b>${name}</b>,</p>
        <p style="font-size: 15px; color: #333;">
          Your account has been created by the HR team. You can now log in to your Employee Management System account using the credentials below:
        </p>
        <div style="margin: 16px 0; padding: 12px; background-color: #f3f4f6; border-radius: 8px;">
          <p style="margin: 6px 0;"><b>Email:</b> ${to}</p>
          <p style="margin: 6px 0;"><b>Temporary Password:</b> ${tempPassword}</p>
        </div>
        <p style="font-size: 14px; color: #333;">
          For security reasons, please log in and reset your password immediately after your first login.
        </p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="http://localhost:5173" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 500;">Go to Login</a>
        </div>
        <p style="margin-top: 20px; font-size: 13px; color: #777;">Best regards,<br><b>HR Department</b></p>
      </div>
    </div>
  `

    try {
        await transporter.sendMail({
            from: `<${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        return {
            success: true,
            statusCode : 201,
            message : "email sent successfully"
        }

        
    } catch (error) {
       throw error
    }
}

module.exports = {sendNewUserEmail};