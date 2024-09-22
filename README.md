# comp-4001_pern
BSc CS - COMP-4001 Software Engineering Repo

---

https://fuzzy-journey-v7y6oy5.pages.github.io/pern-tut/

---

docker compose up


---

Postgres Shell

psql -U postgres

create database badges;

\c badges

create table badges_list(id SERIAL PRIMARY KEY, title VARCHAR(50), description Text);

---

Node.js

In development mode, use this command to avoid having to restart the server whenever you make changes:
npm run dev

In deployment or production, run the server as:
npm start

To stop the app use Ctrl-C in the terminal.