let sumOfPoints, botPoints, arrCards;
let versusYourPoints = versusBotPoints = 0;

function StartGame() {
    arrCards = CreateArrCards();
    sumOfPoints = botPoints = 0;

    PlusBotPoints();

    $('.start-game').css('display', 'none');
    $('.interface').css('display', 'block');
    $('#versus').text(`Вы ${versusYourPoints}:${versusBotPoints} Дилер`);
    $('#remaining-cards').text(`Карт осталось: ${arrCards.length}`);
    $('#sum-of-points').text(sumOfPoints);
    $('.interface__buttons_button').removeAttr('disabled');
    $('.result-massage').css('display', 'none');
}

function PlusBotPoints() {
    let chance, differencePoints;

    takeCard:
        for (;;) {
            chance = 0;
            differencePoints = 21 - botPoints;

            for (let card of arrCards) {
                if (card <= differencePoints) {
                    chance++
                } else {
                    chance--
                }
            }

            console.log(`Разница в очках: ${differencePoints}`);
            console.log(`Определение шансов: ${chance}`);

            if (chance >= 0) {
                console.log(`Бот взял очков: ${arrCards[0]}`);
                botPoints += arrCards[0];
                arrCards.shift();
            } else {
                console.log('-----=====-----');
                console.log(`Очков у бота: ${botPoints}`);
                console.log('-----=====-----');
                break takeCard;
            }
            console.log('-----');
        }
}

function CreateArrCards() {
    let firstArrCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
    firstArrCards = firstArrCards.concat(firstArrCards, firstArrCards, firstArrCards);
    return firstArrCards.sort(() => Math.random() - 0.5);
}

function PlusPoints() {
    sumOfPoints += arrCards[0];
    arrCards.shift();

    $('#sum-of-points').text(sumOfPoints);
    $('#remaining-cards').text(`Карт осталось: ${arrCards.length}`);

    if (sumOfPoints > 21) {
        BlockedButton();
        $('.result-massage p').text('Вы проиграли! Вы собрали больше 21 очка!');
        versusBotPoints++;
        $('#versus').text(`Вы ${versusYourPoints}:${versusBotPoints} Дилер`);
    } else if (sumOfPoints == botPoints == 21) {
        BlockedButton();
        $('.result-massage p').text('Ничья! Вы и дилер собрали по 21 очко!');
    } else if (sumOfPoints == 21) {
        BlockedButton();
        $('.result-massage p').text('Вы выиграли! Вы собрали 21 очко!');
        versusYourPoints++;
        $('#versus').text(`Вы ${versusYourPoints}:${versusBotPoints} Дилер`);
    }
}

function EndGame() {
    BlockedButton()
    if (botPoints > 21 && sumOfPoints <= 21 || sumOfPoints > botPoints) {
        $('.result-massage p').text(`Вы победили! Очков у дилера: ${botPoints}!`);
        versusYourPoints++;
        $('#versus').text(`Вы ${versusYourPoints}:${versusBotPoints} Дилер`);
    } else if (sumOfPoints == botPoints) {
        $('.result-massage p').text(`Ничья! Вы и дилер собрали ${sumOfPoints} очков!`);
    } else {
        $('.result-massage p').text(`Вы проиграли! Вы собрали меньше очков, чем дилер! Очков у  дилера: ${botPoints}!`);
        versusBotPoints++;
        $('#versus').text(`Вы ${versusYourPoints}:${versusBotPoints} Дилер`);
    }
}

function BlockedButton() {
    $('.interface__buttons_button').attr('disabled', 'disabled');
    $('.result-massage').css('display', 'block');
}

function Info() {
    $('.info').toggleClass('info-active');
    console.log('object');
}