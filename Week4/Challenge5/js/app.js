window.onload = function (){

  var http = new XMLHttpRequest();
  var library;

  http.onreadystatechange = function (){
    if (http.readyState == 4 && http.status == 200){
      library = JSON.parse(http.response);
      loadBooks(library.list[0].bookList);
    }
  };

  http.open("GET", "./js/data/books.json", true);
  http.send();

  let loaderQ = document.getElementById("loaderQto");
  loaderQ.addEventListener("click", () => {
    for (load of document.getElementsByClassName("loader")) {
      load.className = "loader";
    }
    document.getElementById("currentLibrary").innerHTML = "Quito";
    loaderQ.className += " active";
    loadBooks(library.list[0].bookList);
  });

  loaderC = document.getElementById("loaderCtg");
  loaderC.addEventListener("click", () => {
    for (load of document.getElementsByClassName("loader")) {
      load.className = "loader";
    }
    document.getElementById("currentLibrary").innerHTML = "Cartagena";
    loaderC.className += " active";
    loadBooks(library.list[1].bookList);
  });

  loaderM = document.getElementById("loaderMdl");
  loaderM.addEventListener("click", () => {
    for (load of document.getElementsByClassName("loader")) {
      load.className = "loader";
    }
    document.getElementById("currentLibrary").innerHTML = "Medellín";
    loaderM.className += " active";
    loadBooks(library.list[2].bookList);
  });

  loaderD = document.getElementById("loaderDgt");
  loaderD.addEventListener("click", () => {
    for (load of document.getElementsByClassName("loader")) {
      load.className = "loader";
    }
    document.getElementById("currentLibrary").innerHTML = "Digital";
    loaderD.className += " active";
    loadBooks(library.list[3].bookList);
  });

  let itemView = document.getElementById("itemView");
  itemView.addEventListener("click", () => {
    itemView.className = "active";
    document.getElementById("listView").className = "";
    document.getElementById("bookList").style.display = "flex";
    for (var i = 0; i < document.getElementsByClassName("detailer").length; i++) {
      document.getElementsByClassName("detailer")[i].className = "detailer noBreak";
    }
  });

  let listView = document.getElementById("listView");
  listView.addEventListener("click", () => {
    listView.className = "active";
    document.getElementById("bookList").style.display = "block";
    document.getElementById("itemView").className = "";
    for (var i = 0; i < document.getElementsByClassName("detailer").length; i++) {
      document.getElementsByClassName("detailer")[i].className = "detailer listView";
    }
  });

  function loadBooks(bi){
    let bookCount = 0;
    document.getElementById("bookList").innerHTML = "";
    for (book of bi) {
      let data = fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}&key=AIzaSyA9JQCO9FdzQTsuFgQwi0l_LyXSGI0_ZLo`);
      var bookInfo;
      let info = data.then(function (response){
        return response.json();
      }).then(function (data){
        bookInfo = {
          "title": data.items[0].volumeInfo.title,
          "authors": data.items[0].volumeInfo.authors,
          "image": data.items[0].volumeInfo.imageLinks.thumbnail,
          "summary": data.items[0].volumeInfo.description,
          "pages": data.items[0].volumeInfo.pageCount,
          "isbn": data.items[0].volumeInfo.industryIdentifiers.filter((id) => id.type == "ISBN_13")[0].identifier,
          "status": bi.filter((bk) => bk.isbn == data.items[0].volumeInfo.industryIdentifiers.filter((id) => id.type == "ISBN_13")[0].identifier)[0].status,
          "rating": bi.filter((bk) => bk.isbn == data.items[0].volumeInfo.industryIdentifiers.filter((id) => id.type == "ISBN_13")[0].identifier)[0].rating
        };
        let listItem = document.createElement("li");
        let bookLabel = document.createElement("div");
        listItem.className += "detailer noBreak";
        bookLabel.innerHTML = `
          <img src="${bookInfo.image}" class="bookImage">
          <span class="bookTitle">${bookInfo.title}</span><br>
          <span class="bookAuthorLine">Book by <span class="bookAuthor">${(bookInfo.authors)?bookInfo.authors:"Unknown"}</span></span><br>
          <span class="bookPagesLine"> <span class="bookPages">${(bookInfo.pages)?bookInfo.pages:"Unknown"}</span> pages</span><br>
          <h5 class="bookSummaryTitle">SUMMARY</h5><br>
          <p class="bookSummary">${(bookInfo.summary)?bookInfo.summary:"No summary available"}</p><br>
        `;
        let rating = document.createElement("span");
        rating.className += "bookRating";
        for (var i = 0; i < 5; i++) {
          let stars = parseInt(bookInfo.rating);
          let star = document.createElement("span");
          if (stars>i) {
            star.innerHTML = '<i class="fas fa-star"></i>';
          } else {
            star.innerHTML = '<i class="far fa-star"></i>';
          }
          rating.append(star);
        }
        bookLabel.append(rating);
        listItem.append(bookLabel);
        if (bookInfo.status == "true") {
          let loaned = document.createElement("span");
          loaned.className += "loaned";
          loaned.innerHTML = '<i class="fas fa-star"></i>';
          bookLabel.appendChild(loaned);
        }
        document.getElementById("bookList").append(listItem);
        return bookInfo;
      }).then(data => {
        let lists = document.getElementsByClassName("detailer");
        lists[bookCount].addEventListener("click", () => {
          popUp(data.isbn,data.rating)
        });
        bookCount++;
      }).catch(function (error){
        console.error(error);
      });
    }
  }

  function popUp(id,rtg) {
    loadBook(id,rtg);
    var popup = document.getElementById("bookInfo");
    popup.style.visibility = "visible";
  }

  function loadBook(id,rtg) {
    let data = fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${id}&key=AIzaSyA9JQCO9FdzQTsuFgQwi0l_LyXSGI0_ZLo`);
    var bookInfo;
    var rating = rtg;
    let info = data.then(function (response){
      return response.json();
    }).then(function (data){
      bookInfo = {
        "title": data.items[0].volumeInfo.title,
        "authors": data.items[0].volumeInfo.authors,
        "summary": data.items[0].volumeInfo.description,
        "pages": data.items[0].volumeInfo.pageCount,
        "isbn": data.items[0].volumeInfo.industryIdentifiers.filter((id) => id.type == "ISBN_13")[0].identifier,
        "rating": rating
      };
      document.getElementById("bookInfo").innerHTML = "";
      let bookDetail = document.createElement("div");
      bookDetail.innerHTML = `
        <span id="bookTitle">${bookInfo.title}</span><br>
        <span>Book by <span id="bookAuthor">${(bookInfo.authors)?bookInfo.authors:"Unknown"}</span></span><br>
        <span> <span id="bookPages">${bookInfo.pages}</span> Pages</span>
        <h5>SUMMARY</h5>
        <p id="bookSummary">${(bookInfo.summary)?bookInfo.summary:"No summary available"}</p>
        <h5>RATING</h5>
      `;
      let bookRating = document.createElement("span")
      for (var i = 0; i < 5; i++) {
        let stars = parseInt(bookInfo.rating);
        let star = document.createElement("span");
        if (stars>i) {
          star.innerHTML = '<i class="fas fa-star"></i>';
        } else {
          star.innerHTML = '<i class="far fa-star"></i>';
        }
        bookRating.append(star);
      }
      bookDetail.append(bookRating);
      document.getElementById("bookInfo").append(bookDetail);
    }).catch(function (error){
      console.error(error);
    });
  }
};
