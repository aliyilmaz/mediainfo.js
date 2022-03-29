const fileinput = document.getElementById('fileinput');
let MediaInfoOutput = [];

function get_file_info(mediainfo, file, i=0) {
  let getSize = () => file.size;
  let readChunk = (chunkSize, offset) =>
    new Promise((resolve) => {
      let reader = new FileReader()
      reader.onload = (event) => {
        resolve(new Uint8Array(event.target.result))
      }
      reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
    });

  return mediainfo
    .analyzeData(getSize, readChunk)
    .then((result) => {
      MediaInfoOutput[i] = JSON.parse(result);
      delete MediaInfoOutput[i]['creatingLibrary'];
    });
}

async function onChangeFile(mediainfo) {
  let file;
  if (fileinput.files.length >= 2) {
    for (let i = 0; i < fileinput.files.length; i++) {
      file = fileinput.files[i];
      if (file) {
        await get_file_info(mediainfo, file, i)
        if (i + 1 == fileinput.files.length) {
          return;
        }
      }
    }
  } else {
    file = fileinput.files[0]
    if (file) {
      await get_file_info(mediainfo, file)
    }
  }
}

