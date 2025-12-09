# AWS Deployment Guide

## Current Status
✅ Docker installed
✅ Docker Compose installed
✅ Docker service enabled

## Next Steps

### 1. Prepare Environment Files

On your **local machine**, create the necessary environment files:

```bash
# Create .env file in project root
cp .env.example .env

# Create .env file in api folder
cp api/.env.example api/.env
```

Edit these files with your actual values (JWT secret, TMDB API key, etc.)

### 2. Transfer Files to EC2

From your **local machine**, transfer the project to EC2:

```bash
# Option 1: Using SCP
scp -i your-key.pem -r /path/to/Movie_website_Project ec2-user@your-ec2-ip:~/

# Option 2: Using Git (recommended)
# On EC2:
git clone https://github.com/websivu-projekti/movie-website-project.git
cd movie-website-project
git checkout paivitetty
```

### 3. Configure Environment on EC2

On **EC2 instance**:

```bash
cd ~/Movie_website_Project  # or movie-website-project if cloned from git

# Create .env file
nano .env
# Add:
FRONTEND_PORT=3000
REACT_APP_API_URL=http://YOUR_EC2_PUBLIC_IP:3001

# Create api/.env file
nano api/.env
# Copy content from api/.env.example and update values
```

### 4. Configure AWS Security Group

In AWS Console:
- Go to EC2 → Security Groups
- Edit inbound rules to allow:
  - Port 3000 (Frontend) - Source: 0.0.0.0/0 or your IP
  - Port 3001 (API) - Source: 0.0.0.0/0 or your IP
  - Port 22 (SSH) - Source: Your IP only

### 5. Build and Start Services

On **EC2 instance**:

```bash
# Add user to docker group (to run without sudo)
sudo usermod -aG docker ec2-user
# Log out and log back in for group changes to take effect

# Build and start in production mode
docker compose -f docker-compose.yml -f docker-compose.override.prod.yml up -d --build

# Check logs
docker compose logs -f

# Check running containers
docker compose ps
```

### 6. Verify Deployment

Access your application:
- Frontend: http://YOUR_EC2_PUBLIC_IP:3000
- API: http://YOUR_EC2_PUBLIC_IP:3001

### 7. Common Commands

```bash
# View logs
docker compose logs api
docker compose logs frontend
docker compose logs db

# Restart a service
docker compose restart api

# Stop all services
docker compose down

# Stop and remove volumes (⚠️ deletes database data)
docker compose down -v

# Update after code changes
git pull
docker compose -f docker-compose.yml -f docker-compose.override.prod.yml up -d --build
```

### 8. Database Backup (Important!)

```bash
# Backup database
docker exec postgres_db pg_dump -U netuser netdb > backup_$(date +%Y%m%d).sql

# Restore database
cat backup_20241209.sql | docker exec -i postgres_db psql -U netuser -d netdb
```

## Troubleshooting

### Containers won't start
```bash
docker compose logs
```

### Port already in use
```bash
# Check what's using the port
sudo lsof -i :3000
sudo lsof -i :3001
```

### Database connection issues
- Verify DB_HOST=db in api/.env
- Check database container is running: `docker compose ps db`

### Permission denied errors
```bash
sudo usermod -aG docker ec2-user
# Then log out and log back in
```

### Out of disk space
```bash
# Clean up Docker
docker system prune -a --volumes
```

## Production Best Practices

1. **Use HTTPS**: Set up nginx as reverse proxy with Let's Encrypt SSL
2. **Environment Variables**: Never commit .env files to git
3. **Database Backups**: Set up automated daily backups
4. **Monitoring**: Use CloudWatch for logs and metrics
5. **Auto-restart**: Services configured with `restart: unless-stopped`
6. **Resource Limits**: Configure memory limits in docker-compose
7. **Security**: 
   - Change default database passwords
   - Use strong JWT secret
   - Restrict security group rules to specific IPs when possible
