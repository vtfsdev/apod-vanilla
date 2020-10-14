var apod = {

    //Create a random date
    randomDate: function(start, end) {
        //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
        let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
        //Format the date
        let d = date.getDate();
        let m = date.getMonth() + 1; //In JS months start at 0
        let y = date.getFullYear();
    
        //Change the month and day strings so that they match the documented format.
        if(m < 10){
        m = '0'+m
        }
    
        if(d < 10){
        d = '0'+d
        }
    
        return `${y}-${m}-${d}`;
    },
    //Injects the results of the API call into the DOM
    buildDOM: function(result) {

        //$("#apodTitle").text(result.title);             // jQuery equivalent of below
        //document.getElementById("apodTitle").innerHTML = result.title;
        document.querySelector("#apodTitle").innerHTML = result.title;

        if(result.media_type === 'video') {
            //$("#apodImage").hide();
            document.querySelectorAll("#apodImage").forEach(apodImage => { apodImage.style.display = "none" })

            //$("#apodVideo > iframe").attr("src", result.url).show();
            document.querySelector("#apodVideo > iframe").setAttribute("src", result.url);
            document.querySelector("#apodVideo > iframe").style.display = "block";
        }
        else{
            //$("#apodVideo").hide();
            document.querySelectorAll("#apodVideo").forEach(apodVideo => { apodVideo.style.display = "none" })
            
            //$("#apodImg").attr("src", result.url).attr('alt', result.title).show();
            document.querySelector("#apodImg").setAttribute("src", result.url);
            document.querySelector("#apodImg").setAttribute("alt", result.title);
            document.querySelector("#apodImg").style.display = "block";
        }
    
        //$("#apodCopyright").text("Copyright: " + result.copyright);
        //document.getElementById("apodCopyright").innerHTML = result.copyright;
        document.querySelector("#apodCopyright").innerHTML = "Copyright: " + result.copyright;

        //$("#apodDate").text("Date: " + result.date);
        //document.getElementById("apodDate").innerHTML = result.date;
        document.querySelector("#apodDate").innerHTML = "Date: " + result.date;

        //$("#apodDesc").text(result.explanation);
        //document.getElementById("apodDesc").innerHTML = result.explanation;
        document.querySelector("#apodDesc").innerHTML = result.explanation;
    },
    
    //Executes an AJAX call to an API.
    getRequest: function() {
        let _this = this;
        //let date = "2013-06-06";
        let date = this.randomDate(new Date(1995, 5, 16), new Date());
        let url = "https://api.nasa.gov/planetary/apod?api_key=UMunmS1KKJX9KXB4ZVBsOOxzY7ZQeMigUmFV2OQb&date=" + date;
        $.ajax({
            url: url
        }).done(function(result){
            _this.buildDOM(result);
        }).fail(function(result){
        console.log(result);
        });
    },
    
    // Initialization method.
    init: function() {
        this.getRequest();
    },
};

apod.init();

/* https://learn.jquery.com/using-jquery-core/document-ready/ */
//$(function() {
//     $('#btnRandApod').on('click',function(){
//       apod.getRequest();
//     });
// });
document.querySelector("#btnRandApod").addEventListener("click",function(){
        apod.getRequest();
});