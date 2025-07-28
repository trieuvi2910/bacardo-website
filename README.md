# Bardo - Docker Deployment

Website mẫu được xây dựng với Docker và Nginx, tối ưu hóa cho hiệu suất và khả năng mở rộng.

## 🚀 Tính năng

- ✅ Docker containerization
- ✅ Nginx web server
- ✅ Responsive design
- ✅ Modern UI/UX
- ✅ Performance optimized
- ✅ Mobile-first approach
- ✅ Smooth animations
- ✅ Form validation
- ✅ Notification system

## 📁 Cấu trúc dự án

```
bardo-project/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .dockerignore
├── env.example
├── Makefile
├── README.md
├── src/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── assets/
└── scripts/
    ├── build.sh
    ├── deploy.sh
    └── start.sh
```

## 🛠️ Cài đặt và chạy

### Yêu cầu hệ thống
- Docker
- Docker Compose

### Khởi động lần đầu

1. **Clone hoặc tạo project**
```bash
git clone <your-repo>
cd bardo-project
```

2. **Copy environment file**
```bash
cp env.example .env
```

3. **Build và start**
```bash
make build
make start
```

4. **Truy cập website**
```
http://localhost:80
```

### Development workflow

```bash
# Chế độ development
make dev

# Xem logs
make logs

# Restart khi có thay đổi
make restart
```

### Production deployment

```bash
# Deploy lên production
make deploy

# Hoặc sử dụng script trực tiếp
./scripts/deploy.sh production
```

## 📋 Các lệnh có sẵn

| Lệnh | Mô tả |
|------|-------|
| `make build` | Build Docker image |
| `make start` | Khởi động containers |
| `make stop` | Dừng containers |
| `make restart` | Restart containers |
| `make logs` | Xem logs |
| `make clean` | Dọn dẹp containers và images |
| `make deploy` | Deploy lên production |
| `make dev` | Khởi động development environment |

## 🔧 Cấu hình

### Environment Variables

Tạo file `.env` từ `env.example`:

```bash
# Database
DB_ROOT_PASSWORD=strongpassword
DB_NAME=website_db
DB_USER=website_user
DB_PASSWORD=userpassword

# Application
NODE_ENV=production
PORT=3000

# Domain
DOMAIN=bardo.com

### Nginx Configuration

File `nginx.conf` đã được tối ưu hóa với:
- Gzip compression
- Static file caching
- Security headers
- Performance optimizations

## 🎨 Customization

### Thay đổi nội dung

1. **HTML**: Chỉnh sửa `src/index.html`
2. **CSS**: Chỉnh sửa `src/css/style.css`
3. **JavaScript**: Chỉnh sửa `src/js/script.js`

### Thay đổi cấu hình Docker

1. **Dockerfile**: Chỉnh sửa `Dockerfile`
2. **Docker Compose**: Chỉnh sửa `docker-compose.yml`
3. **Nginx**: Chỉnh sửa `nginx.conf`

## 📊 Performance

Website được tối ưu hóa với:
- ✅ Gzip compression
- ✅ Static file caching
- ✅ Minified assets
- ✅ Optimized images
- ✅ Lazy loading
- ✅ CDN ready

## 🔒 Security

- ✅ HTTPS ready
- ✅ Security headers
- ✅ Input validation
- ✅ XSS protection
- ✅ CSRF protection

## 📱 Responsive Design

Website hoạt động tốt trên:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Mobile (480px)

## 🚀 Deployment

### Local Development
```bash
make dev
```

### Staging
```bash
./scripts/deploy.sh staging
```

### Production
```bash
make deploy
```

## 📈 Monitoring

### Logs
```bash
make logs
```

### Container Status
```bash
docker-compose ps
```

### Resource Usage
```bash
docker stats
```

## 🔄 CI/CD

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          make build
          make deploy
```

## 🐛 Troubleshooting

### Container không start
```bash
# Kiểm tra logs
docker-compose logs

# Kiểm tra port
netstat -tulpn | grep :80
```

### Permission issues
```bash
# Chạy với sudo (Linux/Mac)
sudo make start

# Hoặc thêm user vào docker group
sudo usermod -aG docker $USER
```

### Build fails
```bash
# Clean và rebuild
make clean
make build
```

### Static files (CSS/JS) không load được (404 error)
```bash
# Vấn đề: Nginx sử dụng cấu hình mặc định thay vì cấu hình tùy chỉnh
# Giải pháp: Đã được fix trong Dockerfile và nginx.conf

# Nếu gặp lại, rebuild container:
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📞 Support

- 📧 Email: info@bardo.com
- 📱 Phone: +84 123 456 789
- 🌐 Website: https://bardo.com

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🤝 Contributing

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

---

**Built with ❤️ and Docker** 