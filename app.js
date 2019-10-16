let $uppercaseKeyboard = $('.uppercase')
let $lowercaseKeyboard = $('.lowercase')
let $keys = $('.key')
let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate',
];
let $sentenceDiv = $('#sentence')
let whatSentence = 0
let position = 0
let counter = 0
let timeSpent = 0
let incorrectMark = 0
let $reloadPageButton = $("#reload")
$reloadPageButton.click(() => {
    location.reload()
})
let myTimer = () => {
    return timeSpent = timeSpent + 1
}
window.setInterval(myTimer, 1000)
$sentenceDiv[0].innerText = sentences[whatSentence]
$("#target-letter")[0].innerText = sentences[whatSentence][position]
$('body').bind('keydown', function (e) {
    console.log(timeSpent)
    if (e.key !== sentences[whatSentence][position]) {
        $('#feedback')[0].innerHTML = "<img src=\'images/bad.png\' width=\'50px\' height=\'50px\'>"
        incorrectMark++
    }
    for (let i = 0; i < $keys.length; i++) {
        if (sentences[whatSentence][position] !== ' ') {
            $("#target-letter")[0].innerText = sentences[whatSentence][position]
        } else {
            $("#target-letter")[0].innerText = 'Spacebar'
        }
        if (e.key == $keys[i].innerText) {
             $keys[i].style.backgroundColor = 'yellow'
        } else if (e.which == 16) {
            $uppercaseKeyboard[0].style.display = 'initial';
            $lowercaseKeyboard[0].style.display = 'none';
        } else if (e.key == 32 || e.which == 32) {
            $('#32')[0].style.backgroundColor = 'yellow'
        }
        if (e.key == sentences[whatSentence][position]) {
            $('#feedback')[0].innerHTML = "<img src=\'images/good.png\' width=\'50px\' height=\'50px\'>"
            console.log('checkmark')
            $('#yellow-block').width(17 + $('#yellow-block').width())
            position++
            if (position == sentences[whatSentence].length) {
                $('#feedback')[0].innerHTML = ''
                whatSentence++
                position = 0
                $('#yellow-block').width(0)
                $sentenceDiv[0].innerText = sentences[whatSentence]
            }
            if (whatSentence == sentences.length) {
                alert('You Finished All The Excercises')
                $('#feedback')[0].innerHTML = ''
                whatSentence = 0
                position = 0
                $sentenceDiv[0].innerText = sentences[whatSentence]
                let totalTimeSpent = timeSpent/60
                let wordPerMinute = 54 / totalTimeSpent// - (2 * incorrectMark)
                let adjustedWPM = wordPerMinute - (2*incorrectMark)
                $('#feedback')[0].innerText = `you typed at ${wordPerMinute} words per minute, with ${incorrectMark} mistyped characters giving you a score of: ${adjustedWPM} adjusted words per minute. Would you like to play again?`
                window.clearInterval()
                $reloadPageButton[0].style.display = 'initial'
            }
        }
    }
}).bind('keyup', function (e) {
    if (e.which == 16) {
        $uppercaseKeyboard[0].style.display = 'none';
        $lowercaseKeyboard[0].style.display = 'initial';
    }
    for (let i = 0; i < $keys.length; i++) {
        $keys[i].style.backgroundColor = 'initial'
    }
})