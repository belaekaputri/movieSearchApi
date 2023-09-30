function searchMovie(){ //arrow funtion
  // $.getJSON('http://omdbapi.com?apiley= &')
  $('#movie-list').html('');//jika ditukar judul pencarian maka pencarian sebelumnya tidak tampil
  $.ajax({
     url:'http://omdbapi.com',
     type:'get',
     dataType:'json',
     data:{
       'apikey':'916c9033', //key omdbapi disarankan menggunakan key sendiri ,
       's': $('#search-input').val() //mengambil value dari #search-input
     },
     success:function(result){
       if(result.Response==="True"){
          //jika ada judul film ditemukan
          let movies= result.Search;
          $.each(movies,function(i,data){
            $('#movie-list').append(`
            <div class="col-md-3">
            <div class="card mb-3 shadow">
               <img src=${data.Poster} class="card-img-top" alt="images" height="450px">
               <div class="card-body">
                   <a href="#" class="btn see-detail" data-toggle="modal" data-target="#exampleModal" data-id=${data.imdbID}>See Detail</a>
               </div>
               </div>
             </div>
            `)
            $('#search-input').val("");
          });
       }else{
           $('#movie-list').html(`<div class="col">
           <h1 class="text-center">${result.Error}</h1></div>`);
           $('#search-input').val("");
       }
     }
  });
}
$('#search-button').on('click',function(){
   searchMovie();
})
$('#search-input').on('keyup',function(e){
  if(e.which===13){
    searchMovie();
  }
})
$('#movie-list').on('click','.see-detail',function(){
  //console.log($(this).data('id'));  
  $.ajax({
    url: 'http://omdbapi.com',
    dataType:'json',
    type:'get',
    data:{
      'apikey':'916c9033',
      'i':$(this).data('id')  //i dari omdbapi
    },
    success:function(movie){
      if(movie.Response === "True"){
        $('.modal-body').html(`
         <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
               <img src=${movie.Poster} class="img-fluid shadow rounded">
              </div>

              <div class="col-md-8">
                  <ul class="list-group">
                  <li class="list-group-item"><h3>Title: ${movie.Title}</h3></li>
                  <li class="list-group-item">Released: ${movie.Released}</li>
                  <li class="list-group-item">Actors: ${movie.Actors}</li>
                  <li class="list-group-item">Genre: ${movie.Genre}</li>
                  <li class="list-group-item">Rated: ${movie.Rated}</li>
                  <li class="list-group-item">Language: ${movie.Language}</li>
                  <li class="list-group-item">Plot: ${movie.Plot}</li>
                  <li class="list-group-item">Director: ${movie.Director}</li>
                </ul>
              </div>
            </div>
         </div>
        
        `)
    } 
  }  
})
})
