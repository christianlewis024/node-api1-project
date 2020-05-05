const express = require("express");
const shortid = require("shortid");
const server = express();
server.get("/", (req, res) => {
  res.json({ api: "Project AP is Up and Running." });
});
server.use(express.json());

let users = [
  {
    id: 1,
    name: "billy",
    bio: "billy bobo bio bongo baby",
  },
  {
    id: 2,
    name: "molly",
    bio: "makes mangos in the mist",
  },
  {
    id: 3,
    name: "fanny",
    bio: "fiddle leaf ficus fig",
  },
  {
    id: 4,
    name: "wally",
    bio: "winter walking when wet",
  },
];
// get requests

server.get("/api/users", function (req, res) {
  users
    ? res.status(200).json(users)
    : res.status(500).json({
        errorMessage: "the users info could not be retrieved.",
      });
});

//

server.get("/api/users/:id", function (req, res) {
  const reqId = Number(req.params.id);
  const reqUser = users.filter((user) => user.id == reqId);

  res
    .status(200)
    .json(reqUser)
    .catch((err) => {
      console.log("error", err);
      res.status(500).json({ error: " failed to find user" });
    });
});

// post requests

server.post("/api/users", function (req, res) {
  const userInfo = req.body;

  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({
      errorMessage: "Needs user name and bio .",
    });
  } else {
    users.push(userInfo)
      ? res.status(201).json(userInfo)
      : res.status(500).json({
          errorMessage: "Server Error 500",
        });
  }
});
// delete requests

server.delete("/api/users/:id", function (req, res) {
  const id = Number(req.params.id);
  const user = users.find((e) => e.id === id);

  if (user) {
    users = users.filter((user) => user.id !== id);
    const deleted = users.find((e) => e.id === id);
    !deleted
      ? res.status(200).json(user)
      : res.status(500).json({
          errorMessage: "error when deleting",
        });
  } else {
    res.status(404).json({
      errorMessage: "the user with the specified id does not exist",
    });
  }
});

// patch request

server.patch("/api/users/:id", (req, res) => {
  const userInfo = req.body;
  const id = Number(req.params.id);

  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({
      errorMessage: "Provide a name and bio",
    });
  } else {
    const user = users.find((e) => e.id === id);

    if (user) {
      users = users.map((user) => {
        return user.id === id ? { id, ...userInfo } : user;
      });
      const updatedUser = users.find((e) => {
        return e.id === id;
      });
      updatedUser
        ? res.status(200).json(updatedUser)
        : res.status(500).json({
            errorMessage: "cannot modify user information",
          });
    } else {
      res.status(404).json({
        errorMessage: "cannot find user by ID.",
      });
    }
  }
});

// server port
server.listen(8000, () => console.log("\n== API is up ==\n"));
