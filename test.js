var distance = require('google-distance');
 
distance.get(
  {
    origin: '432 Beckwith Ct SW APT B, atlanta, ga, 30314',
    destination: 'North Ave NW, Atlanta, GA 30332'
  },
  function(err, data) {
    if (err) return console.log(err);
    console.log(data);
})