#!/usr/bin/env python3
"""
Startup script for the AI service
"""
import subprocess
import sys
import time
import signal
import os

def start_ai_service():
    """Start the AI service"""
    try:
        print("Starting AI service on port 8000...")
        process = subprocess.Popen([
            sys.executable, "simple_main.py"
        ], cwd=os.path.dirname(__file__))
        
        # Give it a moment to start
        time.sleep(2)
        
        # Check if process is still running
        if process.poll() is None:
            print("AI service started successfully")
            return process
        else:
            print("AI service failed to start")
            return None
            
    except Exception as e:
        print(f"Error starting AI service: {e}")
        return None

def signal_handler(sig, frame):
    """Handle shutdown signals"""
    print("\nShutting down AI service...")
    sys.exit(0)

if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    process = start_ai_service()
    if process:
        try:
            process.wait()
        except KeyboardInterrupt:
            print("\nShutting down...")
            process.terminate()
            process.wait()