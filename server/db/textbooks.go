package db

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"server/models"
)

// Get all the textbooks from Mongo and format them in json from a given topic.
func GetTextbooks(topicID string) ([]models.Textbook, error) {

	collection := database.Collection("textbooks")

	docID, err := primitive.ObjectIDFromHex(topicID)
	if err != nil {
		return nil, err
	}

	var textbooks []models.Textbook
	cur, err := collection.Find(context.TODO(), bson.M{"topicID": docID})
	if err != nil {
		return nil, err
	}

	defer cur.Close(context.TODO())

	// Load one-by-one
	for cur.Next(context.TODO()) {

		var textbook models.Textbook

		if err := cur.Decode(&textbook); err != nil {
			log.Fatal(err)
		}

		textbooks = append(textbooks, textbook)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	return textbooks, nil
}

// PostTextbook creates a new textbook in the database.
// It contains the information as describe in the models package.
func PostTextbook(textbook models.Textbook) error {

	collection := database.Collection("textbooks")

	if _, err := collection.InsertOne(context.TODO(), textbook); err != nil {
		return err
	}

	return nil
}

// DeleteTextbook deletes a textbook from database given its id.
func DeleteTextbook(textbookID string) error {

	collection := database.Collection("textbooks")

	id, err := primitive.ObjectIDFromHex(textbookID)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": id}

	_, err = collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		return err
	}

	return nil
}
