# onix
A simple Go (Golang) Blogging Platform (WIP)

### [Development] Pre Installation
You must have the following stack:

	- Go 1.6+
	- glide
	- goose
	- npm
	- PostgreSQL

### [Development] Installation
1. Clone the repository inside your `$GOHOME`

	`git clone https://github.com/mewben/onix.git onix`

2. Install dependencies

	```
		cd onix
		npm install
	```

3. Edit `./db/dbconf.yml.sample`. Put your database credentials and rename to `./db/dbconf.yml`
4. Edit `./env.json` for development configurations.
5. Edit `./glide.yaml`. Change the project name.
6. Install go dependencies

	`glide update`

7. Run development server

	`npm start`

	The server runs at `http://localhost:8081` by default.
	The client at `http://localhost:8082`.
