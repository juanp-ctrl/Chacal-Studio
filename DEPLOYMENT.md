# Deployment Guide

This project is configured for continuous deployment using **AWS Amplify**.

## Prerequisites

- **AWS Account** with access to AWS Amplify.
- **Repository Access**: You must have admin access to the GitHub repository to connect it to Amplify.

## Connect Repository to AWS Amplify

1.  **Log in** to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home).
2.  Click **"New app"** -> **"Host web app"**.
3.  Select **GitHub** (or your Git provider) and authorize AWS Amplify to access your account.
4.  Select the **repository** (`chacal-studio`) and the **branch** (`main`) to deploy.
5.  **Build settings**: Amplify should automatically detect the `amplify.yml` file in the project root (once added). Ensure it is selected.
6.  **Environment Variables**: Add the required environment variables (see [Environment Variables](#environment-variables) below).
7.  Click **"Save and deploy"**.

## Deployment Workflow

### Production

- **Branch**: `main`
- **Trigger**: Every push to the `main` branch triggers a production deployment.
- **URL**: Your production URL (e.g., `https://main.d...amplifyapp.com` or your custom domain).

### Integration / Preview

- **Branch**: `develop`
- **Trigger**: Pushes to `develop` trigger a deployment to the integration environment.
- **Pull Requests**: (Optional) Enable "Web Previews" in Amplify settings to automatically build and deploy Pull Requests to temporary URLs.

## Build Specification

The project uses an `amplify.yml` file in the root directory to define the build process. This ensures that the build environment matches our local standards (pnpm, linting, build).

## Environment Variables

The following environment variables are **REQUIRED** for the application to build and run correctly.

1.  Go to **App settings** -> **Environment variables** in the Amplify Console.
2.  Click **Manage variables**.
3.  Add the following key-value pairs:

| Variable Key           | Description                                                                               |
| :--------------------- | :---------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | API key for [Resend](https://resend.com) email service.                                   |
| `TURNSTILE_SITE_KEY`   | Public Site Key for [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/). |
| `TURNSTILE_SECRET_KEY` | Secret Key for Cloudflare Turnstile server-side validation.                               |

**Note:** Never commit actual secrets to the repository. Use `.env.example` as a reference for local development, and copy it to `.env.local` with your real keys.
