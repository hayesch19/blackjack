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
  dealPlayerHand()
  dealDealerHand()
  getPlayerHandTotal()
  getDealerHandTotal()
}
// Create Deck
const createDeck = () => {
  deck = []
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
    const j = Math.floor(Math.random() * i)
    const firstArray = deck[i]
    const secondArray = deck[j]
    deck[i] = secondArray
    deck[j] = firstArray
  }
  console.log(deck)
}
// Deal New Games
const dealNewGame = () => {
  playersHand = []
  dealersHand = []
  createDeck()
  shuffleDeck()
  dealPlayerHand()
  dealDealerHand()
  getPlayerHandTotal()
  getDealerHandTotal()
  document.querySelector('.hit-button').classList.remove('hide')
  document.querySelector('.stay-button').classList.remove('hide')
  document.querySelector('.deal-button').classList.add('hide')
  document.querySelector('.dealer-hand-total').classList.add('hide')
}
const addRemoveButtonsValues = () => {
  document.querySelector('.hit-button').classList.add('hide')
  document.querySelector('.stay-button').classList.add('hide')
  document.querySelector('.deal-button').classList.remove('hide')
  document.querySelector('.dealer-hand-total').classList.remove('hide')
}
// Opening Deal
const dealPlayerHand = () => {
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    playersHand.push(dealtCard)
    const cardElement = document.createElement('img')
    cardElement.src =
      './images/' + playersHand[i].rank + '_of_' + playersHand[i].suit + '.svg'
    document.querySelector('.player-cards').appendChild(cardElement)
  }
  console.log(playersHand)
}
const dealDealerHand = () => {
  const playerHandTotal = document.querySelector('.player-hand-total')
  const playerName = document.querySelector('.player-name')
  const dealerName = document.querySelector('.dealer-name')
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    dealersHand.push(dealtCard)
  }
  getPlayerHandTotal()
  if (playerHandTotal > 21) {
    playerName.textContent = 'Player Wins!'
    dealerName.textContent = 'Dealer Loses!'
    addRemoveButtonsValues()
  }
  console.log(dealersHand)
}

// Hit/Draw Card
const playerDrawsCard = () => {
  const playerHandValue = document.querySelector('.player-hand-value')
  const playerName = document.querySelector('.player-name')
  const dealerName = document.querySelector('.dealer-name')
  for (let i = 0; i < 1; i++) {
    const dealtCard = deck.pop()
    playersHand.push(dealtCard)
    const cardElement = document.createElement('img')
    cardElement.src =
      './images/' + playersHand[i].rank + '_of_' + playersHand[i].suit + '.svg'
    document.querySelector('.player-cards').appendChild(cardElement)
  }
  // Player Busts
  getPlayerHandTotal()
  if (playerHandValue > 21) {
    playerName.textContent = 'Player Busts!'
    dealerName.textContent = 'Dealer Wins!'
  } else if (playerHandValue > 21) {
    playerName.textContent = 'Player Wins!'
    dealerName.textContent = 'Dealer Loses!'
    addRemoveButtonsValues()
  }
  console.log(playersHand)
}

// Hand Totals
const getPlayerHandTotal = () => {
  const playerHandValue = document.querySelector('.player-hand-total')
  let playerHandTotal
  for (let i = 0; i < playersHand.length; i++) {
    const card = playersHand[i]
    if (playerHandTotal) {
      playerHandTotal += card.value
    } else {
      playerHandTotal = card.value
    }
  }
  playerHandValue.textContent = playerHandTotal
  if (playerHandValue > 21) {
    playerHandTotal.textContent = 'Player Busts!'
  } else if (playerHandValue === 21) {
    playerHandTotal.textContent = 'Player Wins!'
    addRemoveButtonsValues()
  }
  console.log(playerHandTotal)
}
const getDealerHandTotal = () => {
  const dealerHandValue = document.querySelector('.dealer-hand-total')
  let dealerHandTotal
  for (let i = 0; i < dealersHand.length; i++) {
    const card = dealersHand[i]
    if (dealerHandTotal) {
      dealerHandTotal += card.value
    } else {
      dealerHandTotal = card.value
    }
  }
  dealerHandValue.textContent = dealerHandTotal
  console.log(dealerHandTotal)
}

// Player Stands
const playerStands = () => {
  const dealerHandValue = document.querySelector('.dealer-hand-total')
  const playerHandValue = document.querySelector('.player-hand-total')
  const dealerName = document.querySelector('.dealer-name')
  const playerName = document.querySelector('.player-name')
  addRemoveButtonsValues()
  while (dealerHandValue.textContent < 17) {
    for (let i = 0; i < 1; i++) {
      const dealtCard = deck.pop()
      dealersHand.push(dealtCard)
      getDealerHandTotal()
    }
  }

  // Dealer Bust
  getDealerHandTotal()
  getPlayerHandTotal()
  if (dealerHandValue.textContent > 21) {
    playerName.textContent = 'Player Wins!'
  } else if (dealerHandValue.textContent > playerHandValue.textContent) {
    playerName.textContent = 'Player Loses!'
    dealerName.textContent = 'Dealer Wins'
  } else if (dealerHandValue.textContent < playerHandValue.textContent) {
    playerName.textContent = 'Player Wins!'
  } else if (dealerHandValue.textContent === playerHandValue.textContent) {
    playerName.textContent = 'Draw!'
    dealerName.textContent = 'Draw!'
  }
  console.log(dealersHand)
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.hit-button').addEventListener('click', playerDrawsCard)
document.querySelector('.deal-button').addEventListener('click', dealNewGame)
document.querySelector('.stay-button').addEventListener('click', playerStands)
