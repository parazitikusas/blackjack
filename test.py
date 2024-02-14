############### Blackjack Project #####################

#Difficulty Normal 😎: Use all Hints below to complete the project.
#Difficulty Hard 🤔: Use only Hints 1, 2, 3 to complete the project.
#Difficulty Extra Hard 😭: Only use Hints 1 & 2 to complete the project.
#Difficulty Expert 🤯: Only use Hint 1 to complete the project.

############### Our Blackjack House Rules #####################

## The deck is unlimited in size.
## There are no jokers.
## The Jack/Queen/King all count as 10.
## The the Ace can count as 11 or 1.
## Use the following list as the deck of cards:
## cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
## The cards in the list have equal probability of being drawn.
## Cards are not removed from the deck as they are drawn.
## The computer is the dealer.\

##################### Code #####################
import random


def drawNew(usersHand):
  usersHand.append(random.choice(cards))


def initGame():
  myHand.extend(random.choices(cards, k=2))
  dealersHand.extend(random.choices(cards, k=2))


def dealerEnd():
  while (sum(dealersHand) <= 16):
    drawNew(dealersHand)


def endGame():
  print("=========================")
  dealerEnd()
  if sum(dealersHand) == sum(myHand):
    print("Draw!")
    state = 2
  elif sum(dealersHand) >= 22 or sum(dealersHand) < sum(myHand):
    print("You win!")
    state = 1
  else:
    print("You lose!")
    state = 0

  print(f"Your hand: {myHand} = {sum(myHand)}")
  print(f"Dealer's hand: {dealersHand} = {sum(dealersHand)}")
  print("=========================")
  #print(f"Returning {state}")
  return state


def userLose():
  print("=========================")
  print("You lose!")
  print(f"Your hand: {myHand} = {sum(myHand)}")
  print(f"Dealer's hand: {dealersHand} = {sum(dealersHand)}")
  print("=========================")


def remove11(usersHand):
  usersHand.remove(11)
  usersHand.append(1)


def gameLoop():
  isOver = False
  while (not isOver):
    if input("Would you like to draw another card? y/n\n") == 'n':
      return endGame()
    else:
      drawNew(myHand)
      if sum(myHand) > 21:
        if 11 in myHand:
          remove11(myHand)
          print(f"Your new hand: {myHand} = {sum(myHand)}")
          gameLoop()
          break
        else:
          isOver = True
          userLose()
          return 0
      else:
        print(f"Your new hand: {myHand} = {sum(myHand)}")


cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

balance = 100
session = True
print(f"Your balance ${balance}")

while (session):
  bet = int(input("Place your bet:\n"))
  balance -= bet
  myHand = []
  dealersHand = []

  print(f"GAME STARTED. BET ${bet}")

  initGame()

  print(f"Your hand: {myHand} = {sum(myHand)}")
  print(f"Dealer's hand: [{dealersHand[0]},*]")

  state = gameLoop()

  if state == 1:
    balance = balance + bet * 2
  elif state == 2:
    balance += bet

  print(f"Your balance ${balance}")

  if input("Would you bet again? y/n\n") == 'n':
    print(f"You end the game with ${balance} in your balance.")
    session = False
  else:
    continue
