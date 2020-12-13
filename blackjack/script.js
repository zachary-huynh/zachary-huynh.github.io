const suits = ["hearts", "diamonds", "spades", "clovers"];
const numbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];

const player1 = {
  hand: [],
  score: 0,
  name: "player1",
  total: 0,
  bet: 0,
  bank: 300
};
const player2 = { hand: [], score: 0, name: "player2", total: 0, bank: 800 };
const allPlayers = { player1, player2 };
let allCards = [];
let currentPlayer = 1;
let gameOver = false;

for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    let value = parseInt(numbers[j]);
    if (numbers[j] == "J" || numbers[j] == "Q" || numbers[j] == "K") {
      value = 10;
    }
    if (numbers[j] == "A") {
      value = 11;
    }
    const cards = {
      suit: suits[i],
      number: numbers[j],
      value: value
    };
    allCards.push(cards);
  }
}

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

shuffle(allCards);

const suitIcons = {
  hearts: "&#9829;",
  spades: "&#9824;",
  diamonds: "	&#9830;",
  clovers: "	&#9827;"
};

function deal() {
  startNewGame();
  $("#bet").show();
  showBank();
  $("#status").text("Select a bet before continuing!");
}

function passCards() {
  const player1Card1 = allCards.pop();
  const player1Card2 = allCards.pop();
  const player2Card1 = allCards.pop();
  const player2Card2 = allCards.pop();

  player1.hand.push(player1Card1);
  player1.hand.push(player1Card2);
  player2.hand.push(player2Card1);
  player2.hand.push(player2Card2);

  renderCard(player1Card1, 1);
  renderCard(player1Card2, 1);
  renderCard(player2Card1, 2);
  renderCard(null, 2);
  setTotal();
  $(`#player${currentPlayer}`).addClass("active");
  drawScore();
  showCardLength();
  checkBlackJack();
}

$("#deal").click(deal);

const suitColors = {
  diamonds: "red",
  hearts: "red",
  clovers: "black",
  spades: "black"
};

function renderCard(card, player) {
  if (card) {
    const cardImage = $("<div>")
      .html(
        `<div class="cardNumber ${suitColors[card.suit]}">${
          card.number
        }</div><div class="cardSuit ${suitColors[card.suit]}">${
          suitIcons[card.suit]
        }</div>`
      )
      .addClass("cardStyle");
    $(`#hand_${player}`).append(cardImage);
  } else {
    const cardImage = $("<div>").addClass("cardStyle");
    $(`#hand_${player}`).append(cardImage);
  }
}

$("#hit").click(hitMe);
function hitMe() {
  const hitCard = allCards.pop();
  renderCard(hitCard, currentPlayer);
  allPlayers[`player${currentPlayer}`].hand.push(hitCard);
  setTotal();
  checkBust();
  showCardLength();
}

$("#stay").click(function () {
  if (currentPlayer === 1) {
    $(`#player${currentPlayer}`).removeClass("active");
    currentPlayer += 1;
    $(`#player${currentPlayer}`).addClass("active");
  }
  computerTurn();
});

function setTotal() {
  // allPlayers[`player1`].hand
  let totalValue = 0;
  for (i = 0; i < player1.hand.length; i++) {
    let cardValue = player1.hand[i].value;
    if (totalValue > 11 && cardValue === 11) {
      cardValue = 1;
    }
    totalValue += cardValue;
  }
  player1.total = totalValue;
  totalValue = 0;
  for (i = 0; i < player2.hand.length; i++) {
    let cardValue = player2.hand[i].value;
    if (totalValue > 11 && cardValue === 11) {
      cardValue = 1;
    }
    totalValue += cardValue;
  }
  player2.total = totalValue;
}

function checkBust() {
  if (allPlayers[`player${currentPlayer}`].total > 21) {
    gameOver = true;

    disableGame();
    if (currentPlayer === 1) {
      player2.score += 1;
      payingOut(2);
      $("#status").text("Player 1 Busted");
    } else {
      player1.score += 1;
      payingOut(1);
      $("#status").text("Dealer Busted");
    }
    drawScore();
  }
}
let usedCards = [];
function startNewGame() {
  usedCards = usedCards.concat(player1.hand);
  usedCards = usedCards.concat(player2.hand);
  $("#hand_1").empty();
  $("#hand_2").empty();
  player1.hand = [];
  player2.hand = [];
  $("#status").empty();
  $("#hit").removeClass("disabled");
  $("#stay").removeClass("disabled");
  $("#hit").prop("disabled", false);
  $("#stay").prop("disabled", false);
  $(`#player${currentPlayer}`).removeClass("active");
  currentPlayer = 1;
  gameOver = false;
}

function checkWinner() {
  if (player1.total > player2.total) {
    $("#status").text("Player1" + " " + "Wins");
    player1.score += 1;
    payingOut(1);
  }
  if (player1.total < player2.total) {
    $("#status").text("Dealer" + " " + "Wins");
    player2.score += 1;
    payingOut(2);
  }
  if (player1.total === player2.total) {
    $("#status").text("It was a push");
  }
  drawScore();
  disableGame();
}

function checkBlackJack() {
  console.log("checking blackjack", player1, player2);
  if (player1.total === 21) {
    console.log("Player 1 Blackjack");
    $("#status").text("Player1 Blackjack");
    disableGame();
    payingOut(1);
    gameOver = true;
  }
  if (player2.total === 21) {
    console.log("Player 2 Blackjack");
    $("#status").text("Dealer Blackjack");
    disableGame();
    payingOut(2);
    gameOver = true;
  }
  if (player1.total === 21 && player2.total === 21) {
    $("#status").text("Both Blackjack! Congradulations!");
    disableGame();
    gameOver = true;
  }
}

function disableGame() {
  $("#hit").addClass("disabled");
  $("#stay").addClass("disabled");
  $("#hit").prop("disabled", true);
  $("#stay").prop("disabled", true);
}

function drawScore() {
  $("#scoreP1").text(player1.score);
  $("#scoreP2").text(player2.score);
}

function showCardLength() {
  const cardLength = allCards.length;
  $("#cardCount").text(cardLength);
}

$("#shuffle").click(function () {
  shuffle(usedCards);
  allCards = allCards.concat(usedCards);
  showCardLength();
  usedCards = [];
});

function computerTurn() {
  $("#hand_2").empty();
  const card1 = player2.hand[0];
  const card2 = player2.hand[1];
  renderCard(card1, 2);
  renderCard(card2, 2);
  $("#hit").addClass("disabled");
  $("#stay").addClass("disabled");
  $("#hit").prop("disabled", true);
  $("#stay").prop("disabled", true);
  while (player2.total < 16) {
    hitMe();
  }
  checkBust();
  if (gameOver !== true) {
    checkWinner();
  }
}

$("#bet").hide();
$(".amount").click(function () {
  player1.bet = Number($(this).val());
  passCards();
  $("#bet").hide();
  if (gameOver === false) {
    $("#status").text("Hit or Stay?");
  }
});

function payingOut(winner) {
  if (winner === 1) {
    player1.bank += player1.bet;
    player2.bank -= player1.bet;
    player1.bet = 0;
  } else {
    player2.bank += player1.bet;
    player1.bank -= player1.bet;
    player1.bet = 0;
  }
}

function showBank() {
  $("#betP1").text(player1.bank);
  $("#betP2").text(player2.bank);
}