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
  playersHand = []
  dealersHand = []
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
  getPlayerHandTotal()
  console.log(playersHand)
}
const dealDealerHand = () => {
  const dealerHandTotal = document.querySelector('.player-hand-total')
  const playerName = document.querySelector('.player-name')
  const dealerName = document.querySelector('.dealer-name')
  for (let i = 0; i < 2; i++) {
    const dealtCard = deck.pop()
    dealersHand.push(dealtCard)
  }
  getDealerHandTotal()
  if (dealerHandTotal === 21) {
    playerName.textContent = 'Player Loses!'
    dealerName.textContent = 'Dealer Wins!'
    newGame()
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
  }
  // Player Busts
  getPlayerHandTotal()
  if (playerHandValue < 22) {
    playerName.textContent = 'Player Busts!'
    dealerName.textContent = 'Dealer Wins!'
    newGame()
  } else if (playerHandValue === 21) {
    playerName.textContent = 'Player Wins!'
    dealerName.textContent = 'Dealer Loses!'
    newGame()
  }
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
  if (playerHandValue < 22) {
    playerHandTotal.textContent = 'Player Busts!'
    newGame()
  } else if (playerHandValue === 21) {
    playerHandTotal.textContent = 'Player Wins!'
    newGame()
  }
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
}

// Player Stands
const playerStands = () => {
  const dealerHandValue = document.querySelector('.dealer-hand-total')
  const playerHandValue = document.querySelector('.player-hand-total')
  const dealerName = document.querySelector('.dealer-name')
  const playerName = document.querySelector('.player-name')
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
    dealerName.textContent = 'Dealer Loses'
    newGame()
  } else if (dealerHandValue.textContent > playerHandValue.textContent) {
    playerName.textContent = 'Player Loses!'
    dealerName.textContent = 'Dealer Wins'
    newGame()
  } else if (dealerHandValue.textContent < playerHandValue.textContent) {
    playerName.textContent = 'Player Wins!'
    dealerName.textContent = 'Dealer Loses'
    newGame()
  } else if (dealerHandValue.textContent === playerHandValue.textContent) {
    playerName.textContent = 'Draw!'
    dealerName.textContent = 'Draw!'
    newGame()
  }
}
// Deal Button
const newGame = () => {
  document.querySelector('.hit-button').classList.add('hide')
  document.querySelector('.stay-button').classList.add('hide')
  document.querySelector('.deal-button').classList.remove('hide')
}
// Deal New Game
const dealNewGame = () => {
  main()
  resetButton()
  document.querySelector('.hit-button').classList.remove('hide')
  document.querySelector('.stay-button').classList.remove('hide')
  document.querySelector('.deal-button').classList.add('hide')
}
const resetButton = () => {
  document.querySelector('.player-cards').textContent = ''
  document.querySelector('.player-name').textContent = 'Player Score'
  document.querySelector('.player-hand-total').textContent = ''
  document.querySelector('.hit-button').classList.add('hide')
  document.querySelector('.stay-button').classList.add('hide')
  document.querySelector('.deal-button').classList.remove('hide')
  document.querySelector('.dealer-hand-total').classList.remove('hide')
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.hit-button').addEventListener('click', playerDrawsCard)
document.querySelector('.deal-button').addEventListener('click', dealNewGame)
document.querySelector('.stay-button').addEventListener('click', playerStands)
