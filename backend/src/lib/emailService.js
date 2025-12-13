import nodemailer from 'nodemailer';

export const generateVerificationToken = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
};

// Main email function with multiple fallbacks
export const sendVerificationEmail = async (email, verificationToken) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    
    console.log(`Attempting to send verification email to: ${email}`);
    console.log(`Verification URL: ${verificationUrl}`);

    // Try multiple SMTP configurations
    const configs = [
        // Configuration 1: Gmail with OAuth2 (recommended)
        {
            name: 'Gmail OAuth2',
            transporter: nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.GMAIL_USER,
                    clientId: process.env.GMAIL_CLIENT_ID,
                    clientSecret: process.env.GMAIL_CLIENT_SECRET,
                    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                },
            })
        },
        // Configuration 2: Gmail with App Password (port 587)
        {
            name: 'Gmail App Password (587)',
            transporter: nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
        },
        // Configuration 3: Gmail with App Password (port 465)
        {
            name: 'Gmail App Password (465)',
            transporter: nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
        },
        // Configuration 4: Simple Gmail without strict TLS
        {
            name: 'Gmail Simple',
            transporter: nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
                secure: false,
                tls: {
                    rejectUnauthorized: false
                },
                debug: true,
                logger: true
            })
        }
    ];

    const mailOptions = {
        from: {
            name: 'VartalApp',
            address: process.env.GMAIL_USER
        },
        to: email,
        subject: 'Verify Your Email Address - VartalApp',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
                    .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px; }
                    .button { background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                    .code { background: #f0f0f0; padding: 10px; border-radius: 5px; margin: 10px 0; font-family: monospace; word-break: break-all; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>VartalApp</h1>
                    </div>
                    <div class="content">
                        <h2>Verify Your Email Address</h2>
                        <p>Hello,</p>
                        <p>Thank you for signing up for VartalApp! Please click the button below to verify your email address:</p>
                        <p style="text-align: center;">
                            <a href="${verificationUrl}" class="button">Verify Email Address</a>
                        </p>
                        <p>Or copy and paste this link in your browser:</p>
                        <div class="code">${verificationUrl}</div>
                        <p>This verification link will expire in 24 hours.</p>
                        <p>If you didn't create an account with us, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>Thank you,<br>VartalApp Team</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    // Try each configuration until one works
    for (const config of configs) {
        try {
            console.log(`Trying email configuration: ${config.name}`);
            
            // Verify the transporter
            await config.transporter.verify();
            console.log(`✓ ${config.name} - Transporter verified successfully`);

            // Send the email
            const result = await config.transporter.sendMail(mailOptions);
            console.log(`✓ Email sent successfully using ${config.name}`);
            console.log(`✓ Message ID: ${result.messageId}`);
            
            return result;
        } catch (error) {
            console.log(`✗ ${config.name} failed:`, error.message);
            // Continue to next configuration
        }
    }

    // If all configurations fail
    throw new Error('All email configurations failed. Please check your email settings.');
};

// Simple console-based email for development
export const sendVerificationEmailDev = async (email, verificationToken) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    
    console.log('\n' + '='.repeat(80));
    console.log('📧 DEVELOPMENT MODE: Email Verification');
    console.log('='.repeat(80));
    console.log(`To: ${email}`);
    console.log(`Verification URL: ${verificationUrl}`);
    console.log('='.repeat(80) + '\n');
    
    // In development, we can just log the verification URL
    return { message: 'Email logged to console in development mode' };
};