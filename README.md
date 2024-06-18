This is a [Beincom](https://github.com/ducsilva/nguyenminhduc/tree/main/src/problem5) project bootstrapped with [`nest js`]

## Getting Started

First, you need to clone the project:

```bash
git clone git@github.com:ducsilva/nguyenminhduc.git
```

After cloning the project, you have to cd src/problem5/resources and install the required packages:

```bash
yarn install
```

## Creating a new environment variable:

# Add a .env file inside src/problem5/resources and copy below to the .env :

```bash
PORT = 4000
JWT_SECRET=5b5d4373b52394e8bc6be526991585de3e9726439586f80d3f2697169526ab9b
MONGOOSE_URI=mongodb+srv://ducsilva1307:Minhduc13071992%40@trungka.xpiqot3.mongodb.net/99tech?retryWrites=true&w=majority&appName=trungka
CLOUDINARY_NAME=dsy1sswel
CLOUDINARY_API_KEY=145857621656138
CLOUDINARY_API_SECRET=52ObYXCPksyTZLnlvvOKC52R4WI
```

# Then run the server with:

```bash
yarn start:dev
```

##### Your server will listen port 4000:

## Now, You can test your server with swagger:

```bash
BASE_URL=http://localhost:4000/docs
```
