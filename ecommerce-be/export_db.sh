#!/bin/bash

DB_NAME="shop"
URI="mongodb://admin:admin@localhost:27017/$DB_NAME"
OUTPUT_DIR="./data"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Get a list of all collections in the database
collections=$(mongo --quiet --eval "db.getMongo().getDB('$DB_NAME').getCollectionNames()" $URI)

# Loop through each collection and export it
for collection in $(echo $collections | tr -d '[],"'); do
  echo "Exporting $collection..."
  mongoexport --uri="$URI" --collection="$collection" --out="$OUTPUT_DIR/${collection}.json" --jsonArray
done

echo "Export completed."