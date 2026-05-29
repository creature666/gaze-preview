#!/usr/bin/env python3
"""Production-ready HTTP server with no-cache headers for development."""
import http.server
import socketserver
import os
import sys

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, format, *args):
        """Custom logging."""
        sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), format % args))

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3456

    # Change to script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    # Create server
    Handler = NoCacheHandler
    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"🚀 Server running at http://localhost:{port}/")
        print(f"📁 Serving from: {script_dir}")
        print(f"Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n✅ Server stopped")
            sys.exit(0)
