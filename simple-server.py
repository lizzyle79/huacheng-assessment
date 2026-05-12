#!/usr/bin/env python3
"""
华诚测评系统 - 简单HTTP服务器
解决本地文件访问的CORS问题
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = "dist"

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # 添加CORS头，允许本地访问
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def log_message(self, format, *args):
        pass  # 减少日志输出

def start_server():
    # 切换到项目目录
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # 确保dist目录存在
    if not os.path.exists(DIRECTORY):
        print(f"❌ 错误：找不到 {DIRECTORY} 文件夹")
        input("按回车键退出...")
        return

    # 切换到dist目录
    os.chdir(DIRECTORY)

    print(f"🌟 华诚测评系统服务器")
    print(f"📱 访问地址: http://localhost:{PORT}")
    print(f"🎯 关闭此窗口停止服务器")
    print("=" * 60)

    try:
        # 创建服务器
        with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
            print(f"✅ 服务器启动成功！")
            print(f"📱 正在自动打开浏览器...")

            # 自动打开浏览器
            try:
                webbrowser.open(f'http://localhost:{PORT}')
                print(f"✅ 浏览器已打开")
            except:
                print(f"💡 请手动访问: http://localhost:{PORT}")

            print("=" * 60)
            print(f"🎯 如果浏览器显示空白，请:")
            print(f"   1. 确认访问地址是: http://localhost:{PORT}")
            print(f"   2. 按F12查看控制台错误信息")
            print(f"   3. 尝试刷新页面 (F5)")
            print("=" * 60)

            # 启动服务器
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n👋 服务器已停止")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ 端口 {PORT} 已被占用")
            print(f"💡 请关闭其他使用此端口的程序")
        else:
            print(f"❌ 错误: {e}")
        input("按回车键退出...")

if __name__ == "__main__":
    start_server()
