let cardCount = 0;
let difficulty = "easy";
startNewGame();
function getCards() {
  const cards = [
    { key: "A", url: "&#128512;" },
    { key: "B", url: "&#128513;" },
    { key: "C", url: "&#128514;" },
    { key: "D", url: "&#129299;" },
    { key: "E", url: "&#127825;" },
    { key: "F", url: "&#127826;" },
    { key: "G", url: "&#127827;" },
    { key: "H", url: "&#127821;" },
    { key: "I", url: "&#127836;" },
    { key: "J", url: "&#127952;" }
  ];
  if (difficulty === "easy") {
    return [...cards.slice(0, 5), ...cards.slice(0, 5)];
  }
  if (difficulty === "medium") {
    return [...cards.slice(0, 8), ...cards.slice(0, 8)];
  }
  if (difficulty === "hard") {
    return [...cards, ...cards];
  }
}
$("#easyButton").click(function () {
  difficulty = "easy";

  startNewGame();
});
$("#mediumButton").click(function () {
  difficulty = "medium";

  startNewGame();
});
$("#hardButton").click(function () {
  difficulty = "hard";

  startNewGame();
});
// for (let i = 0; i < finalCards.length; i++) {
//   $("#containerCanvas").append(
//     "<div class='cardBox " +
//       finalCards[i].key +
//       "_back'>" +
//       finalCards[i].url +
//       "<div + id=" +
//       finalCards[i].key +
//       " class='coverCard'></div></div>"
//   );
// }

function shuffle(myDeck) {
  if (myDeck.length > 0) {
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor(Math.random() * myDeck.length);
      let location2 = Math.floor(Math.random() * myDeck.length);
      let tmp = myDeck[location1];
      myDeck[location1] = myDeck[location2];
      myDeck[location2] = tmp;
    }
  }
}

$(".coverCard").click(function () {
  console.log("clicked");
  $(this).hide();
  let testCover = $(".coverCard:hidden");
  console.log(testCover);
  cardCount += 1;
  console.log(cardCount);
  $("#cardStorage").text(cardCount);
  if (testCover.length === 2) {
    let firstCard = testCover[0].id;
    let secondCard = testCover[1].id;
    console.log(firstCard, secondCard);
    if (firstCard === secondCard) {
      $(`.${testCover[0].id}_back`).css("background-color", "red");
      $(this).parent().css("background-color", "red");
      console.log("Matched");
      $(".coverCard:hidden").remove();
    } else {
      setTimeout(function () {
        $(".coverCard:hidden").show();
      }, 500);
    }
  }
});

function startNewGame() {
  const finalCards = getCards();
  shuffle(finalCards);
  cardCount = 0;
  $("#cardStorage").text(cardCount);
  $("#containerCanvas").empty();
  for (let i = 0; i < finalCards.length; i++) {
    $("#containerCanvas").append(
      "<div class='cardBox " +
        finalCards[i].key +
        "_back'>" +
        finalCards[i].url +
        "<div + id=" +
        finalCards[i].key +
        " class='coverCard'></div></div>"
    );
  }
  $(".coverCard").click(function () {
    console.log("clicked");
    $(this).hide();
    let testCover = $(".coverCard:hidden");
    console.log(testCover);
    console.log(cardCount);
    $("#cardStorage").text(cardCount);
    if (testCover.length === 2) {
      let firstCard = testCover[0].id;
      let secondCard = testCover[1].id;
      console.log(firstCard, secondCard);
      if (firstCard === secondCard) {
        $(`.${testCover[0].id}_back`).css("background-color", "red");
        $(this).parent().css("background-color", "red");
        console.log("Matched");
        $(".coverCard:hidden").remove();
      } else {
        setTimeout(function () {
          $(".coverCard:hidden").show();
        }, 500);
      }
    }
  });
}

$("#restartButton").click(startNewGame);