# Dockerfile
FROM nginx:alpine

# Xóa cấu hình mặc định
RUN rm -f /etc/nginx/conf.d/default.conf

# Sao chép file cấu hình nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY bardo.conf /etc/nginx/conf.d/bardo.conf

# Sao chép source code website
COPY src/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Khởi động nginx
CMD ["nginx", "-g", "daemon off;"] 