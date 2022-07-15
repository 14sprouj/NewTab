var quoteList = [
	"If at first you don't succeed, try, try again. Then quit. Never stop trying. No matter how much pain, no matter how much gain, you must have a goal. If you can't even begin, you can't succeed.",
	"If you can't do it, you can't do it right."
];
// pick a random quote
var randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
// display the quote
$("#quote").html(randomQuote);