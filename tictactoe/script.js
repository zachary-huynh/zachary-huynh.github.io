let currentPlayer = 1;
let xScore = 0;
let oScore = 0;

$(".hello").click(function () {
  let currentValue = $(this).text();
  if (!currentValue) {
    if (currentPlayer === 1) {
      $(this).text("X");
      currentPlayer += 1;
    } else {
      $(this).text("O");
      currentPlayer -= 1;
    }
    checkWinner();
  }
});

function checkWinner() {
  let oneItem = $("#one").text();
  let twoItem = $("#two").text();
  let threeItem = $("#three").text();
  let fourItem = $("#four").text();
  let fiveItem = $("#five").text();
  let sixItem = $("#six").text();
  let sevenItem = $("#seven").text();
  let eightItem = $("#eight").text();
  let nineItem = $("#nine").text();
  // ======================================================
  if (
    oneItem === twoItem &&
    oneItem === threeItem &&
    (oneItem === "X" || oneItem === "O")
  ) {
    $("#status").text(oneItem + " " + "Wins");
    $(".row1").css("background-color", "green");
    $("#exampleModal2").modal("show");
    scoreKeeper(oneItem);
  }
  if (
    fourItem === fiveItem &&
    fourItem === sixItem &&
    (fourItem === "X" || fourItem === "O")
  ) {
    $("#status").text(fourItem + " " + "Wins");
    $(".row2").css("background-color", "green");
    $("#exampleModal2").modal("show");
    scoreKeeper(fourItem);
  }
  if (
    sevenItem === eightItem &&
    sevenItem === nineItem &&
    (sevenItem === "X" || sevenItem === "O")
  ) {
    $("#status").text(sevenItem + " " + "Wins");
    $(".row3").css("background-color", "green");
    $("#exampleModal2").modal("show");
    scoreKeeper(sevenItem);
  }
  // ======================================================
  if (
    oneItem === fourItem &&
    oneItem === sevenItem &&
    (oneItem === "X" || oneItem === "O")
  ) {
    $("#status").text(oneItem + " " + "Wins");
    $(".column1").css("background-color", "green");
    $("#exampleModal2").modal("show");
    scoreKeeper(oneItem);
  }
  if (
    twoItem === fiveItem &&
    twoItem === eightItem &&
    (twoItem === "X" || twoItem === "O")
  ) {
    $("#status").text(twoItem + " " + "Wins");
    $(".column2").css("background-color", "green");
    $("#exampleModal2").modal("show");
    scoreKeeper(twoItem);
  }
  if (
    threeItem === sixItem &&
    threeItem === nineItem &&
    (threeItem === "X" || threeItem === "O")
  ) {
    $("#status").text(threeItem + " " + "Wins");
    $(".column3").css("background-color", "green");
    $("#exampleModal2").modal("show");
    scoreKeeper(threeItem);
  }
  // ======================================================
  if (
    oneItem === fiveItem &&
    oneItem === nineItem &&
    (oneItem === "X" || oneItem === "O")
  ) {
    $("#status").text(oneItem + " " + "Wins");
    $(".diagonal1").css("background-color", "green");
    $("#exampleModal2").modal("show");
    scoreKeeper(oneItem);
  }
  if (
    threeItem === fiveItem &&
    threeItem === sevenItem &&
    (threeItem === "X" || threeItem === "O")
  ) {
    $("#status").text(threeItem + " " + "Wins");
    $(".diagonal2").css("background-color", "green");
    $("#exampleModal2").modal("show");
    scoreKeeper(threeItem);
  }
}
// for Modal down below
$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});
// for Modal up above

$("#gameButton").click(function () {
  let xName = $("#x").val() || "Guest #1";
  let oName = $("#o").val() || "Guest #2";
  $("#score1").text(xName + " " + "is" + " " + "X");
  $("#score2").text(oName + " " + "is" + " " + "O");
  $("#exampleModal").modal("hide");
  $("#x").val("");
  $("#o").val("");
});

$("#yes").click(function () {
  $(".hello").text("");
  $(".hello").css("background-color", "teal");
});

$("#clear").click(function () {
  $(".hello").text("");
  $(".hello").css("background-color", "teal");
});

function scoreKeeper(winner) {
  if (winner === "X") {
    xScore += 1;
  } else {
    oScore += 1;
  }
  $("#player1Score").text(xScore);
  $("#player2Score").text(oScore);
}