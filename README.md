<h1>Docker Fullstack esimerkki</h1>

Tässä esimerkissä rakennetaan sovellus, jossa on Express.js REST API + Postgres tietokanta + React sovellus, joita ajetaan Dockerissa. Sekä API, että React sovellus päivittyvät heti kun muutoksia tehdään.

<h2>Asennus</h2>
<ol>
<li>Nimeä .env.example tiedostot .env tiedostoiksi:
<pre>
mv .env.example .env
mv frontend/.env.example frontend/.env
</pre>
</li>
<li>Käynnistä Docker Desktop</li>
<li>Rakenna imaget ja käynnistä kontit: 
<ul>
  <li>
  anna sovelluksen juurikansiossa komento 
<pre>
docker compose up --build
</pre>
  </li>
</ul>
</li>
<li>Avaa selaimeen sivu http://localhost:3001/book jolloin sinun pitäisi nähdä book-taulun data</li>
<li>Avaa selaimeen sivu http://localhost:3000 jolloin sinun pitäisi nähdä React-sovelluksessa tietokannassa olevat kirjat</li>
<li>Kokeile muokata React sovelluksen App.js tiedostoa ja tutki päivittyykö web-sivu</li>
</ol>

<h2>Buildaus</h2>
<ol>
<li>Kehityksessä sovellus buildataan komennolla
<pre>
docker compose up --build
</pre>
Jolloin suoritetaan sekä docker-compose.yml, että docker-compose.override.yml
</li>
<li>Tuotannossa sovellus buildataan komennolla
<pre>
docker compose -f docker-compose.yml up --build
</pre>
Jolloin suoritetaan vain docker-compose.yml
</li>
</ol>

<h2>Työskentely</h2>
<ul>
  <li>Kun haluat lopettaa kehityksen, anna komento <b>docker compose down</b> ja kun haluat jatkaa kehitystä anna komento <b>docker compose up --build</b></li>
  <li>Jos teet muutoksia Dockerfile tai package.json tiedostoihin, sinun tulee käynnistää kontit uudelleen.</li>
</ul>

<h2>Tietokanta</h2>
<p>
Kaikki .sql ja .sh tiedostot, jotka on mountattu hakemistoon /docker-entrypoint-initdb.d/, ajetaan vain kerran konttia alustettaessa – eli silloin kun Postgres käynnistyy ensimmäistä kertaa ja data-hakemisto (/var/lib/postgresql/data) on tyhjä.

Koska <b>docker-compose.yml</b>-tiedostossa on rivi <b>./book.sql:/docker-entrypoint-initdb.d/book.sql:ro</b>, suoritetaan tiedostossa <b>book.sql</b> olevat koodit:
<pre>
CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  author VARCHAR(255),
  isbn VARCHAR(255)
);

insert into book (name, author, isbn) VALUES('Everything You Ever Wanted to Know','Upton','082305649x');
insert into book (name, author, isbn) VALUES('Photography','Vilppu','205711499');
insert into book (name, author, isbn) VALUES('Drawing Manual Vilppu','Zelanshi','1892053039');
insert into book (name, author, isbn) VALUES('TBA','Zelanshi','0534613932');
insert into book (name, author, isbn) VALUES('Shaping Space','Speight','0534613934');
</pre>
<p>
Jos muokkaat tuota tiedostoa ja haluat, että se suoritetaan uudelleen, sinun on ajettava komento <b>docker compose down -v</b>
</p>
<p>Muodostaaksesi yhteyden kontin Postgres-palvelimeen, suorita komento:
<pre>
docker exec -it postgres_db psql -U netuser -d netdb
</pre>
</p>

<h2>PostgresSQL</h2>

Tässä esimerkissä ei tarvita PostgreSQL serveriä, koska sitä ajetaan Dockerissa. Jos haluat kytheytyä tietokantaan suoraan isäntäkoneelta tarvitset jonkin clientin, kuten <b>psql</b> tai pgAdmin. Jos haluat luoda dump-tiedostoja tarvitset <b>pg_dump</b> sovelluksen. Voit asentaa ne, kun lataat installointi sovelluksen sivulta https://www.postgresql.org/download/windows/ ja asennuksessa valitset asennettavaksi <b>Command Line Tools</b>, voit halutessasi asentaa myös graafisen clientin <b>pgAdmin 4</b>. Lisäksi kannattaa laittaa Windowsin ympäristömuuttujiin polku C:\Program Files\PostgreSQL\17\bin

<h3>Database dump</h3>

Voit luoda tietokannasta dumpin komennolla:
<pre>
pg_dump -U netuser -h 127.0.0.1 -p 5432 netdb> dbdump.sql
</pre>
Huomaa, että sinulla tulee olla asennettuna PostgreSQL, tai ainakin tuo pg_dump

Voit suorittaa edellä luodun dump-tiedoston komennolla:
<pre>
psql -U netuser -h 127.0.0.1 -d netdb -f dbdump.sql
</pre>

<h2>Dockerin kannalta oleelliset tiedostot</h2>
<ul>
<li>docker-compose.yml</li>
<li>docker-compose.override.yml(development tilassa)</li>
<li>.env</li>
<li>postgres.conf (jos halutaan saada paikalliseen PostgreSQL-palvelimeen tuotantopalvelinta vastaavat asetukset)</li>
<li>api/Dockerfile</li>
<li>frontend/Dockerfile</li>
<li>frontend/.env</li>
</ul>

<h2>Deploy Renderiin</h2>
<p>
Render ei osaa lukea docker-compose.yml -tiedostoa ja ajaa kaikkia palveluita yhdellä komennolla. Render tukee kuitenkin Dockerfilea, eli voit ajaa yhden kontin kerrallaan suoraan Dockerfilestä. Joten jaetaan sovellus osiin seuraavasti:
</p>
<ol>
  <li>PostgreSQL-tietokanta</li>
  <li>Backend</li>
  <li>Frontend</li>
</ol>
<p>Aluksi kannattaa luoda Renderiin PostgreSQL tietokanta ja luoda siihen samanlaiset taulut kuin omalla koneella (esim. dump-tiedoston avulla).</p>

<h3>Deploy Docker Hubin kautta</h3>
<h4>Backend</h4>
<ol>
<li>Suorita komennot
<pre>
docker build -t myusername/docker_example-api:latest api/
docker push myusername/docker_example-api:latest
</pre>
</li>
<li>Renderissä:
<ul>
  <li>luo uusi WebService ja valitse Existing image ja kirjoita Image URL (=myusername/docker_example-api)</li>
  <li>Lisää Environment Variablesiin DATABASE URL ja valuen kopioit Renderin Postgressistä (kohdasta Connect)</li>
</ul>
 </li>
</ol>
<h4>Frontend</h4>
<ol>
<li>Suorita komennot
<pre>
docker build -t myusername/docker_example-frontend:latest frontend/
docker push myusername/docker_example-frontend:latest
</pre>
</li>
<li>Renderissä:
<ul>
  <li>luo uusi WebService ja valitse Existing image ja kirjoita Image URL (=myusername/docker_example-frontend)</li>
  <li>Lisää Environment Variablesiin REACT_APP_API_URL ja kopioi siihen backendisi URL (katso ettei loppuun tule kauttaviivaa)</li>
</ul>
 </li>
</ol>