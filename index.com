<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Architect AI - Perfect 3D Render Engine</title>
    <style>
        * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
        body { background: #070a13; color: white; padding: 20px; display: flex; justify-content: center; min-height: 100vh; margin: 0; }
        .app-card { background: #0f172a; padding: 30px; border-radius: 24px; width: 100%; max-width: 480px; border: 1px solid #1e293b; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); }
        .brand { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 1px solid #1e293b; padding-bottom: 15px; }
        .logo { font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #38bdf8, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 0.5px; }
        .badge { background: rgba(56, 189, 248, 0.1); color: #38bdf8; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; border: 1px solid rgba(56, 189, 248, 0.2); }
        h1 { font-size: 22px; font-weight: 700; margin: 0 0 8px 0; text-align: center; color: #f8fafc; }
        .subtitle { color: #64748b; font-size: 13px; text-align: center; margin-bottom: 25px; }
        .upload-label { display: block; border: 2px dashed #334155; padding: 35px 20px; border-radius: 16px; background: rgba(15, 23, 42, 0.6); text-align: center; cursor: pointer; transition: 0.3s; margin-bottom: 20px; }
        .upload-label:hover { border-color: #38bdf8; background: rgba(56, 189, 248, 0.02); }
        .magic-box { display: none; margin-bottom: 20px; }
        .magic-btn { width: 100%; background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(96, 165, 250, 0.1)); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); padding: 12px; border-radius: 12px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .magic-btn:hover { border-color: #38bdf8; background: rgba(56, 189, 248, 0.2); }
        .input-group { text-align: left; margin-bottom: 20px; }
        label { color: #94a3b8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        textarea { width: 100%; height: 85px; background: #020617; color: white; border: 1px solid #1e293b; border-radius: 12px; padding: 12px; margin-top: 8px; font-size: 13px; outline: none; resize: none; line-height: 1.5; }
        textarea:focus { border-color: #38bdf8; }
        
        /* Sliders Styling */
        .slider-group { text-align: left; margin-bottom: 20px; }
        .slider-label { display: flex; justify-content: space-between; align-items: center; }
        .slider-val { color: #38bdf8; font-weight: bold; font-size: 12px; }
        input[type="range"] { width: 100%; accent-color: #38bdf8; margin: 8px 0; cursor: pointer; }

        .render-btn { width: 100%; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; padding: 16px; font-size: 15px; font-weight: 700; border-radius: 12px; cursor: pointer; box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.4); }
        .render-btn:hover { background: linear-gradient(135deg, #1d4ed8, #1e40af); }
        .render-btn:disabled { background: #334155; color: #64748b; cursor: not-allowed; box-shadow: none; }
        .output-box { display: none; margin-top: 25px; border-top: 1px solid #1e293b; padding-top: 20px; text-align: left; }
        .img-wrapper { position: relative; border-radius: 14px; overflow: hidden; border: 1px solid #334155; margin-top: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); background: #020617; }
        .img-wrapper img { width: 100%; height: auto; max-height: 350px; object-fit: contain; display: block; margin: 0 auto; }
        .status-text { color: #38bdf8; font-size: 13px; font-weight: 600; text-align: center; margin-top: 10px; display: block; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { opacity: 0.6; } 5
