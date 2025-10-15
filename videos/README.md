# Video Files Directory

This directory contains the local video files for the GAMABA Digital Portfolio website.

## Required Video Files

Place your webinar video files in this directory with the following names:

- `gamaba-webinar.mp4` - Main video file (MP4 format)
- `gamaba-webinar.webm` - WebM format for better browser compatibility
- `gamaba-webinar.ogg` - OGG format for older browser support

## Video Specifications

### Recommended Settings:
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Frame Rate**: 30fps
- **Duration**: 30-60 minutes (typical webinar length)
- **File Size**: Keep under 500MB for web delivery

### Format Support:
- **MP4**: Primary format (H.264 codec recommended)
- **WebM**: Secondary format for Chrome/Firefox
- **OGG**: Fallback format for older browsers

## How to Add Your Video

1. **Record your webinar** using your preferred recording software
2. **Export the video** in the required formats (MP4, WebM, OGG)
3. **Place the files** in this `videos/` directory
4. **Test the video** by opening `index.html` in your browser

## Alternative: YouTube Embed

If you prefer to use YouTube instead of local files:

1. Upload your video to YouTube
2. Get the video ID from the YouTube URL
3. In `index.html`, uncomment the iframe section
4. Replace `YOUR_VIDEO_ID` with your actual YouTube video ID
5. Comment out the local video player section

## File Structure

```
videos/
├── gamaba-webinar.mp4      # Main video file
├── gamaba-webinar.webm     # WebM format
├── gamaba-webinar.ogg      # OGG format
└── README.md               # This file
```

## Troubleshooting

- **Video not playing**: Check file paths and formats
- **Large file size**: Consider compressing the video
- **Browser compatibility**: Ensure all three formats are provided
- **Loading issues**: Check file permissions and server configuration
