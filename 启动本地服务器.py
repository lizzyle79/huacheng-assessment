#!/usr/bin/env python3
"""
华诚测评系统 - 简单本地服务器
双击此文件启动，然后在浏览器中访问 http://localhost:8000
"""
import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # 静默模式，减少输出

def start_server():
    # 切换到dist目录
    os.chdir('dist')

    print(f"🚀 华诚测评系统本地服务器启动中...")
    print(f"📱 访问地址: http://localhost:{PORT}")
    print(f"🌐 按Ctrl+C停止服务器")
    print("="*50)

    # 自动打开浏览器
    try:
        webbrowser.open(f'http://localhost:{PORT}')
        print("✅ 浏览器已自动打开")
    except:
        print("💡 请手动在浏览器中打开: http://localhost:{PORT}")

    print("="*50)
    print("🎯 关闭Claude后仍可继续使用！")

    # 启动服务器
    try:
        with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
            print(f"✅ 服务器已启动在端口 {PORT}")
            print("📝 使用说明:")
            print("   - 完成所有6个关卡测评")
            print("   - 查看最终评估报告")
            print("   - 3个工作日内邮件通知录用结果")
            print("="*50)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 服务器已停止")
    except OSError as e:
        print(f"❌ 端口{PORT}被占用，请先关闭其他使用该端口的程序")

if __name__ == "__main__":
    start_server()
