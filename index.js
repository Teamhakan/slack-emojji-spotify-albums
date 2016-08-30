// Dependencies
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');
const request = require('request');
var mkdirp = require('mkdirp');
var spotifyApi = new SpotifyWebApi();


// just a helper to remove all in a sentnce
String.prototype.replaceAll = function(search, replacement) {
    return this.split(search).join(replacement)
};
//Remove chars thats not allowed in slack emojji
const rename = (string) => string
.toLowerCase()
.replaceAll(' ','-')
.replaceAll('(','')
.replaceAll(')','')
.replaceAll(',','')
.replaceAll('å','a')
.replaceAll('ä','a')
.replaceAll('ö','o')
.replaceAll('.','')
.replaceAll('!','')

//Download to file
const download = (uri, filename, callback) => {
  request.head(uri, (err, res, body) =>{
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
//3H7Ez7cwaYw4L3ELy4v3Lc is id of an artist
// This is used to get all albums
// d.images[d.images.length-1] is used bcuz the last image is the smalest 64px
//
//
mkdirp('./images/', (err) =>{ 
  spotifyApi.getArtistAlbums('3H7Ez7cwaYw4L3ELy4v3Lc')
  .then((data) =>{
    data.body.items.forEach(d =>
      download(d.images[d.images.length-1].url, `./images/${rename(d.name)}.jpeg`,
       () => console.log(`done with ${d.name}`))
    )
  },  console.error);
});
