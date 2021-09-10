//Kate Allsebrook

function addImages(imageArray,base) {
/*
Adds all given images to the database. Each image must specify
the name, url, and privacy level.
Params: An array of JSON objects with name, url, and privacy specified
        The airtable base
*/
    imageArray.forEach((entry) => {
        base('Images').create([
            {
              "fields": {
                "Name": entry["name"],
                "Image": [
                  {
                    "url": entry["url"]
                  }
                ],
                "Privacy": entry["privacy"]
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

function getUploads(base, callback) {
/*
Returns all public entries in the database
Params: Airtable base
        A callback function
Returns: All public images
*/
  entries = []
  base('Images').select({
    filterByFormula: "NOT({Privacy} = 'private')"
    }).eachPage(function page(records, fetchNextPage) {

        records.forEach((record) => {
          entries.push({
            "name": record.get('Name'),
            "Image": record.get("Image")[0]["url"],
            "Privacy": record.get("Privacy")
          })
        });

        fetchNextPage()
        
      }, function done(err) {
        callback(entries)
        if (err) {
          console.error(err)
        }
        return
      })
}

function findByTextKey(textKey,base,callback) {
/*
Finds and returns public image objects given their name. This is a case-sensitive search. The name
parameter must match the Name field to be flagged as a match. All images with this name will
be returned if they are public
Params: The name (search key)
        Airtable base
        Callback function
Returns: A list of matching image objects
*/
  entries = []
  base('Images').select({
    filterByFormula: "NOT({Privacy} = 'private')"
    }).eachPage(function page(records, fetchNextPage) {

        records.forEach((record) => {
          if (record.get('Name').includes(textKey)) {
            entries.push({
              "name": record.get('Name'),
              "Image": record.get("Image")[0]["url"],
              "Privacy": record.get("Privacy")
            })
          }

        });
        

        fetchNextPage()
      
      }, function done(err) {
        callback(entries)
        if (err) {
          console.error(err)
        }
        return
      })
}

//Export
module.exports = {addImages, getUploads, findByTextKey};