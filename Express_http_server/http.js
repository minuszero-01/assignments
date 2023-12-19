const express = require("express");
const app = express();

const users = [
  {
    name: "John",
    kidney: [
      {
        healthy: false,
      },
    ],
  },
];

app.get("/", (req, res) => {
  const johnKidney = users[0].kidney;
  const noOfKidney = johnKidney.length;
  let noOfHealthyKidney = 0;
  for (let i = 0; i < noOfKidney; i++) {
    if (johnKidney[i].healthy) {
      noOfHealthyKidney = noOfHealthyKidney + 1;
    }
  }
  const noOfUnhealthyKidney = noOfKidney - noOfHealthyKidney;

  res.json({
    noOfKidney,
    noOfHealthyKidney,
    noOfUnhealthyKidney,
  });
});

app.use(express.json());

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidney.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Healthy Kidney Added",
  });
});

app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidney.length; i++) {
    users[0].kidney[i].healthy = true;
  }
  res.json({
    msg: "Upddated",
  });
});

app.delete("/", (req, res) => {
  const newKidney = [];

  if (isunheathyKidney()) {
    const newKidney = [];
    for (let i = 0; i < users[0].kidney.length; i++) {
      if (users[0].kidney[i].healthy) {
        newKidney.push({
          healthy: true,
        });
      }
    }
    users[0].kidney = newKidney;
    res.json({
      msg: "Done",
    });
  } else {
    res.status(411).json({
      msg: "You have no bad kidney",
    });
  }
});

function isunheathyKidney() {
  let unheathyKidney = false;
  for (let i = 0; i < users[0].kidney.length; i++) {
    if (!users[0].kidney[i].healthy) {
      unheathyKidney = true;
    }
  }
  return unheathyKidney;
}

app.listen(3000);
