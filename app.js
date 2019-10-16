let $uppercaseKeyboard = $('.uppercase') //uppercase keyboard
let $lowercaseKeyboard = $('.lowercase') //lowercase keyboard
let $keys = $('.key') //list of all my keys
let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate',
]; //list of sentences needed to be typed
let $sentenceDiv = $('#sentence') //location senteces are placed
let whatSentence = 0 //what sentence number im on
let position = 0 //what position in the sentence im at
let timeSpent = 0 //time in seconds that has passed
let incorrectMark = 0 //times you hit a wrong key
let $reloadPageButton = $("#reload") //'yes' to play again and it will reload the page for you
$reloadPageButton.click(() => {
    location.reload()
}) //event listener for when reload 'yes' key is pressed
let myTimer = () => {
    return timeSpent = timeSpent + 1 //timer that adds 1 each second
}
window.setInterval(myTimer, 1000) //runs the timer each second
$sentenceDiv[0].innerText = sentences[whatSentence] //starting sentence displayed
$("#target-letter")[0].innerText = sentences[whatSentence][position] //starting letter displayed
$('body').bind('keydown', function (e) { //function to run when a key is pressed down
    console.log(timeSpent) //logs how long it has been
    if (e.key !== sentences[whatSentence][position]) { //if the key is not equal to your position in the sentence
        $('#feedback')[0].innerHTML = "<img src=\'images/bad.png\' width=\'50px\' height=\'50px\'>" //display a X
        incorrectMark++ //add 1 to the mistype counter
    }
    for (let i = 0; i < $keys.length; i++) { //for every key
        if (sentences[whatSentence][position] !== ' ') { //if sentence position is not a spacebar
            $("#target-letter")[0].innerText = sentences[whatSentence][position] //display letter as target text
        } else {
            $("#target-letter")[0].innerText = 'Spacebar' //display Spacebar as target text
        }
        if (e.key == $keys[i].innerText) { //if key is pressed
             $keys[i].style.backgroundColor = 'yellow' //highlight it yellow
        } else if (e.which == 16) { //if shift is pressed
            $uppercaseKeyboard[0].style.display = 'initial'; //show uppercase
            $lowercaseKeyboard[0].style.display = 'none'; //hide lowercase
        } else if (e.key == 32 || e.which == 32) { //if spacebar is pressed
            $('#32')[0].style.backgroundColor = 'yellow' //highlight spacebar
        }
        if (e.key == sentences[whatSentence][position]) { //if key pressed is target position
            $('#feedback')[0].innerHTML = "<img src=\'images/good.png\' width=\'50px\' height=\'50px\'>"
            console.log('checkmark') //display checkmark and console log checkmark
            $('#yellow-block').width(17 + $('#yellow-block').width()) //highlight extends to next target letter
            position++ //move to next sentence letter position
            if (position == sentences[whatSentence].length) { //if you finish the sentence
                $('#feedback')[0].innerHTML = '' //reset checkmark/X
                whatSentence++ //move to next sentence
                position = 0 //move position to start of sentence
                $('#yellow-block').width(0) //move highlight to only first letter
                $sentenceDiv[0].innerText = sentences[whatSentence] //change the display to show current sentence
            }
            if (whatSentence == sentences.length) { //if finished all sentences
                alert('You Finished All The Excercises')
                $('#feedback')[0].innerHTML = '' //remove checkmark/X
                whatSentence = 0 //reset sentences
                position = 0 //reset letter position
                $sentenceDiv[0].innerText = sentences[whatSentence] //reset display
                let totalTimeSpent = timeSpent/60 //get how many minutes it took
                let wordPerMinute = 54 / totalTimeSpent//calculate words per minute
                let adjustedWPM = wordPerMinute - (2*incorrectMark) //calculate wpm score
                $('#feedback')[0].innerText = `you typed at ${wordPerMinute} words per minute, with ${incorrectMark} mistyped characters giving you a score of: ${adjustedWPM} adjusted words per minute. Would you like to play again?`
                window.clearInterval() //stop timer
                $reloadPageButton[0].style.display = 'initial' //show replay 'yes' button
            }
        }
    }
}).bind('keyup', function (e) { //when you let up key
    if (e.which == 16) { //if it is shift
        $uppercaseKeyboard[0].style.display = 'none'; //hide uppercase
        $lowercaseKeyboard[0].style.display = 'initial'; //show lowercase
    }
    for (let i = 0; i < $keys.length; i++) { //for each key
        $keys[i].style.backgroundColor = 'initial' //remove highlighting
    }
})