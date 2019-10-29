import React from "react";
import StorageService from "../services/StorageService";

class CardsStore extends StorageService {
  constructor(storageKey) {
    super(storageKey);
  }

  async addCard(newCard) {
    let cards = await this.getItemsAsync();

    if (!cards) cards = [];

    cards.push(newCard);
    await this.addItemsAsync(cards);
    return cards;
  }

  async removeCard(cardData) {
    let cards = await this.getItemsAsync();
    let foundIndex = null;

    cards.forEach((card, index) => {
      if (parseInt(card.id) === parseInt(cardData.id)) {
        foundIndex = index;
      }
    });

    if (typeof foundIndex === "number") {
      cards.splice(foundIndex, 1);
    }

    await this.addItemsAsync(cards);

    return cards;
  }
}

const Cards = new CardsStore("user_cards");

export default Cards;
