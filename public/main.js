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

const deck = []
const playersHand = []
const dealersHand = []

const main = () => {
  createDeck()
  shuffleDeck()
  dealPlayersHand()
  dealDealerHand()
  getPlayerHandTotal()
  getDealerHandTotal()
  dealPlayersCard()
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
  console.log(deck)
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
// Player
const dealPlayersHand = () => {
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    playersHand.push(dealtCard)
  }
  console.log(playersHand)
}
// Dealer
const dealDealerHand = () => {
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    dealersHand.push(dealtCard)
  }
  console.log(dealersHand)
}
// Hit Button
const dealPlayersCard = () => {
  for (let i = 0; i < 1; i++) {
    const dealtCard = deck.pop()
    playersHand.push(dealtCard)
  }
  console.log(playersHand)
}
// Stay Button
// Hand Totals
// Player
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
  console.log(handTotal)
}
// Dealer
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
  console.log(handTotal)
}

document.addEventListener('DOMContentLoaded', main)
