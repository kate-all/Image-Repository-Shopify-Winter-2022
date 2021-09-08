//Kate Allsebrook

function addImages(imageArray,base) {
    
    imageArray.forEach((entry) => {
        base('Images').create([
            {
              "fields": {
                "Name": entry["name"],
                "Image": [
                  {
                    "url": entry.url
                  }
                ]
              }
            }],
             function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
          });
    })
    
    
}

//Export
module.exports = {addImages};