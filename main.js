

$(document).ready(function(){
    var key ='Your API Key';
    var playlistId ='Your PlayList Id';
    var url='https://www.googleapis.com/youtube/v3/playlistItems';
    var options={
        part:'snippet',
        key:key,
        maxResults:20,
        playlistId:playlistId

    }
    
    loadVideos();
    function loadVideos(){
        
        $.getJSON(url,options,function(data){
            
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultLoop(data);
            
        })
    }

    function mainVid(id){
        $('#video').html(`
        <iframe width="553" height="300" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `);
    }
    function resultLoop(data){

        $.each(data.items,function(i,item){
            var thumb=item.snippet.thumbnails.high.url;
            var title=item.snippet.title;
            var description=item.snippet.description.substring(0,100);
            var vid=item.snippet.resourceId.videoId;

            
            $('main').append(`
                <article class="item" data-key="${vid}">
                    <img src="${thumb}" alt="" class="thumb">

                    <div class="details">
                        <h4>${title}</h4>
                        <p>${description}</p>

                    </div>

                    

                </article>
            `);

            

        });

        $('main').on('click','article',function(){
            var id =$(this).attr('data-key');
        
            mainVid(id);

           

        });
        
        
        
    }

});

