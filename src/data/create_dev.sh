#!/bin/bash

set echo off
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo $DIR

echo "********** Started DEV Datatable Environent creation **********"

echo "********** Removing dev database **********"
rm $DIR/dev.db

echo "********** Creating dev schema **********"
sqlite3 $DIR/dev.db ".read ${DIR}/dcl/create.sql"


echo "********** Populating dev schema **********"
sqlite3 $DIR/dev.db ".read ${DIR}/dev/insert.sql"

echo "********** Ended DEV Datatable Environent creation **********"