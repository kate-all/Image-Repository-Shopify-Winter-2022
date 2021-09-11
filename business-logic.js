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

        //Add image object to list
        records.forEach((record) => {
          entries.push({
            "Name": record.get('Name'),
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
Params: The text (search key)
        Airtable base
        Callback function
Returns: A list of matching image objects
*/
  entries = []
  base('Images').select({
    filterByFormula: "NOT({Privacy} = 'private')"
    }).eachPage(function page(records, fetchNextPage) {

        //Find entries with the keyword in its Name
        records.forEach((record) => {
          if (record.get('Name').includes(textKey)) {
            entries.push({
              "Name": record.get('Name'),
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

function plant(axios,base) {
/*
Adds a random plant photo, with the privacy as public
Params: Axios (requests module)
        Airtable base
*/

  //Call Unsplash API
  axios.get("https://api.unsplash.com/photos/random?query=plant&client_id=-5Omud4oq74Iwk0mDK0_mkpw281ZacDV2nSNim7l6do")
  .then((res) => {

    image = {"name": "",
              "url": res.data.urls.full,
              "privacy": "public"}
    if (res.data.description == null) {
      image.name = res.data.alt_description
    }
    else {
      image.name = res.data.description
    }

    imageArray = [image]

    //Add random plant image to database
    addImages(imageArray,base)

  })
  .catch((err) => {
    console.log(err)
  })
}

//Export
module.exports = {addImages, getUploads, findByTextKey, plant};