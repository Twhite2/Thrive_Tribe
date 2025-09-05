import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure email transporter
// In production, use a service like SendGrid, Mailchimp, or Amazon SES
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASSWORD || "password",
  },
});

export async function POST(request: Request) {
  try {
    const { 
      recipient, 
      subject, 
      templateType, 
      data 
    } = await request.json();

    if (!recipient || !subject || !templateType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate email content based on template type
    const emailContent = generateEmailContent(templateType, data);

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "Thrive Tribe <support@thrivetribe.com>",
      to: recipient,
      subject,
      html: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}

// Generate email content based on template type
function generateEmailContent(templateType: string, data: any) {
  switch (templateType) {
    case "assessment_results":
      return generateAssessmentResultsEmail(data);
    case "weekly_tips":
      return generateWeeklyTipsEmail(data);
    case "welcome":
      return generateWelcomeEmail(data);
    default:
      return generateDefaultEmail(data);
  }
}

// Email templates
function generateAssessmentResultsEmail(data: any) {
  const { name, score, level, recommendations } = data;

  let levelColor = "#3498db"; // Default blue
  if (level === "Low Stress") {
    levelColor = "#2ecc71"; // Green
  } else if (level === "High Stress") {
    levelColor = "#e74c3c"; // Red
  } else {
    levelColor = "#f39c12"; // Yellow/Orange for Moderate Stress
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { max-width: 120px; }
        h1 { color: #3498db; }
        .score-circle { 
          width: 100px; 
          height: 100px; 
          border-radius: 50%; 
          background: #f5f5f5;
          border: 5px solid ${levelColor}; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          margin: 0 auto;
          font-size: 24px;
          font-weight: bold;
        }
        .stress-level {
          color: ${levelColor};
          font-weight: bold;
          text-align: center;
          font-size: 18px;
          margin: 15px 0;
        }
        .recommendations { margin: 20px 0; }
        .recommendation-item { margin-bottom: 10px; }
        .button {
          display: inline-block;
          background-color: #3498db;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://www.example.com/logo.png" alt="Thrive Tribe Logo" class="logo">
          <h1>Your Assessment Results</h1>
        </div>
        
        <p>Hello ${name || "there"},</p>
        
        <p>Thank you for completing your mental wellbeing assessment. Here are your results:</p>
        
        <div class="score-circle">
          ${score}/40
        </div>
        
        <p class="stress-level">${level}</p>
        
        <p>Based on your responses, here are some personalized recommendations to support your wellbeing:</p>
        
        <div class="recommendations">
          ${recommendations
            .map(
              (rec: string) => `
              <div class="recommendation-item">
                • ${rec}
              </div>
            `
            )
            .join("")}
        </div>
        
        <p>Remember, small steps can lead to significant improvements in your mental wellbeing.</p>
        
        <div style="text-align: center;">
          <a href="https://www.thrivetribe.com/dashboard" class="button">View Your Full Results</a>
        </div>
        
        <p>If you have any questions or need support, feel free to reply to this email.</p>
        
        <p>Best regards,<br>The Thrive Tribe Team</p>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Thrive Tribe. All rights reserved.</p>
          <p>
            <a href="https://www.thrivetribe.com/privacy">Privacy Policy</a> | 
            <a href="https://www.thrivetribe.com/terms">Terms of Service</a> | 
            <a href="https://www.thrivetribe.com/unsubscribe">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateWeeklyTipsEmail(data: any) {
  const { name, tips } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { max-width: 120px; }
        h1 { color: #3498db; }
        .tip-item { 
          margin-bottom: 20px;
          padding: 15px;
          background-color: #f9f9f9;
          border-left: 4px solid #3498db;
        }
        .tip-title { 
          font-weight: bold;
          margin-bottom: 8px;
        }
        .button {
          display: inline-block;
          background-color: #3498db;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://www.example.com/logo.png" alt="Thrive Tribe Logo" class="logo">
          <h1>Your Weekly Wellness Tips</h1>
        </div>
        
        <p>Hello ${name || "there"},</p>
        
        <p>Here are your personalized wellness tips for the week:</p>
        
        <div class="tips">
          ${tips
            .map(
              (tip: any) => `
              <div class="tip-item">
                <div class="tip-title">${tip.title}</div>
                <p>${tip.content}</p>
              </div>
            `
            )
            .join("")}
        </div>
        
        <p>For more personalized content, visit your dashboard:</p>
        
        <div style="text-align: center;">
          <a href="https://www.thrivetribe.com/dashboard" class="button">Go to Dashboard</a>
        </div>
        
        <p>We hope these tips help you on your wellness journey!</p>
        
        <p>Best regards,<br>The Thrive Tribe Team</p>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Thrive Tribe. All rights reserved.</p>
          <p>
            <a href="https://www.thrivetribe.com/privacy">Privacy Policy</a> | 
            <a href="https://www.thrivetribe.com/terms">Terms of Service</a> | 
            <a href="https://www.thrivetribe.com/unsubscribe">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateWelcomeEmail(data: any) {
  const { name } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { max-width: 120px; }
        h1 { color: #3498db; }
        .step {
          margin: 20px 0;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 5px;
        }
        .step-number {
          display: inline-block;
          width: 30px;
          height: 30px;
          background-color: #3498db;
          color: white;
          border-radius: 50%;
          text-align: center;
          line-height: 30px;
          margin-right: 10px;
        }
        .button {
          display: inline-block;
          background-color: #3498db;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://www.example.com/logo.png" alt="Thrive Tribe Logo" class="logo">
          <h1>Welcome to Thrive Tribe!</h1>
        </div>
        
        <p>Hello ${name || "there"},</p>
        
        <p>Thank you for joining Thrive Tribe! We're excited to help you on your wellness journey. Here's how to get started:</p>
        
        <div class="step">
          <div class="step-number">1</div>
          <strong>Complete your assessment</strong>
          <p>Take our quick assessment to help us understand your current wellbeing state and needs.</p>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <strong>Explore your personalized recommendations</strong>
          <p>Based on your assessment, we'll provide tailored content and strategies just for you.</p>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <strong>Track your progress</strong>
          <p>Regularly check in and see how your wellbeing improves over time.</p>
        </div>
        
        <div style="text-align: center;">
          <a href="https://www.thrivetribe.com/assessment" class="button">Take Your Assessment</a>
        </div>
        
        <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
        
        <p>We're happy to have you in our tribe!</p>
        
        <p>Best regards,<br>The Thrive Tribe Team</p>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Thrive Tribe. All rights reserved.</p>
          <p>
            <a href="https://www.thrivetribe.com/privacy">Privacy Policy</a> | 
            <a href="https://www.thrivetribe.com/terms">Terms of Service</a> | 
            <a href="https://www.thrivetribe.com/unsubscribe">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateDefaultEmail(data: any) {
  const { name, content } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .logo { max-width: 120px; }
        h1 { color: #3498db; }
        .content { margin: 20px 0; }
        .button {
          display: inline-block;
          background-color: #3498db;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://www.example.com/logo.png" alt="Thrive Tribe Logo" class="logo">
          <h1>Thrive Tribe</h1>
        </div>
        
        <p>Hello ${name || "there"},</p>
        
        <div class="content">
          ${content || ""}
        </div>
        
        <p>Best regards,<br>The Thrive Tribe Team</p>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Thrive Tribe. All rights reserved.</p>
          <p>
            <a href="https://www.thrivetribe.com/privacy">Privacy Policy</a> | 
            <a href="https://www.thrivetribe.com/terms">Terms of Service</a> | 
            <a href="https://www.thrivetribe.com/unsubscribe">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
