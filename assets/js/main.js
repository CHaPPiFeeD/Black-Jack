let sumOfPoints, botPoints, arrCards, canTakeCardsBot;
let versusYourPoints = versusBotPoints = 0;

function startGame() {
    arrCards = createArrCards();
    sumOfPoints = botPoints = 0;
    canTakeCardsBot = true;

    $('.start-game').css('display', 'none');
    $('.interface').css('display', 'block');
    $('#remaining-cards').text(`Карт осталось: ${arrCards.length}`);
    $('#versus').text(`Вы ${versusYourPoints}:${versusBotPoints} Противник`);
    $('#sum-of-points').text(sumOfPoints);
    $('.interface__buttons_button').removeAttr('disabled');
    $('.result-massage').css('display', 'none');
}

function plusBotPoints() {
    if (!canTakeCardsBot) return;

    let differencePoints = 21 - botPoints;
    console.log(`Разница в очках: ${differencePoints}`);//

    getChance(differencePoints);

    if (canTakeCardsBot) {
        console.log(`- Бот взял очков: ${arrCards[0]}`);//
        botPoints += arrCards[0];
        arrCards.shift();
    }

    console.log(`Очков у бота: ${botPoints}`);//
    $('#remaining-cards').text(`Карт осталось: ${arrCards.length}`);

}

function getChance(difference) {
    let chance = 0;

    for (let card of arrCards) {
        if (card <= difference) {
            chance++
        } else {
            chance--
        }
    }

    console.log(`Определение шансов: ${chance}`);

    if (chance < 0) canTakeCardsBot = false;
}

function createArrCards() {
    let firstArrCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
    firstArrCards = firstArrCards.concat(firstArrCards, firstArrCards, firstArrCards);
    return firstArrCards.sort(() => Math.random() - 0.5);
}

function plusPoints() {
    sumOfPoints += arrCards.shift();
    $('#sum-of-points').text(sumOfPoints);
    $('#remaining-cards').text(`Карт осталось: ${arrCards.length}`);

    if (sumOfPoints > 21) {
        blockedButton();
        $('.result-massage p').text('Вы проиграли! Вы собрали больше 21 очка!');
        versusBotPoints++;
        $('#versus').text(`Вы ${versusYourPoints}:${versusBotPoints} Противник`);
    } else if (sumOfPoints == 21) {
        blockedButton();
        canPlusBotPoints();

        if (sumOfPoints == botPoints == 21) {
            $('.result-massage p').text('Ничья! Вы и противник собрали по 21 очко!');
            return;
        }

        $('.result-massage p').text('Вы выиграли! Вы собрали 21 очко!');
        versusYourPoints++;
        $('#versus').text(`Вы ${versusYourPoints}:${versusBotPoints} противник`);
    }


}

function endGame() {
    blockedButton();
    canPlusBotPoints();

    if (botPoints > 21 && sumOfPoints <= 21 || sumOfPoints > botPoints) {
        $('.result-massage p').text(`Вы победили! Очков у противника: ${botPoints}!`);
        versusYourPoints++;
        $('#versus').text(`Вы ${versusYourPoints}:${versusBotPoints} противник`);
    } else if (sumOfPoints == botPoints) {
        $('.result-massage p').text(`Ничья! Вы и противник собрали ${sumOfPoints} очков!`);
    } else {
        $('.result-massage p').text(`Вы проиграли! Вы собрали меньше очков, чем противник! Очков у  противника: ${botPoints}!`);
        versusBotPoints++;
        $('#versus').text(`Вы ${versusYourPoints}:${versusBotPoints} противник`);
    }
}

function canPlusBotPoints() {
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