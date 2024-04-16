const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
app.use(express.json());
app.use(require('morgan')('dev'));
app.use(cors())
const {
  client,
  createTables,
  createUser,
  fetchUsers,
  authenticate,
  findUserWithToken,
} = require('./db');

// **********************************************
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets'))); 

const isLoggedIn = async(req, res, next)=> {
  try{
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  }
  catch(ex){
    next(ex);
  }
};


app.post('/src/pages/login', async(req, res, next)=> {
  try {
    res.send(await authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/src/pages/login', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await fetchUsers());
  }
  catch(ex){
    next(ex);
  }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message ? err.message : err });
});

// **********************************************

app.get('/api/purses', async(req, res, next)=> {
  try {
    const SQL = `
      SELECT * from purses ORDER BY created_at DESC;
    `;
    const response = await client.query(SQL);
    console.log(response.rows)
    res.send(response.rows);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/purses/:id', async(req, res, next)=> {
  try {
    const SQL = `
      SELECT * from purses WHERE id = $1;
    `;
    const response = await client.query(SQL, [ req.params.id]);
    res.send(response.rows[0]);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/purses/:id', async(req, res, next)=> {
  try {
    const SQL = `
      UPDATE purses
      SET name=$1, =$2, updated_at= now()
      WHERE id=$3 RETURNING *
    `;
    const response = await client.query(SQL, [ req.body.name, req.body.description, req.body.img_url, req.params.id]);
    res.send(response.rows[0]);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/purses/:id', async(req, res, next)=> {
  try {
    const SQL = `
      DELETE from purses
      WHERE id = $1
    `;
    const response = await client.query(SQL, [ req.params.id]);
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/purses', async(req, res, next)=> {
  try {
    const SQL = `
      INSERT INTO purses(name, description, img_url)
      VALUES($1, $2, $3)
      RETURNING *
    `;
    const response = await client.query(SQL, [ req.body.name, req.body.description, req.body.img_url]);
    res.send(response.rows[0]);
  }
  catch(ex){
    next(ex);
  }
});

const init = async()=> {
  await client.connect();
  console.log('connected to database');

  await createTables();
  console.log('tables created');

  let SQL = `
    DROP TABLE IF EXISTS purses;
    CREATE TABLE purses(
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now(),
      name VARCHAR(255) NOT NULL,
      description VARCHAR(1000) NOT NULL,
      img_url VARCHAR(255) NOT NULL
    );
  `;
  await client.query(SQL);
  console.log('tables created');
  SQL = `
    INSERT INTO purses(name, description, img_url) VALUES('The New York - 2500', 'The New York is a sophisticated and luxurious purse designed for those who appreciate high-quality craftsmanship and timeless style. Made from supple leather and featuring elegant gold accents, this purse exudes elegance and sophistication. With multiple compartments and a versatile design, The New York is the perfect accessory for the modern woman on the go. Elevate any outfit with this chic and versatile purse that embodies the glamour and sophistication of the city that never sleeps.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHVyc2V8ZW58MHx8MHx8fDA%3D' );

    INSERT INTO purses(name, description, img_url) VALUES('The Rome', 'The Rome is a luxurious and sophisticated purse, crafted from the finest Italian leather and designed with meticulous attention to detail. Its timeless design exudes elegance and class, making it the perfect accessory for any upscale event or special occasion. Featuring multiple compartments and gold-plated hardware, The Rome is not only stylish but also practical, offering ample space to carry all your essentials in style. Elevate your look with The Rome and indulge in the ultimate luxury experience.', 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVyc2V8ZW58MHx8MHx8fDA%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Prague - 2500', 'The Prague is a sleek and sophisticated luxury purse crafted from the finest materials. Featuring a timeless design with intricate detailing, this handbag exudes elegance and refinement. Perfect for adding a touch of glamour to any outfit, The Prague is a must-have accessory for the modern fashionista. With its spacious interior and high-quality construction, this purse is the epitome of luxury and style. Elevate your look with The Prague and make a statement wherever you go.', 'https://images.unsplash.com/photo-1591561954555-607968c989ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHB1cnNlfGVufDB8fDB8fHww');

    INSERT INTO purses(name, description, img_url) VALUES('The Paris', 'The Paris is a sophisticated and elegant luxury purse that exudes timeless charm and French flair. Crafted from the finest materials, this exquisite handbag features meticulous attention to detail, from its sleek design to its luxurious finish. Perfect for the modern woman who appreciates both style and functionality, The Paris is a must-have accessory for those who appreciate the finer things in life. Elevate your outfit and make a statement with The Paris, a true embodiment of luxury and grace.', 'https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHB1cnNlfGVufDB8fDB8fHww');

    INSERT INTO purses(name, description, img_url) VALUES('The London', 'The London is a stunning designer purse crafted from the finest leather with exquisite attention to detail. This luxurious accessory features a timeless and elegant design that effortlessly elevates any outfit. With its spacious interior and multiple compartments, The London is not only a statement piece but also a practical and functional addition to any wardrobe. Carry The London to make a bold and sophisticated fashion statement wherever you go.', 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHB1cnNlfGVufDB8fDB8fHww');

    INSERT INTO purses(name, description, img_url) VALUES('The Amsterdam', 'The Amsterdam is the epitome of luxury and sophistication. Handcrafted with the finest Italian leather and adorned with exquisite gold hardware, this purse exudes elegance and class. With its sleek design and spacious interior, The Amsterdam is the perfect accessory for any stylish fashionista looking to make a statement. Make a bold and glamorous statement with The Amsterdam.', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHB1cnNlfGVufDB8fDB8fHww');

    INSERT INTO purses(name, description, img_url) VALUES('The Tokyo', 'The Tokyo is a stunning and sophisticated luxury purse that exudes elegance and style. Made with the finest materials and expert craftsmanship, this handbag features a sleek and minimalist design inspired by the modern and vibrant city of Tokyo. With ample space for all your essentials and a timeless silhouette, The Tokyo is the perfect accessory for any fashion-forward individual looking to make a statement. Elevate your look and carry this luxurious purse to add a touch of glamour to any outfit.', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHB1cnNlfGVufDB8fDB8fHww');

    INSERT INTO purses(name, description, img_url) VALUES('The Barcelona', 'The Barcelona is a sophisticated and timeless luxury purse crafted from the finest Italian leather. Featuring elegant hardware and a sleek silhouette, it is the epitome of chic sophistication. With its spacious interior and versatile design, The Barcelona is the perfect accessory for the modern woman who values both style and functionality. Elevate any outfit with this exquisite handbag that exudes luxury and class.', 'https://images.unsplash.com/photo-1630484179057-75e24310e2ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHB1cnNlfGVufDB8fDB8fHww');

    INSERT INTO purses(name, description, img_url) VALUES('The Bangkok', 'The Bangkok is a stunning and sophisticated luxury purse that exudes opulence and elegance. Crafted from the finest materials, this handbag features intricate detailing and impeccable craftsmanship. With its sleek design and spacious interior, The Bangkok is the perfect accessory for any fashion-forward individual looking to make a statement. Gleaming hardware and luxurious finishes complete the look, making this purse a must-have for those with discerning taste.', 'https://plus.unsplash.com/premium_photo-1695603437447-21cc2e206536?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Hong Kong', 'The Hong Kong is a stunning, high-end purse designed for the modern fashionista who appreciates luxury and sophistication. Handcrafted with the finest materials and meticulous attention to detail, this purse exudes elegance and glamour. Featuring a sleek, minimalist design with gold hardware accents, The Hong Kong is the perfect accessory to elevate any outfit and make a statement. With its spacious interior and multiple compartments, this purse is not only stylish but also highly functional, making it the ultimate luxury accessory for any woman with discerning taste.', 'https://images.unsplash.com/photo-1615206928871-6034d172c35f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUwfHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Dubai', 'The Dubai purse is the epitome of luxury and sophistication. Crafted with the finest quality materials and impeccable attention to detail, this purse features a sleek design and elegant silhouette that is sure to turn heads. Adorned with exquisite embellishments and a stunning gold-plated logo, The Dubai purse is a statement piece that exudes opulence and glamour. Perfect for adding a touch of luxury to any outfit, this purse is a must-have accessory for the fashion-forward individual.', 'https://images.unsplash.com/photo-1608060434411-0c3fa9049e7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgwfHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Seoul', 'The Seoul is a stunning luxury purse crafted from the finest materials and designed with meticulous attention to detail. Its sleek silhouette, elegant hardware, and luxurious finish make it the perfect accessory for a night out on the town or a sophisticated brunch with friends. With its timeless appeal and exquisite craftsmanship, The Seoul is sure to turn heads and elevate any outfit to new heights of chic sophistication.', 'https://plus.unsplash.com/premium_photo-1664391658474-c5509d4fc003?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg5fHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Vienna', 'The Vienna is an exquisite and timeless luxury purse that exudes elegance and sophistication. Crafted from the finest materials, this purse features a sleek silhouette and intricate detailing that sets it apart from the rest. With its classic design and impeccable craftsmanship, The Vienna is the epitome of luxury and style, making it the perfect accessory for any upscale event or occasion.', 'https://images.unsplash.com/photo-1614179689741-0ebd3f0ff34b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQzfHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Berlin', 'The Berlin is an exquisite and timeless luxury purse crafted from the finest Italian leather. Featuring sleek lines and elegant hardware, this statement piece is perfect for the sophisticated and fashion-forward woman who appreciates both style and quality. With its spacious interior and multiple compartments, The Berlin is not only a fashion accessory but also a practical and functional investment for the modern woman on the go. Elevate any outfit with The Berlin and exude effortless glamour and refinement wherever you go.', 'https://images.unsplash.com/photo-1622705468523-3b30dd07a0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjc4fHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Madrid', 'The Madrid is a stunning luxury purse crafted from the finest materials, featuring exquisite detailing and timeless design. With its sophisticated silhouette and sleek lines, this iconic accessory is a statement piece that exudes elegance and sophistication. Perfect for adding a touch of luxury to any outfit, The Madrid is a must-have for the fashion-forward woman with impeccable taste.', 'https://images.unsplash.com/photo-1587538520952-fafa4eeee7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA2fHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Sydney', 'The Sydney is a stunning and sophisticated luxury purse designed for the modern, stylish woman. Crafted from the finest quality materials and adorned with intricate detailing, this purse exudes elegance and class. With its spacious interior and practical compartments, The Sydney is not only a fashion statement but also a functional accessory for carrying all your essentials in style. Elevate your look and showcase your impeccable taste with The Sydney purse.', 'https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzMyfHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Mumbai', 'The Mumbai is a stunning and sophisticated luxury purse that exudes elegance and glamour. Crafted from the finest materials and adorned with exquisite detailing, this purse is a symbol of opulence and style. Perfect for the modern woman who appreciates quality and luxury, The Mumbai is a timeless accessory that will elevate any outfit to new heights of chic sophistication.', 'https://images.unsplash.com/photo-1635866091268-87ca924abc9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzMxfHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Beijing', 'The Beijing is a sleek and sophisticated luxury purse crafted with the finest materials and exquisite attention to detail. With its timeless design and elegant structure, this purse exudes sophistication and class. The Beijing is the perfect accessory for any upscale event or stylish outing, adding a touch of luxury and glamour to any outfit. Elevate your look with The Beijing and make a bold statement wherever you go.', 'https://images.unsplash.com/photo-1682628890923-e0d08e2e51f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzU2fHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

    INSERT INTO purses(name, description, img_url) VALUES('The Budapest', 'The Budapest is an exquisite luxury purse crafted from the finest leather and adorned with intricate gold hardware. Its sleek silhouette and elegant design make it the perfect accessory for any sophisticated fashionista. With multiple compartments and a spacious interior, The Budapest allows you to effortlessly carry all your essentials in style. Elevate your look with this stunning statement piece that exudes luxury and elegance.', 'https://images.unsplash.com/photo-1630701875820-1250d036825d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDE5fHxwdXJzZXxlbnwwfHwwfHx8MA%3D%3D');

  `;

  await client.query(SQL);
  console.log('data seeded');

  const [momo] = await Promise.all([
    createUser({ username: 'momo', password: 'm_pw'}),
  ]);

  console.log(await fetchUsers());

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init();
// ******************************************************************************

