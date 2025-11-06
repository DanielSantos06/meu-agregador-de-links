import Express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = Express();
const port = 3000;
const prisma = new PrismaClient();

app.use(Express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/', (req, res) => {
  res.send('Servidor está VIVO!');
});

app.post('/register', async (req, res) => {
  const { name, email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
    });

  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar usuário. Email ou Username já podem existir.' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Email ou senha inválidos.' });
  }


  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
   
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }


  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Email ou senha inválidos.' });
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
 
  });
});



// ROTA PARA CRIAR UM NOVO LINK (POST /links)
// Recebe: title, url, e o ID do usuário dono do link
app.post('/links', async (req, res) => {
  const { title, url, userId } = req.body;

  // Validação simples
  if (!title || !url || !userId) {
    return res.status(400).json({ message: "Título, URL e ID do Usuário são obrigatórios." });
  }

  try {
    const newLink = await prisma.link.create({
      data: {
        title: title,
        url: url,
        userId: Number(userId), // Garante que o ID seja um número
      },
    });

    res.status(201).json(newLink); // Retorna o novo link criado

  } catch (error) {
    res.status(500).json({ message: "Erro ao criar link." });
  }
});

app.get('/links/:userId', async (req, res) => {
  const { userId } = req.params; 

  try {
    const links = await prisma.link.findMany({
      where: {
        userId: Number(userId), 
      },
      orderBy: {
        id: 'desc', 
      }
    });

    res.status(200).json(links); 

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar links." });
  }
});

app.get('/page/:username', async (req, res) => {
  const { username } = req.params; 

  try {

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const links = await prisma.link.findMany({
      where: { userId: user.id },
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      username: user.username,
      links: links, 
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar dados da página." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando e pronto para registrar em http://localhost:${port}`);
});