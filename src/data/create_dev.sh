
rm ./dev.db

sqlite3 dev.db '.read ./dcl/create.sql'

sqlite3 dev.db '.read ./dev/insert.sql'

