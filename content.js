chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "CatchImages"){
       

function urlToPromise(url) {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
    }
function guessImageMime(str){
    const regex = /^data:image\/(png|tiff|jpg|gif|jpeg|bmp);/;
let m;
var found;
if ((m = regex.exec(str)) !== null) {
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        found = match[1];
    }
    );
    return found;
}
return null;
}
    var imgs = document.getElementsByTagName('img');
    var i = imgs.length-1;
    var mtype ="";
    var zip = new JSZip();
    
    // Add an top-level, arbitrary text file with contents
    //zip.file("Hello.txt", "Hello World\n");
    
    // Generate a directory within the Zip file structure
    //var img = zip.folder("images");
    
    // Add a file to the directory, in this case an image with data URI as contents
    var regex = /^data:image\/(png|tiff|jpg|gif|jpeg|bmp);/;
    
    while(i>0){
        imgsrc = imgs[i].src;
        if(imgsrc.match("&redir=")){
            i--;
            continue;
        }
        if(imgsrc==""||imgsrc==null){
           imgsrc= imgs[i].getAttribute('data-src');
           if(imgsrc==""||imgsrc==null||imgsrc.match("&redir=")){
               i--;
            continue;
        }
        }
        //console.log(imgsrc);
        if(imgsrc.match(regex)){
           mtype = guessImageMime(imgsrc);
        }
        if(mtype==null){
            regex = /\/([^\/]*)$/;
            var temp= regex.exec(imgsrc)[1];
            regex = /^([^?]+)/;
            mtype= regex.exec(temp)[1];
    
        }
        else{
            regex = /\/([^\/]*)$/;
            var temp= regex.exec(imgsrc)[1];
            regex1 = /^([^?]+)/;
            var temphash= regex1.exec(temp)[1];
            regex2 = /^([^#]+)/gi;
            mtype = regex2.exec(temphash)[1];
    
        }
        if(!(mtype.endsWith(".svg")||mtype.endsWith(".jpg")||mtype.endsWith(".png")||mtype.endsWith(".jpeg")||mtype.endsWith(".gif")||mtype.endsWith(".bmp")))
            mtype = mtype+".jpg";
        
        //console.log(mtype);

        //mtype=imgsrc.files[0].type;
        zip.file("img"+i+mtype, urlToPromise(imgsrc), {base64:true});
        i--;
    }
            
    // Generate the zip file asynchronously
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // Force down of the Zip file
        saveAs(content, "archive.zip");
    });

    sendResponse({farewell: "goodbye"});
}
});