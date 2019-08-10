const suits = ['hearts', 'diamonds', 'spades', 'clubs']
const ranks = [
  { name: 'ace', value: 11 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 },
  { name: '6', value: 6 },
  { name: '7', value: 7 },
  { name: '8', value: 8 },
  { name: '9', value: 9 },
  { name: '10', value: 10 },
  { name: 'jack', value: 10 },
  { name: 'queen', value: 10 },
  { name: 'king', value: 10 }
]

let deck = []
let playersHand = []
let dealersHand = []

const main = () => {
  createDeck()
  shuffleDeck()
  dealOpeningHand()
  getPlayerHandTotal()
  getDealerHandTotal()
}
// Make Deck
const createDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    const suit = suits[i]
    for (let j = 0; j < ranks.length; j++) {
      const rank = ranks[j]
      deck.push({
        rank: rank.name,
        value: rank.value,
        suit: suit
      })
    }
  }
}
// Shuffle Deck
const shuffleDeck = () => {
  for (let i = deck.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * i)
    const temp = deck[random]
    deck[random] = deck[i]
    deck[i] = temp
  }
  console.log(deck)
}
// Opening Card Deal
const dealOpeningHand = () => {
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    playersHand.push(dealtCard)
    const cardElement = document.createElement('img')
    cardElement.src =
      '/images/' + playersHand[0].rank + '_of_' + playersHand[0].suit + '.svg'
    document.querySelector('.players-hand').appendChild(cardElement)
  }
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    dealersHand.push(dealtCard)
    const cardElement = document.createElement('img')
    cardElement.src =
      '/images/' + dealersHand[0].rank + '_of_' + playersHand[0].suit + '.svg'
    document.querySelector('.dealers-hand').appendChild(cardElement)
  }
}
// Hit Button
const dealOneCard = () => {
  for (let i = 0; i < 1; i++) {
    const dealtCard = deck.pop()
    playersHand.push(dealtCard)
    // Display Card
    document.querySelector('.players-hand').textContent = dealtCard
    getPlayerHandTotal()
  }
  console.log(playersHand)
}
// Stay Button
const stayDealerDraw = () => {
  const dealtCard = deck.pop()
  dealersHand.push(dealtCard)
  // Display Card
  document.querySelector('.dealers-hand').textContent = dealtCard
  getDealerHandTotal()
}
// Deal New Hand
const dealNewHand = () => {
  deck = []
  playersHand = []
  dealersHand = []
  createDeck()
  shuffleDeck()
  dealOpeningHand()
  getPlayerHandTotal()
  getDealerHandTotal()
}
// Hand Totals
const getPlayerHandTotal = () => {
  let handTotal
  for (let i = 0; i < playersHand.length; i++) {
    const card = playersHand[i]
    if (handTotal) {
      handTotal += card.value
      document.querySelector('.player-score').textContent = handTotal
    } else {
      handTotal = card.value
      document.querySelector('.player-score').textContent = handTotal
    }
  }
  console.log(playersHand)
}
const getDealerHandTotal = () => {
  let handTotal
  for (let i = 0; i < dealersHand.length; i++) {
    const card = dealersHand[i]
    if (handTotal) {
      handTotal += card.value
      document.querySelector('.dealer-score').textContent = handTotal
    } else {
      handTotal = card.value
      document.querySelector('.dealer-score').textContent = handTotal
    }
  }
  console.log(dealersHand)
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.hit-button').addEventListener('click', dealOneCard)
document.querySelector('.deal-button').addEventListener('click', dealNewHand)
document.querySelector('.stay-button').addEventListener('click', stayDealerDraw)
