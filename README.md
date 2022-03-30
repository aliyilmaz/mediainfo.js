# mediainfo.js
mediainfo.js serves to present a useful composite display of the most relevant technical and tag data for video and audio files.

## The MediaInfo data display includes:
* **Container:** format, profile, commercial name of the format, duration, overall bit rate, writing application and library, title, author, director, album, track number, date, duration...
* **Video:** format, codec id, aspect, frame rate, bit rate, color space, chroma subsampling, bit depth, scan type, scan order...
* **Audio:** format, codec id, sample rate, channels, bit depth, language, bit rate...
* **Text:** format, codec id, language of subtitle...
* **Chapters:** count of chapters, list of chapters...
## MediaInfo analyticals include:
* **Container:** MPEG-4, QuickTime, Matroska, AVI, MPEG-PS (including unprotected DVD), MPEG-TS (including unprotected Blu-ray), MXF, GXF, LXF, WMV, FLV, Real...
* **Tags:** Id3v1, Id3v2, Vorbis comments, APE tags...
* **Video:** MPEG-1/2 Video, H.263, MPEG-4 Visual (including DivX, XviD), H.264/AVC, H.265/HEVC, FFV1...
* **Audio:** MPEG Audio (including MP3), AC3, DTS, AAC, Dolby E, AES3, FLAC...
* **Subtitles:** CEA-608, CEA-708, DTVCC, SCTE-20, SCTE-128, ATSC/53, CDP, DVB Subtitle, Teletext, SRT, SSA, ASS, SAMI...

## MediaInfo features include:
* Read many video and audio file formats
* View information in different formats (text, sheet, tree, HTML... As this repository targets web projects, it produces JSON output.)
* Customise these viewing formats (By interfering with the script.js file.)

## Use

Add it to your project.

```html
<script src='mediainfo.min.js'></script>
<script  src="script.js"></script>
```

Run it.

```javascript
<script>
getmediainfojs('#fileinput', (response) => {
    console.log(response);
    document.querySelector('#output').value = JSON.stringify(response, null, 2);
    console.log('or code');
});
</script>
```

## License:

`MediaInfoModule.wasm`, `script.js` and `mediainfo.min.js` are Open Source software (BSD-style license). The changes made by Ali Yılmaz are licensed as open source and free under the General Public License version 3 ([GPLv3 license.](https://github.com/aliyilmaz/mediainfo.js/blob/master/license.md))