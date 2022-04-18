

function getmediainfojs(inputElement, callback) {
  inputElement = document.querySelector(inputElement),
    MediaInfoOutput = [];
  
  MediaInfo({ format: 'JSON' }, (mediainfo) => {
    inputElement.addEventListener('change', () => {
      onChangeFile(mediainfo);
      setTimeout(() => { 
        if(callback) callback(MediaInfoOutput);
      }, 3000);
    });
  });

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

        // SUPPORT AAC
        if ((
              MediaInfoOutput[i]['media']['track'][1]['@type'] === 'Audio' &&
              MediaInfoOutput[i]['media']['track'][1]['Format'] === 'AAC'
        ))
        {
          let audioElement = document.createElement('audio');
          audioElement.src = URL.createObjectURL(file);
          audioElement.onloadedmetadata = function() {
            MediaInfoOutput[i]['media']['track'][0]['Duration'] = String(audioElement.duration);
            MediaInfoOutput[i]['media']['track'][1]['Duration'] = String(audioElement.duration);
          };
          audioElement.remove();
        }

        // The maximum time is assigned to the general section.
        if ((
            MediaInfoOutput[i]['media']['track'][1]['@type'] === 'Video' &&
            MediaInfoOutput[i]['media']['track'][2]['@type'] === 'Audio'
        ))
        {
        
          let Media1Duration = MediaInfoOutput[i]['media']['track'][1]['Duration'];
          let Media2Duration = MediaInfoOutput[i]['media']['track'][2]['Duration'];
          if(Media1Duration > Media2Duration)
          {
            MediaInfoOutput[i]['media']['track'][0]['Duration'] = Media1Duration;
          } else {
            MediaInfoOutput[i]['media']['track'][0]['Duration'] = Media2Duration;
          }

        }
        
        MediaInfoOutput[i]['media']['filename'] = file.name;

      });
  }

  async function onChangeFile(mediainfo) {
    let file;
    if (inputElement.files.length >= 2) {
      for (let i = 0; i < inputElement.files.length; i++) {
        file = inputElement.files[i];
        if (file) {
          await get_file_info(mediainfo, file, i)
          if (i + 1 == inputElement.files.length) {
            return;
          }
        }
      }
    } else {
      file = inputElement.files[0];
      if (file) {
        await get_file_info(mediainfo, file);
      }
    }
  }
}