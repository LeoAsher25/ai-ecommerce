# System Architecture Document: Top xe đạp E-commerce Platform

- **Version:** 1.0
- **Date:** July 10, 2025
- **Author:** Fred, System Architect

## Introduction

This document provides the comprehensive system architecture for the "Top xe đạp" e-commerce platform. The system is designed as a modern, scalable, and maintainable application with clear separation of concerns between frontend, backend, and infrastructure components.

For detailed information on specific aspects of the architecture, please refer to the following sharded documents:

- **[Technology Stack](tech-stack.md)** - Detailed technology choices and configurations
- **[Project Structure](project-structure.md)** - Complete directory structure and organization
- **[API Reference](api-reference.md)** - Complete API documentation and endpoints
- **[Data Models](data-models.md)** - Database schemas and data structures
- **[Environment Variables](environment-vars.md)** - Configuration and environment setup
- **[Component View](component-view.md)** - Architectural patterns and component design
- **[Sequence Diagrams](sequence-diagrams.md)** - System workflows and interactions
- **[Operational Guidelines](operational-guidelines.md)** - Development standards and best practices

## System Overview

The platform consists of three main applications:

- **Frontend (ecommerce-fe)**: Next.js-based customer-facing application
- **Admin Panel (ecommerce-admin)**: Next.js-based administrative interface
- **Backend API (ecommerce-be)**: NestJS-based REST API service

## System Architecture

### High-Level Architecture

```plaintext
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Admin Panel   │    │   Backend API   │
│   (Next.js)     │    │   (Next.js)     │    │   (NestJS)      │
│                 │    │                 │    │                 │
│ - Customer UI   │    │ - Admin UI      │    │ - REST API      │
│ - Shopping Cart │    │ - Product Mgmt  │    │ - Authentication│
│ - Checkout      │    │ - Order Mgmt    │    │ - File Upload   │
│ - User Account  │    │ - User Mgmt     │    │ - Email Service │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Infrastructure │
                    │                 │
                    │ - MongoDB       │
                    │ - AWS S3        │
                    │ - Nginx         │
                    │ - Docker        │
                    └─────────────────┘
```

### Backend Module Structure

The backend follows a modular architecture with clear separation of concerns:

```plaintext
src/
├── modules/
│   ├── user/              # User management
│   ├── product/           # Product catalog
│   ├── product-category/  # Category management
│   ├── order/            # Order processing
│   ├── product-feedback/ # Reviews and ratings
│   ├── static-page/      # Content management
│   ├── file/             # File upload service
│   ├── image/            # Image processing
│   └── otp/              # One-time passwords
├── auth/                 # Authentication & authorization
├── common/               # Shared utilities and decorators
└── configs/              # Configuration management
```

## Infrastructure and Deployment Overview

### Development Environment

- **Local Development**: Docker Compose for all services
- **Database**: MongoDB running in Docker container
- **File Storage**: Local file system (development)
- **Email**: Ethereal email for testing

### Production Environment

- **Frontend**: Vercel deployment
- **Admin Panel**: Vercel deployment
- **Backend**: Docker containers on cloud platform
- **Database**: MongoDB Atlas
- **File Storage**: AWS S3
- **Email**: Production SMTP service
- **CDN**: Vercel Edge Network

### Docker Configuration

```yaml
# docker-compose.yml
version: "3.8"
services:
  backend:
    build: ./ecommerce-be
    ports:
      - "3001:3001"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/ecommerce
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## Key Reference Documents

- **[Frontend Architecture](font-end-architecture.md)** - Detailed frontend technical architecture
- **[UI/UX Specification](front-end-spec.md)** - Design and user experience specifications
- **[Product Requirements Document](prd.md)** - Product features and requirements
- **[API Documentation](api-reference.md)** - Complete API endpoint documentation
- **[Deployment Guide](deployment.md)** - Infrastructure and deployment procedures

## Change Log

| Change  | Date          | Version | Description                   | Author |
| :------ | :------------ | :------ | :---------------------------- | :----- |
| Initial | July 10, 2025 | 1.0     | Initial architecture document | Fred   |
