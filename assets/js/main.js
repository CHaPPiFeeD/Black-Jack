let arrCards, canTakeCardsBot;

const points = {};
const versus = {
    playerPoints: 0,
    botPoints: 0,
};

function startGame() {
    arrCards = createArrCards();
    canTakeCardsBot = true;
    points.playerPoints = points.botPoints = 0;

    $('.start-game').css('display', 'none');
    $('.interface').css('display', 'block');
    $('#remaining-cards').text(`Карт осталось: ${arrCards.length}`);
    $('#versus').text(`Вы ${versus.playerPoints}:${versus.botPoints} Противник`);
    $('#player-points').text(points.playerPoints);
    $('.interface__buttons_button').removeAttr('disabled');
    $('.result-massage').css('display', 'none');
}

function createArrCards() {
    let firstArrCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
    firstArrCards = firstArrCards.concat(firstArrCards, firstArrCards, firstArrCards);
    return firstArrCards.sort(() => Math.random() - 0.5);
}

function plusPlayerPoints() {
    points.playerPoints += arrCards.shift();
    
    $('#player-points').text(points.playerPoints);
    $('#remaining-cards').text(`Карт осталось: ${arrCards.length}`);

    if (points.playerPoints > 21) {
        blockedButton();
        plusBotPointsEnd();

        if (points.botPoints > 21) $('.result-massage p').text('Ничья! Вы и противник собрали больше 21 очка!');

        $('.result-massage p').text('Вы проиграли! Вы собрали больше 21 очка!');
        versus.botPoints++;
    } else if (points.playerPoints == 21) {
        blockedButton();
        plusBotPointsEnd();

        if (points.playerPoints == points.botPoints == 21) return $('.result-massage p').text('Ничья! Вы и противник собрали по 21 очко!');

        $('.result-massage p').text('Вы выиграли! Вы собрали 21 очко!');
        versus.playerPoints++;
    }

    $('#versus').text(`Вы ${versus.playerPoints}:${versus.botPoints} Противник`);
}

function plusBotPoints() {
    if (!canTakeCardsBot) return;
    points.botPoints += arrCards.shift();
    console.log(`Очков у бота: ${points.botPoints}`);
    $('#remaining-cards').text(`Карт осталось: ${arrCards.length}`);
    canTakeCards();
}

function canTakeCards() {
    let chance = 0;
    let difference = 21 - points.botPoints;

    for (let card of arrCards) {
        if (card <= difference) {
            chance++
        } else {
            chance--
        }
    }

    if (chance < 0) canTakeCardsBot = false;
}

function endGame() {
    blockedButton();
    plusBotPointsEnd();

    if (points.botPoints > 21 && points.playerPoints <= 21 || points.playerPoints > points.botPoints) {
        $('.result-massage p').text(`Вы победили! Очков у противника: ${points.botPoints}!`);
        versus.playerPoints++;
    } else if (points.playerPoints == points.botPoints) {
        $('.result-massage p').text(`Ничья! Вы и противник собрали ${points.playerPoints} очков!`);
    } else {
        $('.result-massage p').text(`Вы проиграли! Вы собрали меньше очков, чем противник! Очков у  противника: ${points.botPoints}!`);
        versus.botPoints++;
    }

    $('#versus').text(`Вы ${versus.playerPoints}:${versus.botPoints} Противник`);
}

function plusBotPointsEnd() {
    for (;canTakeCardsBot;) {
        plusBotPoints();
    }
}

function blockedButton() {
    $('.interface__buttons_button').attr('disabled', 'disabled');
    $('.result-massage').css('display', 'block');
}

function info() {
    $('.info').toggleClass('info-active');
}