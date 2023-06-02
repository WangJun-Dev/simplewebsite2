const express = require('express');
const app = express();

let launches = [
  {
    id: 3276,
    name: "Starlink-85 (2-10)",
    missionDescription: "这是一个测试",
    // ... other details
  },
  // ... other launches
];

app.get('/launches', (req, res) => {
  res.json(launches);
});

app.get('/launches/:id', (req, res) => {
  const id = Number(req.params.id);
  const launch = launches.find(launch => launch.id === id);
  if (!launch) {
    res.status(404).send('Launch not found');
  } else {
    res.json(launch);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
