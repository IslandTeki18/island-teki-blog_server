import bcrypt from "bcryptjs"

const users = [
  { username: "landon.mckell", password: bcrypt.hashSync("123Password", 10), isAdmin: true },
];

export default users;
